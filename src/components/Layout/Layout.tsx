import { Outlet } from "react-router-dom"
import { Container } from "../Container/Container"


export const Layout = () => {
    return (        
        <main>
            <Container>
                <Outlet />
            </Container>
        </main>       
    )
}