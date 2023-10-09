import { FC, useEffect } from "react"
import { useAuthContext } from "../../Context/AuthContext/useAuthContext"
import { useNavigate } from "react-router-dom";


interface Props {
}

export const AddCommentPage: FC<Props> = () => {
    const { isAuth } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
            console.log('no auth')
            navigate('/');
        }
    }, [isAuth, navigate])

    return (
        <>
            <div>Add Comment Page</div>   
        </>
    )
}