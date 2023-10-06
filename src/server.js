const express = require("express");
const path = require('path');
const app = express();
const port = 3000;

const swaggerDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NodeJS Practice",
      version: "1.0.0",
    },
  },
  apis: [`${path.join(__dirname, 'routes')}/*.js`, "server.js"],
};

const swaggerSpec = swaggerDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/health-check", require("./routes/healthCheck"));

app.get('/*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
