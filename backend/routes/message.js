import express from 'express';
import { sendMessage } from '../controller/message.js';

const messageRouter = express.Router();

messageRouter.post('/send',sendMessage);

export default messageRouter;