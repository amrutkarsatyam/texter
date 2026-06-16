import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadChat, sendMessage } from "../functions/chatFunctions";

export default function Chat() {

    const [messages, setMessages] = useState([]);
    const { id } = useParams();
    const [text, setText] = useState('')

    useEffect(() => {
        const messageGetter = async () => {
            const data = await loadChat(id);
            setMessages(data.messages);
        }
        messageGetter();
    }, [])

    const messageElements = messages.map((msg, index) =>
        <div key={index} className="flex justify-end mb-2">
            <div className="max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-sm text-white break-words shadow-sm">
                {msg.text}
            </div>
        </div>

    )

    return (<>
        <div className="h-screen bg-gray-100">
            <div className="h-full pb-24 px-4 overflow-y-auto flex flex-col justify-end">
                {messageElements}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(id, text);
                    setMessages(prev => [...prev, { text:text }]);
                    setText("");
                }}
                className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3"
            >
                <div className="max-w-3xl mx-auto flex items-center gap-3">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 rounded-full border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                        placeholder="Type a message"
                    />

                    <button
                        type="submit"
                        className="rounded-full bg-blue-500 px-5 py-2 text-white font-medium hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    </>)
}
