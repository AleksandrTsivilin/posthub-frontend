import { Outlet } from "react-router-dom"
import { Container } from "../Container/Container"
import { Header } from "../Header/Header"


export const Layout = () => {
    return (      
        <>          
            <Header />
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
        </>       
    )
}