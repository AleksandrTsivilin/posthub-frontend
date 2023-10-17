import { ReactSVG } from 'react-svg';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { FC, useState } from 'react';
import { TextField } from '../TextField/TextField';
import { BASE_URL } from '../../../api';
import './Captcha.css';

type Props = {
    label?: string,  
    name: string,
    placeholder?: string,
    invalid?: boolean
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

export const Captcha: FC<Props> = ({
    label,
    name,
    placeholder,
    invalid=false}) => {

    const [, forceUpdate] = useState({});
    const [isError, setIsError] = useState<boolean>(false);

    return (
        <div className='Captcha-container'>
            <div className='Captcha__input'>
                <TextField 
                    id='captcha'
                    label={label}
                    type='text'
                    placeholder={placeholder}
                    name={name}
                    invalid={invalid}
                />
            </div>            
            
            <div className='Captcha__svg-container'>
                <label className='Captcha__svg-label'>
                    code
                </label>

                <ReactSVG 
                    src={`${BASE_URL}/captcha`}
                    beforeInjection={(svg) => {
                        svg.classList.add('Captcha__svg');
                    }} 
                    loading = {() => <div> <Loader /> </div>}
                    fallback={() => (
                        <>
                            <div>
                                <Button text='↻' position='end' onClick={() => forceUpdate({})} />
                            </div>
                            {isError && <p className='error-text'>invalid code try again</p>}
                        </>
                    )}
                    onError={() => setIsError(true)}
                />
            </div>
        </div>
    )
}