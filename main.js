const express = require('express');
const app = express();

const awaitCallback = require('./CallBack/awaitCalBack');
const promiseCallback = require('./CallBack/promiseCalBack');

app.use('/api/awaitCallBack', awaitCallback);
app.use('/api', promiseCallback);

var server = app.listen(5000, function () {
    console.log('Server is running..');
});



