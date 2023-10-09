import { FC } from "react"
import { CommentsTable } from "../../components/CommentsTable/CommentsTable"


interface Props {
}

export const CommentsPage: FC<Props> = () => {
    return (
        <>
            <div>CommentsPage</div>   
            <CommentsTable />     
        </>
    )
}