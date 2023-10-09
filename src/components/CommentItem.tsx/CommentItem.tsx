import React, {FC, useEffect} from 'react'
import { CommentInfo } from '../../types/commentInfo'

interface Props {
    comment: CommentInfo,
    depth?: number
}

export const CommentItem: FC<Props> = ({comment , depth = 1}) => {
    // console.log(comment.id, depth)
    useEffect(() => {
        console.log('useEffect comment')
    }, [])
    const shift = depth * 50;
    return (
        <div >
            {comment.children?.map(child => (
                <div key={child.id} style={{paddingLeft: `${shift}px`}}>
                    <p key={child.id} style={{marginBottom: '10px', background: 'red'}}>{`${child.id} - ${depth}`}</p>
                    <CommentItem comment={child} depth={depth + 1} />
                </div>
            ))}
        </div>
    )
}