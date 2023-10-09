import { useState } from 'react'
import { CommentInfo } from '../../types/commentInfo'
import { CommentItem } from '../CommentItem/CommentItem'

export const CommentsList = () => {
    const [ comments ] = useState<CommentInfo []>([]);
    return (
        <>
            <div>CommentsList</div>
            {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </>
    )
}