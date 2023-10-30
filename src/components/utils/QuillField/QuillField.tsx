import { FC, useCallback, useMemo, useState } from 'react';
import ReactQuill  from 'react-quill';
import { FormFieldLabel } from '../FormFieldLabel/FormFieldLabel';
import { ErrorMessage, FieldAttributes, FieldHookConfig, useField } from 'formik';
import { AddLinkForm } from '../../AddLinkFom/AddLinkForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import 'react-quill/dist/quill.snow.css';
import './QuillField.css'

type Props = FieldHookConfig<string> & {
    label: string,
    onChangeFileInput: (file: any) => void,
    file: any,
} & FieldAttributes<any>


const formats = [
    'bold', 'italic', 'code',
    'link',
];


export const QuillField: FC<Props> = ({label, file, onChangeFileInput, ...props}) => {
    const [field, meta, helpers] = useField(props);
    const [isOpenAddLinkForm, setIsOpenAddLinkForm] = useState(false);

    const handleLink = useCallback(() => {
        console.log('handleLink work');
        setIsOpenAddLinkForm(prev => !prev)
    }, [])

    const handleFileLoad = useCallback(async () => {
        const input = document.createElement('input');      
        input.setAttribute('type', 'file');  
        input.setAttribute('accept', 'image/jpeg, image/png, image/gif, text/plain');

        input.click();  
        
        input.onchange = () => {  
            if (input.files) {
                const file = input.files[0];  
                onChangeFileInput(file)
            }       
        }; 
    }, [onChangeFileInput])

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                ["bold", "italic"],
                ["code"],
                ["link", "image"],
                ],
        
                handlers: {
                link:  handleLink,
                image: handleFileLoad
                },
                history: {
                delay: 500,
                maxStack: 100,
                userOnly: true,
                },
            },
        }),
        [handleFileLoad]
    );

    return (
        <div className={classNames('Quill', {
            'Quill__isOpenForm': isOpenAddLinkForm
        })}>
            <FormFieldLabel 
                label='Leave your comment'
                name={props.name}
                invalid={!!(meta.error && meta.touched) && !isOpenAddLinkForm} 
            />

            
            <ReactQuill 
                theme="snow"
                placeholder="leave your comment"
                modules={modules}
                formats={formats}
                value={field.value}
                onChange={(e) => helpers.setValue(e)}
                onBlur={() => helpers.setTouched(true)}
                className={classNames('Quill__field',{
                    'Quill__border-error': !!(meta.error && meta.touched) && !isOpenAddLinkForm,
                })}

            />            
            
            {!isOpenAddLinkForm && <ErrorMessage 
                className='Quill__error' 
                name={props.name} 
                component='div' 
            />}

            {file && (
                <div className='Quill__info-wrapper'>
                    <FontAwesomeIcon icon={faPaperclip} style={{color: "#1f2937",}} />
                    <p className='Quill__info'>{file.name}</p>
                </div>
            )}

            <div className='Quill__link-container'>
                <AddLinkForm 
                    onClose={() => setIsOpenAddLinkForm(false)}
                    onSave={(link: string) => helpers.setValue(`${field.value} ${link}`)}
                />
            </div>

        </div>
    )
}