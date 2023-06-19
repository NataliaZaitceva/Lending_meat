const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { MONGO_DEV_EMAIL } = require('./config');
const {createMessage} = require('./controllers')
const cors = require('cors');
const { PORT = 3030 } = process.env;

const app = express();
const options = {
    origin: [
      'http://localhost:5500',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
    credentials: true,
  };

app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.set('strictQuery', false);
mongoose.connect( MONGO_DEV_EMAIL );

app.use(helmet());
app.post('/send-email', createMessage)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})