import { useCallback, useContext, useState } from "react";
import { handleLogin } from "../functions/handleEntry";
import { UserContext } from "../contexts/UserContext";
import { WSContext } from "../contexts/WSContext";
import { ChatContext } from "../contexts/ChatContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const { userIdSetter, userEmailSetter } = useContext(UserContext);
    const { wsRef } = useContext(WSContext);
    const { setChats } = useContext(ChatContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FDFDFD] font-sans text-neutral-900 antialiased">

            <h1
                className="mb-8 text-center text-3xl font-bold tracking-tighter text-red-900"
            >
                Login to start texting...
            </h1>


            <form
                className="flex w-full max-w-sm flex-col space-y-5"
                onSubmit={
                    async (e) => {
                        e.preventDefault();
                        const userid = await handleLogin(email, password);

                        if (userid !== "") {
                            setChats([]);
                            userEmailSetter(email);
                            userIdSetter(userid);
                            wsRef.current = new WebSocket('ws://localhost:3000');
                            wsRef.current.onopen = () => {
                                console.log('WS Server Connection Opened!')
                                wsRef.current.send(JSON.stringify({
                                    type: 'addUser',
                                    userid: userid
                                }));
                            }
                            navigate('/chats')
                        }
                    }
                }>
                <label htmlFor="email"
                    className="mb-1 block text-sm font-bold text-neutral-600"
                >Email:
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full rounded-none border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-neutral-900 focus:outline-none focus:ring-0"
                    placeholder="name@org.mail.domain"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />

                <label htmlFor="password"
                    className="mb-1 block text-sm font-bold text-neutral-600"
                >
                    Password:
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full rounded-none border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:border-neutral-900 focus:outline-none focus:ring-0"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <button
                    className="mt-2 w-full rounded-none bg-blue-900 px-4 py-4 text-sm font-bold text-white transition-all duration-200 hover:bg-neutral-800 focus:outline-none active:scale-[0.98]"
                    type="submit"
                >
                    Login
                </button>


            </form>
        </div>
    );
}