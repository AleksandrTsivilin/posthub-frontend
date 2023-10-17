import { FC } from 'react'
import { CommentInfo } from '../../types/commentInfo'
import { CommentItem } from '../CommentItem/CommentItem';

interface Props {
    childrenComments?: CommentInfo[]
}

export const CommentsList: FC<Props> = ({childrenComments}) => {
    console.log(childrenComments)
    return (
        <>
            <div>CommentsList</div>
            {childrenComments?.map(comment => (                
                <CommentItem key={comment.id} comment={comment} />                
            ))}
        </>
    )
}