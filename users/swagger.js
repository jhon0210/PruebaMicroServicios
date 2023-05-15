const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Metadata info about our API
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Users microservice', version: '1.0.0' },
  },
  apis: [
    'index.js',
  ],
}

// Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(
    `Users end point ver. 1 docs are available at http://locahost:${port}`
  );
};

module.exports = { swaggerDocs }

