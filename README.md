# 📦 Microservices Node.js Project

This project is a Node.js microservices architecture built with Kafka and Docker. It includes:

## 🧩 Services

| Folder          | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `apigw`         | API Gateway that routes requests to the appropriate services                |
| `productservice`| Handles product-related operations                                           |
| `userservice`   | Manages user-related operations                                              |
| `kafkaservice`  | Kafka service that produces and/or consumes messages via Apache Kafka       |

---

## 🛠 Tech Stack

- **Node.js** (Express.js)
- **KafkaJS** (Kafka client for Node.js)
- **Docker & Docker Compose**
- **Confluent Kafka & Zookeeper**

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/shubhambaghel34/microservices_node
cd microservices-node
```

### 2. Project Structure

```
.
├── apigw/              # API Gateway
├── productservice/     # Product service
├── userservice/        # User service
├── kafkaservice/       # Kafka producer/consumer service
├── docker-compose.yml  # Multi-service orchestrator
└── README.md
```

---

## 🐳 Run with Docker

Make sure Docker is installed and running.

### 1. Build and Start all services

```bash
docker-compose up --build
```

This will start:
- API Gateway on `http://localhost:4000`
- Product Service on `http://localhost:4001`
- User Service on `http://localhost:4002`
- Kafka Service (background)
- Kafka broker on `kafka:9092` (internal)
- Zookeeper on `zookeeper:2181` (internal)


---

## 📬 Testing APIs (with Postman)

### Sample Requests

#### Create a Product
```
POST http://localhost:4000/products
Body: { "name": "iPhone", "price": 999 }
```

#### Register a User
```
POST http://localhost:4000/users/register
Body: { "username": "john_doe" }
```

Kafka events may be triggered internally by these endpoints depending on how you've wired Kafka producers/consumers.

---

## ⚙️ Environment Variables

Each service can be configured using `.env` or Docker environment variables. Examples:

### For `kafkaservice`:
```env
KAFKA_BROKER=kafka:9092
```

### For `apigw`:
```env
PRODUCT_SERVICE_URL=http://productservice:4001
USER_SERVICE_URL=http://userservice:4002
```

---

## 🧪 Development without Docker

> Make sure Kafka and Zookeeper are installed and running locally.

You can run any service locally using:

```bash
cd apigw
npm install
npm start
```

Repeat for other services to run it.

---

## 📜 License

MIT © Shubhamsinha Baghel 
