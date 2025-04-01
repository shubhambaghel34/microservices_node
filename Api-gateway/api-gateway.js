require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());
app.use(require("cors")());

const USER_SERVICE_URL = "http://localhost:4001";
const PRODUCT_SERVICE_URL = "http://localhost:4002";
const { createProxyMiddleware } = require("http-proxy-middleware");

// Proxy configuration
app.use("/users", createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true }));
app.use("/products", createProxyMiddleware({ target: "http://localhost:4002", changeOrigin: true }));

app.listen(4000, () => console.log("🚀 API Gateway running on port 4000"));

