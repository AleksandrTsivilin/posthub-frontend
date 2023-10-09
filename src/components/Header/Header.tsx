import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import './Header.css';
import { useAuthContext } from '../../Context/AuthContext/useAuthContext';

export const Header = () => {
    const { isAuth, setIsAuth } = useAuthContext();
    const navigate = useNavigate();

    return (
        <div className='Header'>
            <Link to='/' className='Header__logo'>
                Comments
            </Link>
            
            {isAuth 
                ? ( <Button text='sign out' onClick={() => setIsAuth(false)} /> ) 
                : ( <Button text='sign in' onClick={() => {navigate('/login')} } /> )}
            
        </div>
    )
}