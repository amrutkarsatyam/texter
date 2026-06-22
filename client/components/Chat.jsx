import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { loadChat, sendMessage } from "../functions/chatFunctions";
import { WSContext } from "../contexts/WSContext";
import { UserContext } from "../contexts/UserContext";

export default function Chat() {

    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);
    const { id } = useParams();
    const [text, setText] = useState('')
    const { sendToWS, wsRef } = useContext(WSContext);
    const { userId, userEmail } = useContext(UserContext);
    const [chatName, setChatName] = useState("");

    useEffect(() => {
        const chatDataGetter = async () => {
            try {
                const data = await loadChat(id);
                setMessages(data.messages);
                setMembers(data.members);
                setChatName(data.chatName);
            }
            catch (error) {
                console.error(error);
            }
        }
        chatDataGetter();

        const uiUpdater = (event) => {

            const messageFronWS = JSON.parse(event.data);
            console.log('New Message from websocket: ', messageFronWS);
            if (messageFronWS.type === 'newChatMessage' && messageFronWS.chatid == id) {
                setMessages(prev => [...prev, { email: messageFronWS.senderEmail, text: messageFronWS.text }]);
            }
        }

        const currentRef = wsRef.current;

        if (currentRef)
            currentRef.addEventListener('message', uiUpdater);

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('message', uiUpdater);
            }
        }

    }, [id])

    const messageElements = [...messages].reverse().map((msg, index) => {
        const isMe = (msg.email == userEmail);
        return <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
            <span className="mb-1 text-xs font-bold tracking-widest text-neutral-700 uppercase">
                {isMe ? "You" : msg.email}
            </span>
            <div className={`max-w-md break-words rounded-none px-5 py-4 text-sm font-bold 
                    ${isMe
                    ? "bg-blue-900 text-white"
                    : "border border-neutral-200 bg-green-100 text-neutral-900"
                }`}>
                {msg.text}
            </div>
        </div>
    })

    return (<>
        {
            userEmail ?
                <div className="flex h-screen w-full flex-col bg-yellow-100 pt-16 font-sans antialiased">
                    <header className="border-b border-neutral-200 bg-neutral-500 px-8 py-5">
                        <h1 className="text-xl font-black tracking-tighter text-yellow-100">
                            {chatName}
                        </h1>
                    </header>
                    <div className="flex flex-1 flex-col-reverse overflow-y-auto px-8 py-6 gap-6">
                        {messageElements}
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage(id, text);
                            setMessages(prev => [...prev, { email: userEmail, text: text }]);
                            setText("");
                            wsRef.current.send(JSON.stringify({
                                type: 'chatMessage',
                                text: text,
                                userid: userId,
                                chatid: id,
                                members: members,
                                senderEmail: userEmail
                            }));
                        }}
                        className="border-t border-neutral-200 bg-white p-6"
                    >
                        <div className="mx-auto flex max-w-4xl items-center gap-4">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="flex-1 rounded-none border border-pink-800 bg-purple-200 font-bold px-4 py-4 text-purple-900 placeholder-neutral-700 transition-colors focus:border-blue-900 focus:outline-none focus:ring-0"
                                placeholder="Type a message"
                            />

                            <button
                                type="submit"
                                className="rounded-none bg-neutral-900 px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-green-900 focus:outline-none active:scale-[0.98]"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
                :
                <h1 className="flex h-screen w-full items-center justify-center bg-yellow-100 text-3xl font-black tracking-tighter text-neutral-900 font-sans antialiased">
                    You have been logged out!
                </h1>
        }
    </>)
}
