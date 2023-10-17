import React, {FC, useEffect} from 'react'
import { CommentInfo } from '../../types/commentInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './CommentItem.css';
import { BASE_URL } from '../../api';

interface Props {
    comment: CommentInfo,
    depth?: number
}

export const CommentItem: FC<Props> = ({comment , depth = 0}) => {
    const navigate = useNavigate();
    const shift = depth * 50;
    return (
        <div style={{paddingLeft: `${shift}px`}}>
            <div className='CommentItem__actions'>
                <div className='CommentItem__actions-user'>
                    insert userName {depth}-{depth * 50} 
                </div>
                <div className='CommentItem__action'>
                    <FontAwesomeIcon className='CommentItem__icon' icon={faCommentDots} onClick={() => navigate('/new-comment', {
                        state: {
                        parentId: comment?.id 
                        }
                    })}/>
                </div>              
            </div>
            {comment.parent && <p className='CommentItem__parent'>{comment.parent.text}</p>}
            <p dangerouslySetInnerHTML={{ __html: comment.text }} className='CommentItem__text'></p>
            {comment.fileUrl && <div className='CommentItem__file'>
                {comment.fileUrl.split('.')[1] === 'txt' ? (
                    <FontAwesomeIcon icon={faFileLines} style={{color: "#1f2937",}} />
                ) : (
                    <img src={`${BASE_URL}/${comment.fileUrl}`} alt='fkjdds' className='CommentItem__img' />
                )} 
            </div>}
            {comment.children?.map(child => {depth = 0; return (
                <div key={child.id}>
                    <CommentItem comment={child} depth={depth + 1} />
                </div>
            )})}
        </div>
    )
}

// style={{paddingLeft: `${shift}px`}}