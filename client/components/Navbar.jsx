import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate=useNavigate();
  return (
    <>
<nav className="fixed top-0 left-0 right-0 z-50 flex gap-4 p-3 bg-white border-b">


        <NavLink to="/chats" className="hover:font-bold">
          My Chats
        </NavLink>

        <NavLink to="/login" className="hover:font-bold">
          Login
        </NavLink>

        <NavLink to="/register" className="hover:font-bold">
          Register
        </NavLink>


        <button
        onClick={()=>{navigate("/")}}
          className="ml-auto font-bold text-blue-600"
        >
            teXter
          </button>
      </nav>
    </>
  );
}