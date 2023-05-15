const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const PORT = 4002
const app = express();
const Task = require('./model');
const dbName = 'todo-queries';
const uri = `mongodb+srv://app:${process.env.MONGODB_PWD}@cluster0.wkfmcby.mongodb.net/${dbName}?retryWrites=true&w=majority`;


// Connecto to DB
mongoose.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log('Connected to todo-queries DB'))
  .catch(err => console.log(err));


app.use(bodyParser.json());
app.use(cors());


const users = {};

app.get('/users/:id/tasks', (req, res) => {
  const id = req.params.id;
  res.send(users[id]);
});


app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type == 'UserCreated') {
    const { id, username } = data;

    const task = new Task({ userId: id, username, tasks: [] });
    await task.save();

    users[id] = { id, username, tasks: [] };
  }

  if (type === 'TaskCreated') {
    const { id, title, userId } = data;

    const user = users[userId];
    user.tasks.push({ id, title });

    res.send({});
  }

  if (type === 'TaskDeleted') {
    const { id, userId } = data;

    const userTasks = users[userId].task;
    const result = await userTasks.filter((task) => (task.id !== id));
    console.log(user);
    console.log(result);
  }

  console.log(users);
});


app.listen(PORT, () => {
  console.log(`Query microservice listening on ${PORT}`);
});

