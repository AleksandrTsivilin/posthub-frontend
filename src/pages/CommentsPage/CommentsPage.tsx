import { CommentsTable } from '../../components/CommentsTable/CommentsTable';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext/useAuthContext';
import './CommentsPage.css';
import { Title } from '../../components/Title/Title';


export const CommentsPage = () => {
    const navigate = useNavigate();
    const {isAuth} = useAuthContext();

    return (
        <>
            <div className='CommentsPage__title-container'>
                <Title title='Comments' /> 
            </div>      

            <div className='CommentsPage__action-block'>
                {isAuth ? (<Button 
                    text='add comment' 
                    onClick={() => navigate('/new-comment')} 
                    position='end'
                />) : (<p className='CommentsPage__message'> * to add comment login</p>)   } 
            </div>
            
            <CommentsTable />     
        </>
    )
}