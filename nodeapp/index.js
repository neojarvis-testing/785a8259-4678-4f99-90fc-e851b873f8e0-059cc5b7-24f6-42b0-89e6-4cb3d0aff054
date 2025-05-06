const mongoose = require('mongoose');
const express = require('express');
const app = express();
const userRouter = require('./routers/userRouter');

app.use(express.json());

app.use('/user', userRouter);

mongoose.connect('mongodb://127.0.0.1:27017/HireFlow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to database');
        app.listen(8080, () => {
            console.log('Running on port 8080');
        })
    })
    .catch((error) => {
        console.log('Error occurred: ', error.stack);
    })