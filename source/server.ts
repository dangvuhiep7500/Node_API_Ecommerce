import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import categoryRoutes from './routes/category';
import orderRoutes from './routes/order';

const NAMESPACE = 'Server';
const router = express();

/**connect to mongo */
mongoose
    .connect(config.mongo.url)
    .then((result) => {
        logging.info(NAMESPACE, `connected to mongoDB`);
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}],IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}],IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
    // res.header('Acces-Control-Allow-Origin', '*');
    // res.header('Acces-Control-Allow-Origin', 'Origin, X-Requested-with, Content-Type,Accept, Authorization');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    if (req.method == 'OPTIONS') {
        res.header('Acces-Control-Allow-Origin', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});
/** Routes user*/
router.use('/users', userRoutes);
/** Routes products*/
router.use('/products', productRoutes);
/** Routes cart*/
router.use('/carts', cartRoutes);
/** Routes category*/
router.use('/categories', categoryRoutes);
/** Routes category*/
router.use('/order', orderRoutes);

router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({ message: error.message });
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
