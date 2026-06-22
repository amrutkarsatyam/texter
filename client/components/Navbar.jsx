import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b border-neutral-200 bg-pink-100 px-8">
        <div className="ml-auto flex h-full items-center gap-8">


          <NavLink to="/chats" className={({ isActive }) => isActive ? "font-bold transition-colors duration-200 text-blue-900" : "font-bold text-neutral-800 transition-colors duration-200 hover:text-neutral-900"}>
            My Chats
          </NavLink>

          <NavLink to="/login" className={({ isActive }) => isActive ? "font-bold transition-colors duration-200 text-green-800" : "font-bold text-neutral-800 transition-colors duration-200 hover:text-neutral-900"}>
            Login
          </NavLink>

          <NavLink to="/register" className={({ isActive }) => isActive ? "font-bold transition-colors duration-200 text-red-700" : "font-bold text-neutral-800 transition-colors duration-200 hover:text-neutral-900"}>
            Register
          </NavLink>


          <button
            onClick={() => { navigate("/") }}
            className="text-xl font-black tracking-tighter text-purple-900 transition-opacity duration-200 hover:text-blue-900 hover:underline focus:outline-none"
          >
            teXter
          </button>
        </div >
      </nav>
    </>
  );
}