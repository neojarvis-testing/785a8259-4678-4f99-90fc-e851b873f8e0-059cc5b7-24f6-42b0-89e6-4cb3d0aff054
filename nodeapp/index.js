const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const userRouter = require('./routers/userRouter');
const requirementRouter = require('./routers/requirementRouter');
const candidateRouter = require('./routers/candidateRouter');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: process.env.backendUri4,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'X-Powered-By'],
    credentials: false
}))
app.options('*',cors());

app.use('/user', userRouter);
app.use('/requirement', requirementRouter);
app.use('/candidate', candidateRouter);

mongoose.connect('mongodb://127.0.0.1:27017/HireFlow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        app.listen(8080);
    })
    .catch((error) => {
        console.log('Error occurred: ', error.stack);
    })