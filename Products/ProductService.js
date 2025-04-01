const express = require("express");

const app = express();
app.use(express.json());

const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Smartphone", price: 800 }
]; // Static product data

// Add Product
app.post("/products", (req, res) => {
    const newProduct = { id: products.length + 1, ...req.body };
    products.push(newProduct);
    res.json({ message: "Product added", product: newProduct });
});

// Get Products
app.get("/products", (req, res) => {
    res.json(products);
});

//Get products by Id
app.get("/products/:id", (req, res) => {
    const product= products.find(u=>u.id === parseInt(req.params.id));
    if(!product) return res.status(404).send('product does not exist with provided id');
    res.json(products);
});

app.listen(4002, () => console.log("Product Service running on port 4002"));
