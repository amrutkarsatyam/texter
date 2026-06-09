import express from 'express'
import dataMiddleWare from '../middleware/dataMiddleware.js';
import createChat from '../controllers/createChat.js';
import getChatList from '../controllers/getChatList.js';
import sendMessage from '../controllers/sendMessage.js';
import getMessages from '../controllers/getMessages.js';

const chatRouter=express.Router();

chatRouter.post('/send',dataMiddleWare,sendMessage);
chatRouter.post('/create',dataMiddleWare,createChat);

chatRouter.get('/chatlist',dataMiddleWare,getChatList);
chatRouter.get('/messages',dataMiddleWare,getMessages);

export default chatRouter;