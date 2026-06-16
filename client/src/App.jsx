import { useState } from 'react'
import '../styles/App.css'
import{BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';
import Chats from '../components/Chats.jsx';
import Chat from '../components/Chat.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path={"/"}element={<Login/>}></Route>
          <Route path={"/login"}element={<Login/>}></Route>
          <Route path={"/register"}element={<Register/>}></Route>
          <Route path={"/chats"} element={<Chats/>}></Route>
          <Route path={"/chat/:id"} element={<Chat/>}></Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App