import express from 'express';
import { infrastructureRouter } from './routes/infrastructure';
import marketRouter from './routes/market';
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

app.use('/infrastructure', infrastructureRouter)
app.use('/markets', marketRouter);

app.listen(PORT, () => {
    console.log('Server is running on port 3000')
})