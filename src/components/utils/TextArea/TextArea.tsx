import { FC } from 'react';
import { ErrorMessage, FieldHookConfig, useField } from 'formik';
import { FormFieldLabel } from '../FormFieldLabel/FormFieldLabel';
import './TextArea.css';
import classNames from 'classnames';

type Props = FieldHookConfig<string> & {
    label?:string,
    id?: string,
    placeholder?: string,
    invalid?: boolean
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: FC<Props> = ({label,id, placeholder, invalid, ...props}) => {
    const {ref, ...textAreaProps} = props;
    const [field] = useField(textAreaProps);
    return (
        <div className='TextArea__container'>

            <FormFieldLabel
                label={label}
                id={id}
                invalid={invalid}
            />

            <textarea 
                className={classNames('TextArea', {
                    'border-red': invalid
                })}
                {...field}
                {...textAreaProps}
                placeholder={placeholder}
                name={field.name}
                id={id}
            ></textarea>  

            <ErrorMessage 
                className='error-message' 
                name={field.name} 
                component='div' 
            />
        </div> 
    )
}