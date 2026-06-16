import express from "express"
import http from 'http'
import {WebSocketServer} from 'ws'
import apiRouter from './routes/apiRouter.js'
import chatRouter from "./routes/chatRouter.js"
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const app=express()
const server=http.createServer(app);
const wsServer=new WebSocketServer({server});

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:['GET', 'POST']
}));

app.use(express.json());

app.use('/api/auth',apiRouter);
app.use('/api/chats',chatRouter);
app.use('/api',(req,res)=>{
    res.json({
        "message": "Welcome",
        "routes": [
            '/register',
            '/login',
            '/chats/chatlist/',
            '/chats/create',
            '/chats/:id',
            '/chats/send'
        ]
    })
});
app.use('/',(req,res)=>{
    res.json({
        message: "Use /api to access server"
    })
})

wsServer.on('connection',(connection)=>{
    console.log("wsConnection Here\nData: "+connection);
})


server.listen(3000, console.log("API at http://localhost:3000"))