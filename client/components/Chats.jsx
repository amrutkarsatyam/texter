import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Chats() {

    const [chatName, setChatName] = useState("")
    const [memberName, setMemberName] = useState("")
    const [members, setMembers] = useState([]);
    const { chats, loadUserChats, createNewChat } = useContext(ChatContext)
    const navigate = useNavigate();

    useEffect(() => {
        loadUserChats();
    }, [])

    const chatElements = chats.map(chat => (
        <button
            key={chat.chatid}
            onClick={() => navigate(`/chat/${chat.chatid}`)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition hover:bg-gray-50 hover:shadow-sm"
        >
            <div className="font-medium text-gray-900">
                {chat.chatname}
            </div>
        </button>
    ))

    return (<>
        <div className="min-h-screen bg-gray-100 py-8 pt-20">
        <div className="mx-auto max-w-xl space-y-6">

            {/* Chat List */}
            <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    Chats
                </h2>

                <div className="space-y-2">
                    {chatElements}
                </div>
            </div>

            {/* Create Chat */}
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await createNewChat(chatName, members);
                }}
                className="rounded-2xl bg-white p-5 shadow-sm space-y-4"
            >
                <h2 className="text-lg font-semibold text-gray-800">
                    Create Chat
                </h2>

                <input
                    type="text"
                    value={chatName}
                    placeholder="Besties Forever"
                    onChange={(e) => setChatName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-500 py-2 font-medium text-white hover:bg-blue-600"
                >
                    Create Chat
                </button>
            </form>

            {/* Add Member */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setMembers((prev) => [...prev, memberName]);
                    setMemberName("");
                }}
                className="rounded-2xl bg-white p-5 shadow-sm space-y-4"
            >
                <h2 className="text-lg font-semibold text-gray-800">
                    Add Member
                </h2>

                <input
                    type="text"
                    value={memberName}
                    placeholder="user@mail.com"
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="w-full rounded-lg bg-gray-900 py-2 font-medium text-white hover:bg-gray-800"
                >
                    Add
                </button>
            </form>

        </div>
    </div>
    </>)
}