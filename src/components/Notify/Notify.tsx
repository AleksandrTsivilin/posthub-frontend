import { FC } from 'react';
import './Notify.css';
import classNames from 'classnames';

interface Props {
    message: string,
    status?: 'error' | 'success',
    onClose: () => void
}

export const Notify: FC<Props> = ({message, status, onClose}) => {
    return (
        <div className={classNames('Notify__wrapper', {
            'error-color': status === 'error',
            'success-color': status === 'success',
            'isActive': message.length
        })}>
           <p className='single-line-text'>{message}</p>
           <button className='Notify__close' onClick={onClose}>x</button>
        </div>
    )
}