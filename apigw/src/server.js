// require("dotenv").config();
// const express = require("express");

// const app = express();
// app.use(express.json());
// app.use(require("cors")());

// const USER_SERVICE_URL = "http://localhost:4001";
// const PRODUCT_SERVICE_URL = "http://localhost:4002";
// const { createProxyMiddleware } = require("http-proxy-middleware");

// // Proxy configuration
// app.use("/users", createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true }));
// app.use("/products", createProxyMiddleware({ target: "http://localhost:4002", changeOrigin: true }));

// app.listen(4000, () => console.log("🚀 API Gateway running on port 4000"));


const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:4001";
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:4002";

// Route to User Service
app.post("/users/register", async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/register`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Route to Product Service
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/products`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Start API Gateway
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
