import express from "express"
import http from 'http'
import { WebSocketServer } from 'ws'
import apiRouter from './routes/apiRouter.js'
import chatRouter from "./routes/chatRouter.js"
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const app = express()
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST']
}));

app.use(express.json());

app.use('/api/auth', apiRouter);
app.use('/api/chats', chatRouter);


app.use('/api', (req, res) => {
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
app.use('/', (req, res) => {
    res.json({
        message: "Use /api to access server"
    })
})


const onlineUsers = new Map();

wsServer.on('connection', (ws, req) => {

    console.log("A Client has connected to WebSocket.");

    ws.on('message', (data) => {
        try {
            const JSONMessage = JSON.parse(data);
            console.log("Received data from client:", JSONMessage);
            switch (JSONMessage.type) {

                case 'chatMessage':
                    try {

                        console.log("Recieved a Message, Currect online users: ");
                        onlineUsers.forEach((value, key) => {
                            console.log(key);
                        })
                        JSONMessage.members.forEach((member) => {
                            if (member.userid !== JSONMessage.userid && onlineUsers.has(member.userid)) {
                                onlineUsers.get(member.userid).send(JSON.stringify({
                                    type: 'newChatMessage',
                                    text: JSONMessage.text,
                                    chatid: JSONMessage.chatid,
                                    senderId: member.userid,
                                    senderEmail: JSONMessage.senderEmail
                                }));
                            }
                        });
                    }
                    catch (error) {
                        console.log(error);
                    }
                    break;

                case "addUser":
                    try {
                        onlineUsers.set(JSONMessage.userid, ws);
                        console.log("Online User Added");
                        console.log("Currect online users: ");

                        onlineUsers.forEach((value, key) => {
                            console.log(key);
                        });
                    }
                    catch (error) {
                        console.log(error);
                    }
                    break;

                case 'deleteUser':
                    try {
                        onlineUsers.delete(JSONMessage.userid);
                        console.log("Online User Deleted");
                        console.log("Currect online users: ");

                        onlineUsers.forEach((value, key) => {
                            console.log(key);
                        });
                    }
                    catch (error) {
                        console.log(error);
                    }
                    break;

                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
        }
    })

    ws.on('close', () => {
        let removed = false;
        onlineUsers.forEach((value, key) => {
            if (value === ws) {
                onlineUsers.delete(key);
                console.log("Client disconnected, id removed from online.");
                removed = true;
            }
        });
        if (!removed)
            console.log("Client disconnected, id not removed from online.");
        console.log("Currect online users: ");
        onlineUsers.forEach((value, key) => {
            console.log(key);
        })

    });

})


server.listen(3000, console.log("API at http://localhost:3000"))