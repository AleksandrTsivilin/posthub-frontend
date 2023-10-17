import { CommentsTable } from '../../components/CommentsTable/CommentsTable';
import { Button } from '../../components/utils/Button/Button';
import { useNavigate } from 'react-router-dom';
import './CommentsPage.css';
import { Title } from '../../components/utils/Title/Title';


export const CommentsPage = () => {
    const navigate = useNavigate();
   

    return (
        <>
            <div className='CommentsPage__title-container'>
                <Title title='Comments' /> 
            </div>      

            <div className='CommentsPage__action-block'>
                <Button 
                    text='add comment' 
                    onClick={() => navigate('/new-comment')} 
                    position='end'
                />
            </div>
            
            <CommentsTable />
        </>
    )
}