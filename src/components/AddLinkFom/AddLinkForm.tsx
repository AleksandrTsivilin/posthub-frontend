import { FC, useState } from 'react';
import { Button } from '../utils/Button/Button'
import { TextField } from '../utils/TextField/TextField'
import { IconButton } from '../utils/IconButton/IconButton';
import './AddLinkForm.css';

// export const AddLinkForm = () => {
//     const initialValues = {
//        title: '',
//        url: ''
//     }

//     const validationSchema =  Yup.object({
//         title: Yup.string().required('title is required'),
//         url: Yup.string().required('url is required')
//     }) ;

//     const submitHandlerLink = async (values: any, actions: any) => {
//         console.log('sumbit handler link')
//         console.log(values)
//     }

//     return (
//         <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema} 
//             onSubmit={submitHandlerLink}                
//         >
//             {formik => (

//                 <>
//                     <div className=''>
//                         {formik.isSubmitting && <Loader />}
//                     </div>

//                     <div className='AddLinkForm__container'>                                                
//                         <Form className=''>
                            
//                             <TextField
//                                 label='title'
//                                 name='title'
//                                 placeholder='Enter title'
//                                 fieldSize='sm'
//                             />

//                             <TextField 
//                                 label='url'
//                                 name='url'
//                                 placeholder='Enter url'   
//                                 fieldSize='sm'                                                  
//                             />



//                             <Button
//                                 text='add link'
//                                 type='submit'
//                                 disabled={formik.isSubmitting}
//                                 buttonSize='sm'
//                             />
//                         </Form>
//                     </div>
//                 </>
//             )}
//         </Formik>
//     )
// }

interface Props {
    onClose: () => void
    onSave: (link: string) => void
}

export const AddLinkForm: FC<Props> = ({onClose, onSave}) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [urlError, setUrlError] = useState(false);


    const saveLink = () => {
        console.log('saveLink')
        if (!title.trim() || !url.trim()) {
            console.log('error save')
            setTitleError(!title);
            setUrlError(!url);
            return;
        }
        onSave(`<a href='${url}' alt='${title}'>${title}</a>`);
        onClose();

    }

    return (
        <div className='AddLinkForm__container'>                                                
            <div className=''>
                <IconButton icon='close' position='end' iconSize='sm' color='red' />
                
                <TextField
                    label='title'
                    name='title'
                    placeholder='Enter title'
                    fieldSize='sm'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    invalid={titleError}
                    onBlur={() => {setTitleError(!title)}}
                />
                {titleError && <p className='AddLinkForm__error'>title is required</p>}

                <TextField 
                    label='url'
                    name='url'
                    placeholder='Enter url'   
                    fieldSize='sm'  
                    onChange={(e) => setUrl(e.target.value)}    
                    value={url}  
                    invalid={urlError}
                    onBlur={() => {setUrlError(!url)}}                                          
                />
                {urlError && <p className='AddLinkForm__error'>url is required</p>}


                <Button
                    text='add link'
                    type='button'
                    buttonSize='sm'
                    onClick={saveLink}
                />
            </div>
        </div>
    )
}

