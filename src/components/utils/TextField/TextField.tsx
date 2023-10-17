import { FC } from 'react'
import classNames from 'classnames'
import { ErrorMessage, Field } from 'formik';
import './TextField.css';
import { FormFieldLabel } from '../FormFieldLabel/FormFieldLabel';

type Props = {
    id?: string,
    label?: string,  
    name: string,
    placeholder?: string,
    invalid?: boolean
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export const TextField: FC<Props> = ({
    id,
    label,
    name,
    placeholder,
    invalid=false,
    ...inputAttrs
})  => {
    
    return (
        <div className='TextField'>

            <FormFieldLabel 
                label={label}
                id={id || name}
                invalid={invalid}
            
            />

            <Field 
                className={classNames(
                    'TextField__input', {
                        'border-red': invalid
                    }
                )}

                type='text' 
                id={name} 
                name={name}
                placeholder={placeholder} 
                {...inputAttrs}
            />

            <ErrorMessage 
                className='TextField__error-message error-text-color' 
                name={name} 
                component='div' 
            />
        </div>
    )
}