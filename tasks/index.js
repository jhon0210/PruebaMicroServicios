const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { randomBytes } = require('crypto');

require('dotenv').config();

const EVENT_BUS_URL = 'http://localhost:4003/events';
const PORT = process.env.PORT || 4001;
const tasksByUserId = {};
const app = express();
const Task = require('./model');
const dbName = 'todo-tasks';
const uri = `mongodb+srv://app:${process.env.MONGODB_PWD}@cluster0.wkfmcby.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Connecto to DB
mongoose.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log('Connected to todo-tasks DB'))
  .catch(err => console.log(err));


app.use(bodyParser.json())
app.use(cors());


app.get('/users/:id/tasks', (req, res) => {
  res.send(tasksByUserId[req.params.id] || {});
});


app.post('/users/:id/tasks', async (req, res) => {
  // const taskId = randomBytes(4).toString('hex');
  const { title } = req.body;

  const tasks = tasksByUserId[req.params.id] || [];

  const task = new Task({ userId: req.params.id, title });
  const taskId = await task.save();

  tasksByUserId[req.params.id] = tasks;

  await axios.post(EVENT_BUS_URL, {
    type: 'TaskCreated',
    data: {
      id: taskId,
      title,
      userId: req.params.id,
    },
  })

  res.status(201).send(tasks);
});


app.put('/users/:id/tasks', async (req, res) => {
  const { title } = req.body;

  // tasks[req.params.id][]
});


app.delete('/users/tasks/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    await axios.post(EVENT_BUS_URL, {
      type: 'TaskDeleted',
      data: {
        id: deletedTask._id,
        userId: deletedTask.userId,
      },
    });

    return res.send(deletedTask);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});


app.post('/events', (req, res) => {
  console.log('Received event', req.body.type);

  res.send({});
});


app.listen(PORT, () => {
  console.log(`Task microservice listen on ${PORT}`);
});

