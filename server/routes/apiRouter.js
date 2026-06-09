import express from 'express'
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';
import loginMiddleWare from '../middleware/dataMiddleware.js';

const apiRouter=express.Router();

apiRouter.post('/register',registerController);
apiRouter.post('/login',loginController);

export default apiRouter;