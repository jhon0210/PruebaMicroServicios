const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const PORT = 4003;
const USERS_EVENTS_URL = 'http://localhost:4000/events';
const TASKS_EVENTS_URL = 'http://localhost:4001/events';
const QUERY_SERVICE_URL = 'http://localhost:4002/events';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req, res) => {
  const event = req.body;

  console.log('Event recieved', event);
  axios.post(USERS_EVENTS_URL, event);
  axios.post(TASKS_EVENTS_URL, event);
  axios.post(QUERY_SERVICE_URL, event);

  res.send({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Event Bus listening on ${PORT}`);
});

