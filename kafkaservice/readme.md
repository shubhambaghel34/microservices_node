**docker run -d --name zookeeper -p 2181:2181 zookeeper
docker run -d --name kafka -p 9092:9092 \
  --link zookeeper \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka


+-------------+      +----------------+      +-----------------+
|  Producer   | ---> |    Kafka       | ---> |    Consumer     |
|  (UserSvc)  |      |  Broker (9092) |      |  (ProductSvc)     |
+-------------+      |   user-events  |      +-----------------+
                     |   └─ partition0|
                     |   └─ partition1|
                     +----------------+



***Term	Description***

1.Producer-	App that sends (publishes) messages to Kafka.
2.Consumer - App that receives (consumes) messages from Kafka.
3.Broker	- A Kafka server that stores messages and handles requests.
4.Topic	A - logical channel/category (like an inbox) where messages are stored.
5.Partition -	Topics are split into partitions for scalability.
6.Offset-	Each message in a partition has a unique position (ID).
7.Consumer Group -	A group of consumers sharing the load of reading from a topic.**# ⚙️ Kafka Setup & Architecture

This section explains how to run Kafka locally using Docker and how Kafka architecture works with producers and consumers.

---

## 🐳 Running Kafka with Docker

### Step 1: Run Zookeeper

```bash
docker run -d --name zookeeper -p 2181:2181 zookeeper
```

### Step 2: Run Kafka

```bash
docker run -d --name kafka -p 9092:9092 \
  --link zookeeper \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka
```

> ✅ Now Kafka is accessible at `localhost:9092`

---

## 🧠 Kafka Architecture Overview

```
+-------------+      +----------------+      +-----------------+
|  Producer   | ---> |    Kafka       | ---> |    Consumer     |
|  (UserSvc)  |      |  Broker (9092) |      |  (ProductSvc)     |
+-------------+      |   user-events  |      +-----------------+
                     |   └─ partition0|
                     |   └─ partition1|
                     +----------------+
```

---

## 📖 Kafka Terminology

| Term             | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Producer**     | App that sends (publishes) messages to Kafka. (e.g., `UserService`)         |
| **Consumer**     | App that receives (consumes) messages from Kafka. (e.g., `EmailService`)    |
| **Broker**       | A Kafka server that stores messages and handles requests. (`localhost:9092`)|
| **Topic**        | A logical channel/category (like an inbox) where messages are stored.       |
| **Partition**    | Topics are split into partitions for scalability and parallelism.           |
| **Offset**       | Each message in a partition has a unique position (like a message ID).      |
| **Consumer Group** | A group of consumers sharing the load of reading from a topic.           |

---

Now Kafka is ready to use with your microservices (`kafkaservice`, `userservice`, etc.)!
