const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: 'https://8081-cfcbdadefbeadacbeabccbfbecbdaff.premiumproject.examly.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'X-Powered-By'],
    credentials: false
}))

app.use('/user', userRouter);

mongoose.connect('mongodb://127.0.0.1:27017/HireFlow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        app.listen(8080);
    })
    .catch((error) => {
        console.log('Error occurred: ', error.stack);
    })