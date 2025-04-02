require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Smartphone", price: 800 }
]; // Static product data

// Add Product
app.post("/productsdata", (req, res) => {
    const newProduct = { id: products.length + 1, ...req.body };
    products.push(newProduct);
    res.json({ message: "Product added", product: newProduct });
});

// Get Products
app.get("/productsdetails", (req, res) => {
    res.json(products);
});

app.listen(4002, () => console.log("Product Service running on port 4002"));
