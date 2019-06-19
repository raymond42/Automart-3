/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/routes';
import swaggerDoc from '../swagger.json';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use('/automart3', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to AutoMart',
}));

app.use('/api/v2/', routes);

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`app is running on ${port}...`); });

export default app;
