import { useState } from "react";
import { handleLogin } from "../functions/handleEntry";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (<>

        <h1
            className="mx-auto block text-center my-20 text-3xl font-bold tracking-tight text-blue-900"
        >
            Login to start texting...
        </h1>


        <form onSubmit={
            async (e) => {
                e.preventDefault();
                handleLogin(email, password);
            }
        }>
            <label htmlFor="email"
                className="block w-[480px] mx-auto text-blue-800 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >Email:
            </label>
            <input
                id="email"
                type="email"
                className="block w-[480px] mx-auto rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="name@org.mail.domain"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />

            <label htmlFor="password"
                className="block w-[480px] mx-auto text-blue-800 text-500 px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
                Password:
            </label>
            <input
                id="password"
                type="password"
                className="block w-[480px] mx-auto rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />

            <button
                className="block w-[480px] mx-auto rounded-md border border-gray-300 bg-blue-900 px-3 py-2 my-5 text-sm text-white    font-bold  outline-none"
                type="submit"
            >
                Login
            </button>


        </form>
    </>);
}