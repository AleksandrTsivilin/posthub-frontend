import { FC, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { getById } from "../../api/commentsApi";
import { Title } from "../../components/utils/Title/Title";
import { CommentInfo } from "../../types/commentInfo";
import { useNavigate } from "react-router-dom";
import { CommentItem } from "../../components/CommentItem/CommentItem";
import { IconButton } from "../../components/utils/IconButton/IconButton";

interface Props {
}

export const CommentDetailPage: FC<Props> = () => {
    const { pathname } = useLocation();
    const [comment, setComment] = useState<CommentInfo | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const id = pathname.slice(1);
        if (id) {
            getById(Number(id)).then(res => {console.log(res.data); setComment(res.data)}).catch(e => console.log(e))
        }
    }, [pathname])
    return (
        <>
            <Title title="Comment detail"/>   
            <IconButton icon='back' position="start" color='gray' onClick={() => navigate(-1)} iconSize="sm"/>
            {comment && <CommentItem comment={comment} />}
        </>
    )
}