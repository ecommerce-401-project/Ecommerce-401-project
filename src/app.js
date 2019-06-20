const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
app.use(cors());
app.use(morgan('dev'));

const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Ecommerce 401 Project', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: [`${__dirname}/**/routes/*.js`],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
app.get('/api/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/player-routes'));
app.use(require('./routes/publisher-routes'));
app.use(require('./routes/admin-routes'));
app.use(require('./auth/routes/auth-router'));


app.use(notFound);
app.use(errorHandler);


module.exports = {
  server: app,
  start: port =>
    app.listen(port, () => console.log(`Server up on port ${port}`)),
};





