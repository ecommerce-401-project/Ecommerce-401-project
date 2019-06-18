const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/player-routes'));
app.use(require('./routes/publisher-routes'));
app.use(require('./routes/admin-routes'));
app.use(require('./auth/routes/auth-router'));
module.exports = {
  server: app,
  start: port =>
    app.listen(port, () => console.log(`Server up on port ${port}`)),
};
