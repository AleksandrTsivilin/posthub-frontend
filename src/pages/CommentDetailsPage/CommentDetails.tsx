import { FC, useEffect, useState } from "react"
import { CommentsList } from "../../components/CommentsList/CommentsLIst"
import { useLocation } from "react-router-dom";
import { getById } from "../../api/commentsApi";
import { Title } from "../../components/utils/Title/Title";
import { CommentInfo } from "../../types/commentInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { CommentItem } from "../../components/CommentItem/CommentItem";

interface Props {
}

export const CommentDetailPage: FC<Props> = () => {
    const { pathname } = useLocation();
    const [comment, setComment] = useState<CommentInfo | null>(null);
    useEffect(() => {
        const id = pathname.slice(1);
        if (id) {
            getById(Number(id)).then(res => {console.log(res.data); setComment(res.data)}).catch(e => console.log(e))
        }
    }, [pathname])
    return (
        <>
            <Title title="Comment detail"/>   
            {comment && <CommentItem comment={comment} />}
            {/* {comment?.text}
            <FontAwesomeIcon icon={faCommentDots} onClick={() => navigate('/new-comment', {
                state: {
                   parentId: comment?.id 
                }
            })}/>
            <CommentsList childrenComments={comment?.children}/>      */}
        </>
    )
}