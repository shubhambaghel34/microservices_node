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

require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(require("cors")());

// Proxy requests to User Service
app.use("/users", (req, res) => {
    axios({
        method: req.method,
        url: `http://localhost:4001${req.url}`,
        headers: req.headers,
        data: req.body,
    })
    .then(response => res.json(response.data))
    .catch(err => res.status(err.response?.status || 500).json(err.response?.data));
});

// Proxy requests to Product Service
app.use("/products", (req, res) => {
    axios({
        method: req.method,
        url: `http://localhost:4002${req.url}`,
        headers: req.headers,
        data: req.body,
    })
    .then(response => res.json(response.data))
    .catch(err => res.status(err.response?.status || 500).json(err.response?.data));
});

app.listen(4000, () => console.log("API Gateway running on port 4000"));

