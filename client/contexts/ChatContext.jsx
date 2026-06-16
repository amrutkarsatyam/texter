import { createContext, useEffect, useState } from "react";
import { getChatsData, createChat } from "../functions/chatFunctions";

export const ChatContext = createContext();

export function ChatProvider({ children }) {

    const [chats, setChats] = useState([]);

    const loadUserChats = async () => {
        if (chats.length>0) return;
        try {
            const chatsData = await getChatsData();
            if (chatsData) {
                setChats(chatsData.chatList);
                console.log(chatsData.chatList);
            }
        }
        catch (error) {
            console.log(error.message);
        }

    }
    
    const createNewChat = async (chatName,members) => {
        if(!chatName.trim())return;
        try {
            const newChatData = await createChat(chatName,members);
            setChats((prev)=>[...prev, newChatData.chatInfo]);
            console.log(newChatData.chatInfo)
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <ChatContext.Provider value={{chats, loadUserChats, createNewChat}}>
            {children}
        </ChatContext.Provider>
    )
}