require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.ts");
const app = express();

app.use(express.json());

const userDB = process.env.USER; // Estos valores vienen del fichero ".env" que por defecto oculta git (acá debes poner tus datos de Closter de MongoDB)
const passwordDB = process.env.PASSWORD; // Estos valores vienen del fichero ".env" que por defecto oculta git (acá debes poner tus datos de Closter de MongoDB)

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

// GETS
app.get("/", (req, res) => {
  res.send("Hello from Node API Test");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POSTS
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUTS
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETES
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: `${product.name} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
