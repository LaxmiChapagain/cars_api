import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import serveFavicon from 'serve-favicon';
import logger from './utilis/logger.js';
import router from './routes.js';
import errorHandler from './middlewares/errorHandler.js';


const server = express();
dotenv.config();
server.use(cors()); // cors package allows access of data from multiple origin
server.use(serveFavicon('./public/favicon.ico'));

server.use(helmet());
server.use(morgan('common'));
server.use(bodyParser.json());

server.use(router);

server.use(errorHandler);

server.listen(process.env.PORT, () => {
    logger.info(`Listening on 127.0.0.1:${process.env.PORT}`);
});