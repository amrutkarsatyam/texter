import { createContext, useRef, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const WSContext = createContext();

export function WSProvider({ children }) {

    const wsRef = useRef(null);
    const { userId } = useContext(UserContext);

    useEffect(() => {

        // wsRef.current = new WebSocket('ws://localhost:3000');

        // wsRef.current.onopen = () => {
        //     console.log('WebSocket Connected!');
        // }

        if (wsRef.current)
            wsRef.current.onclose = () => {
                if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                    console.log('WebSocket Server Disconnected by Client.');
                    wsRef.current.send(JSON.stringify({
                        type: 'deleteUser',
                        userid: userId
                    }));
                }
            }

        // wsRef.current.onmessage = (message) => {
        //     const messageData = JSON.parse(message.data);
        //     console.log("Received Data from WebSocket server:", messageData);
        // }

    }, [])

    const sendToWS = (data) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(data));
        }
        else console.error("WebSocket is not Connected, unable to send message!");
    }

    return (
        <WSContext.Provider value={{ wsRef, sendToWS }}>
            {children}
        </WSContext.Provider>
    )
}