import express from 'express';
import userRoutes from './userRoutes';

const apiRouter = express.Router();

apiRouter.use('/users', userRoutes);

export default apiRouter;