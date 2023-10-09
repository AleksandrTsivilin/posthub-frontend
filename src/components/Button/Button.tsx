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
    position = 'start', 
    children,
    ...buttonAttrs
}) => {
    return (
        <div className={classNames('Button-container', {
            'center': position === 'center',
            'end': position === 'end'
        })}>
            <button 
                className="Button"
                {...buttonAttrs}
            >
                {text || children}
            </button>
        </div>
    )
}