const jwt = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');
const mockDB = require('./data.mock');

const jwtSecretString = 'everybody loves ice cream';

function getAccessToken(payload) {
  return jwt.sign({user: payload}, jwtSecretString, { expiresIn: '15min' });
}

function getRefreshToken(payload) {
  // get all user's refresh tokens from DB
  const userRefreshTokens = mockDB.tokens.filter(token => token.userId === payload.id);

  // check if there are 5 or more refresh tokens,
  // which have already been generated. In this case we should
  // remove all this refresh tokens and leave only new one for security reason
  if (userRefreshTokens.length >= 5) {
    mockDB.tokens = mockDB.tokens.filter(token => token.userId !== payload.id);
  }

  const refreshToken = jwt.sign({user: payload}, jwtSecretString, { expiresIn: '30d' });

  mockDB.tokens.push({
    id: uuidv1(),
    userId: payload.id,
    refreshToken
  });

  return refreshToken;
}

module.exports = {
  getAccessToken,
  getRefreshToken
};
