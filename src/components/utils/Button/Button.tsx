import classNames from 'classnames'
import { FC } from 'react'
import './Button.css';

type Props = {
    text?: string,
    children?: React.ReactElement
    position?: 'start' | 'center' | 'end'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<Props> = ({
    text, 
    position, 
    children,
    ...buttonAttrs
}) => {
    return (
        <div className={classNames('Button-container', {
            'start': position === 'start',
            'center': position === 'center',
            'end': position === 'end',
        })}>
            <button 
                className={classNames('Button', {
                    'full': !position
                })}
                {...buttonAttrs}
            >
                {text || children}
            </button>
        </div>
    )
}