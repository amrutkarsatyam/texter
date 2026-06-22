import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import App from './App.jsx'
import { ChatProvider } from '../contexts/ChatContext.jsx'
import { WSProvider } from '../contexts/WSContext.jsx'
import { UserProvider } from '../contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <WSProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </WSProvider>
  </UserProvider>
)
