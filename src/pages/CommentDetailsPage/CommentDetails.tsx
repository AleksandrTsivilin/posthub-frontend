import { FC } from "react"
import { CommentsList } from "../../components/CommentsList.tsx/CommentsLIst"

interface Props {
}

export const CommentDetailPage: FC<Props> = () => {
    return (
        <>
            <div>CommentsPage</div>   
            <CommentsList />     
        </>
    )
}