require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route.js");
const app = express();

// MongoDB Data
const userDB = process.env.USER; // Estos valores vienen del fichero ".env" que por defecto oculta git (acá debes poner tus datos de Closter de MongoDB)
const passwordDB = process.env.PASSWORD; // Estos valores vienen del fichero ".env" que por defecto oculta git (acá debes poner tus datos de Closter de MongoDB)

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Activa el form url encoded

// Routes
app.use("/api/products", productRoutes);

// Run Server
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

mongoose
  .connect(
    `mongodb+srv://${userDB}:${passwordDB}@crudapp-backend.951bw.mongodb.net/Node-API?retryWrites=true&w=majority&appName=crudapp-backend`
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
