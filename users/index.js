const axios = require('axios');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { randomBytes } = require('crypto');

require('dotenv').config();

const dbName = 'todo-users';
const uri = `mongodb+srv://app:${process.env.MONGODB_PWD}@cluster0.wkfmcby.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const EVENT_BUS_URL = 'http://localhost:4003/events';
const PORT = process.env.PORT || 4000;
const app = express();
const User = require('./model');

// Connecto to DB
mongoose.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log('Connected to todo-users DB'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());

app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await User.findOne({ username });

  if (!foundUser)
    return res.status(400).send({ message: 'Usename or password incorrect' })

  const match = await bcrypt.compare(password, foundUser?.password);

  if (match) {
    const accessToken = generateAccessToken(username);

    res.header('Authorization', accessToken).json({
      message: 'User authenticated',
      userId: foundUser.id,
      username: foundUser.username,
      token: accessToken,
    });
  } else
    res.status(400).send({ message: 'Access denied' });
});


app.post('/users/signup', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send({ message: 'Username & password are required' })

  // check for duplicate usernames in the DB
  const duplicate = await User.findOne({ username }).exec();

  if (duplicate)
    return res.sendStatus(409); // Conflict

  const hashedPwd = await bcrypt.hash(password, 10);
  const user = new User({ id, username, password: hashedPwd });
  await user.save();

  console.log('Sending data to event bus');

  await axios.post(EVENT_BUS_URL, {
    type: 'UserCreated',
    data: { id, username },
  });

  res.status(201).send({ message: 'User created' });
});


app.post('/events', (req, res) => {
  console.log('Received event', req.body.type);
  res.send({});
});


app.listen(PORT, () => {
  console.log(`User Microservice listen on ${PORT}`);
});


const generateAccessToken = (username) => {
  return jwt.sign({ username }, process.env.SECRET_TOKEN, { expiresIn: 60 * 60 })
};

