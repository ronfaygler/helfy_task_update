const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/tasks', require('./routes/tasksRoutes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});