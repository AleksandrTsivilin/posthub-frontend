import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext/useAuthContext"
import { Button } from "../../components/Button/Button"

export const LoginPage = () => {
    const {setIsAuth} = useAuthContext();
    const navigate = useNavigate();
    
    const submitHandler = () => {
        setIsAuth(true);
        navigate(-1)
    };

    return (
        <div>
            login page
            <Button text='login' position="center" onClick={submitHandler}/> 
        </div>
    )
}