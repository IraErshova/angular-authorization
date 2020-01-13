const express = require('express');
const mockDB = require('./data.mock');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwtService = require('./jwt');

const app = express();

const jwtSecretString = 'everybody loves ice cream';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Login user via username and password
 */
app.post('/login', function (req, res) {
  const loginData = req.body;

  if (!loginData || !loginData.username || !loginData.username) {
    return res.status(400).send('Please enter valid data!');
  }

  const user = mockDB.users.find(user => user.username === loginData.username);

  if (!user) {
    return res.status(400).send('Username or password is wrong!');
  }

  if (user && user.password !== loginData.password) {
    return res.status(400).send('Username or password is wrong!');
  }

  const payload = {
    id : user.id,
    email: user.email,
    username: user.username
  };
  const accessToken = jwtService.getAccessToken(payload);
  const refreshToken = jwtService.getRefreshToken(payload);

  res.send({
    user,
    accessToken,
    refreshToken
  });
});

/**
 * Get job list for current user
 */
app.get('/job-list', function (req, res) {
  const userId = req.query.userId;

  if (!userId) {
    res.status(400).send('There is no user data');
  }

  const jobList = mockDB.jobs.filter(job => job.user_id === userId);

  res.send(jobList);
});

app.post('/refresh-token', function (req, res) {
  // update access and refresh tokens
});

app.listen(8000, function () {
  console.log('Server listening on port 8000!');
});
