'use strict';

const User = require('./user-schema');

module.exports = role => (req, res, next) => {

  if (!req.headers.authorization) return _noHeaders();

  let [authType, authString] = req.headers.authorization.split(' ');

  switch (authType.toLowerCase()) {
  case 'basic':
    return _authBasic(authString);
  case 'bearer':
    return _authBearer(authString);
  default:
    return _authSwitchError();
  }

  async function _authenticate(user) {
    if (!user) return _authError();
    if (!user.is(role)) return _NotAuthorized();

    req.user = user;
    req.token = user.generateToken();
    next();
  }

  async function _authBearer(token) {
    let user = await User.authenticateToken(token);
    await _authenticate(user);
  }

  function _authBasic(authBase64String) {
    let base64Buffer = Buffer.from(authBase64String, 'base64');
    let authString = base64Buffer.toString();
    let [username, password] = authString.split(':');
    let auth = { username, password };

    return User.authenticateBasic(auth).then(user => _authenticate(user));
  }

  function _authError() {
    next({
      status: 401,
      statusMessage: 'Invalid Username/Password',
      message: 'Invalid Username/Password',
    });
  }

  function _headerError() {
    next({
      status: 405,
      statusMessage: 'No request headers',
      message: 'No request header',
    });
  }
  function _authSwitchError() {
    next({
      status: 404,
      statusMessage: 'switch error',
      message: 'switch error',

    });
  }
};