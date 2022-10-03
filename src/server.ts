import express from 'express';
import routes from './routes';
import './config/db';

const { SERVER_PORT } = process.env

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    return next();
});
app.use(express.json());
app.use(routes);

app.listen(SERVER_PORT, () => {
    console.log('start')
})