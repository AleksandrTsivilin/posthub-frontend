import { FC, useEffect, useState } from 'react';
import './CommentsTable.css';
import { CommentInfo } from '../../types/commentInfo';
import { getComments } from '../../api/commentsApi';
import { useNavigate } from 'react-router-dom';

interface Props {
}

export const CommentsTable: FC<Props> = () => {
    const [comments, setComments] = useState<CommentInfo []>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getComments()
            .then(setComments)
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    if (error.length) {
        return (
            <p className='Comments-Table__message error-message'>{error}</p>
        )
    }

    if (isLoading) {
        return (
            <p className='Comments-Table__message'>Loading...</p>
        )
    }

    if (comments.length === 0 && !isLoading) {
        return (
            <p className='Comments-Table__message'>No comments</p>
        )
    }

    const clickRowsHandler = (id: number) => {
        navigate(`/${id}`);
    }
     
    return (       
        <table className="Comments-Table">
            <thead>
                <tr >
                    <th className="Comments-Table__header">User name</th>
                    <th className="Comments-Table__header">Email</th>
                    <th className="Comments-Table__header">Date</th>
                </tr>
            </thead>
            <tbody>
                {comments.map(comment => (
                    <tr key={comment.id} className="Comments-Table__rows" onClick={() => clickRowsHandler(comment.id)}>                        
                        <td className='Comments-Table__ceil'>{comment.userName}</td>
                        <td className='Comments-Table__ceil'>{comment.email}</td>
                        <td className='Comments-Table__ceil'>date</td>                       
                    </tr> 
                ))}
            </tbody>
        </table>
    )
}