import { Outlet } from "react-router-dom"
import { Container } from "../Container/Container"
import { Header } from "../Header/Header"
import { useEffect } from "react"


export const Layout = () => {
    useEffect(() => {
        console.log('useEffect')
        //Создание WebSocket соединения
        
        const ws = new WebSocket('ws://localhost:8000'); // Замените на адрес вашего сервера WebSocket
                
        // Обработка события при открытии соединения
        ws.addEventListener('open', () => {
        console.log('WebSocket connection opened');
        });
        
        // Обработка события при получении сообщения
        ws.addEventListener('message', (event) => {
        const receivedMessage = event.data;
        console.log('addEventListener receivedMessage', receivedMessage);
        });       
        
    
            // fetch('http://localhost:8000').then(res => res.json()).then(res => console.log(res)).catch(e => console.log(e.message));
        
        // Закрытие WebSocket соединения при размонтировании компонента
        return () => {
        ws.close();
        };
    }, [])
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