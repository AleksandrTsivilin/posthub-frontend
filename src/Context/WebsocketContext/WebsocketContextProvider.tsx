import React, {FC, memo, useEffect, useMemo, useRef, useState} from "react";
import {Props as WebSocketStateProps, WebsocketContext} from './WebsocketContext';



interface Props {
    children: React.ReactNode
}

export const WebsocketProvider: FC<Props> = memo(({children}) => {

    const [isReady, setIsReady] = useState(false);
    const [comment, setComment] = useState(null);
  
    const ws = useRef<WebSocket | null>(null);
  
    useEffect(() => {
      const socket = new WebSocket("ws://localhost:8000");
      console.log('socket', socket)
  
      socket.onopen = () => {console.log('onopen context'); setIsReady(true)};
      socket.onclose = () => {console.log('onclose context'); setIsReady(false);}
      socket.onmessage = (event) => {console.log('onmessage', event.data); setComment(event.data)};
  
      ws.current = socket;
  
      return () => {
        socket.close();
      };
    }, []);

    console.log(ws.current)


    const value: WebSocketStateProps = useMemo(() => ({
        isReady,
        comment,
        send: ws.current?.send.bind(ws.current)
      }), [isReady, comment]);
  
    // const ret = [isReady, val, ws.current?.send.bind(ws.current)];
    // value
    
      
    return (
        <WebsocketContext.Provider value={value}>
            {children}
        </WebsocketContext.Provider>
    );
})