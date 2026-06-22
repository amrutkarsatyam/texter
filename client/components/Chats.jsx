import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Chats() {

    const [chatName, setChatName] = useState("")
    const [memberName, setMemberName] = useState("")
    const [members, setMembers] = useState([]);
    const { chats, loadUserChats, createNewChat } = useContext(ChatContext)
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        loadUserChats();
    }, [userId])

    const chatElements = chats.map(chat => (
        <button
            key={chat.chatid}
            onClick={() => navigate(`/chat/${chat.chatid}`)}
            className="group flex w-full items-center justify-between border-b border-neutral-100 bg-white px-6 py-5 text-left transition-colors duration-200 hover:bg-neutral-50 focus:outline-none"        >
            <div className="text-sm font-bold tracking-tight text-neutral-900 group-hover:underline">
                {chat.chatname}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Open →
            </span>
        </button>
    ))

    return (<>
        {userId ? (
            <div className="flex h-screen w-full bg-[#FDFDFD] font-sans antialiased">
                <div className="mx-auto flex w-full max-w-6xl gap-8 px-6 pt-24 pb-12">
                    <div className="flex w-1/3 flex-col overflow-hidden border border-neutral-200 bg-white shadow-sm">
                        <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-5">
                            <h2 className="text-lg font-black tracking-tighter text-neutral-900">
                                Chats
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto" style={{ overflowAnchor: 'auto' }}>
                            {
                                chats.length > 0 ?
                                    (<div className="flex flex-col">
                                        {chatElements}
                                    </div>)
                                    : (<div className="px-6 py-8 text-sm italic text-neutral-400">
                                        No chats.
                                    </div>)
                            }
                        </div>
                    </div>


                    <div className="flex w-2/3 flex-col space-y-8">
                        <div className="border border-neutral-200 bg-white p-8 shadow-sm">
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (!chatName.trim()) return;
                                    await createNewChat(chatName, members);
                                    setMembers([]);
                                    setChatName("");
                                }}
                                className="flex flex-col space-y-6"
                            >
                                <div className="border-b border-neutral-100 pb-4">
                                    <h2 className="text-xl font-black tracking-tighter text-neutral-900">
                                        Create a new Chat
                                    </h2>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                                        Chat Name
                                    </label>
                                    <input
                                        type="text"
                                        value={chatName}
                                        placeholder="Besties Forever"
                                        onChange={(e) => setChatName(e.target.value)}
                                        className="w-full rounded-none border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-none bg-neutral-900 px-4 py-4 text-sm font-bold tracking-widest text-white transition-all duration-200 hover:bg-neutral-800 focus:outline-none active:scale-[0.99]"
                                >
                                    Create Chat
                                </button>
                            </form>
                        </div>

                        <div className="flex-1 border border-neutral-200 bg-white p-8 shadow-sm">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (members.includes(memberName)) return;
                                    if (!memberName.trim()) return;
                                    setMembers((prev) => [...prev, memberName]);
                                    setMemberName("");
                                }}
                                className="flex h-full flex-col space-y-6"
                            >
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                                        Add Member
                                    </label>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={memberName}
                                            placeholder="user@mail.com"
                                            onChange={(e) => setMemberName(e.target.value)}
                                            className="flex-1 rounded-none border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-neutral-900 focus:bg-white focus:outline-none focus:ring-0"
                                        />

                                        <button
                                            type="submit"
                                            className="rounded-none bg-neutral-200 px-6 py-3 text-sm font-bold text-neutral-900 transition-colors duration-200 hover:bg-neutral-300 focus:outline-none active:scale-[0.98]"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>


                                <div className="flex flex-1 flex-col overflow-hidden border border-neutral-200 bg-neutral-50">
                                    <div className="flex-1 overflow-y-auto" style={{ overflowAnchor: 'auto' }}>
                                        {
                                            members.length === 0 ? (
                                                <div className="p-4 text-sm italic text-neutral-400">
                                                    No members added yet.
                                                </div>
                                            ) : (
                                                <div className="flex flex-col">
                                                    {members.map((memberName) => (
                                                        <div key={memberName} className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 last:border-0 hover:bg-neutral-50 transition-colors duration-150">
                                                            <span
                                                                className="text-sm font-bold text-neutral-700"
                                                            >
                                                                {memberName}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => { setMembers(prev => prev.filter(thisMember => thisMember != memberName)) }}
                                                                className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 transition-colors duration-200 hover:text-red-600 focus:outline-none"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <div style={{ height: "1px" }}></div>
                                                </div>
                                            )}
                                    </div>
                                </div >
                            </form>
                        </div>
                    </div>
                </div >
            </div>
        ) : (
            <div className="flex min-h-screen w-full items-center justify-center bg-[#FDFDFD]">
                <div className="border border-neutral-200 bg-white px-12 py-8 shadow-sm">
                    <h1 className="text-xl font-black tracking-tighter text-neutral-900">Login To View Chats.</h1>
                </div>
            </div>
        )}

    </>
    );
}