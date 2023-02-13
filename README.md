# REAL-TIME CHAT APPLICATION
- Implemented with kafka and Websocket

## ABOUT
- Allows real-time chat with support of websocket.
- Uses Kafka as message brokers for fault-tolerant and the ease of scaling.
- Frontend: chat-frontend.
- Backend: distributed-chat-app.

## HOW TO RUN
- Download Apache Kafka https://kafka.apache.org/downloads
- Create 2 copies of config/server.properties
- Create 3 directory for 3 kafka brokers.
- In the config file, change each of 3 kafka's listener port to 9092, 9093 and 9094.
- Change broker.id accordingly (0, 1, 2).
- Start Zookeeper server in kafka directory.
- Start 3 Kafka brokers point to 3 config files.
- Create chat Kafka topic: set bootstrap server to 9092, replication factor 1 and partition 0.
- In the distributed-chat-app directory: mvn spring-boot:run
- In the chat-frontend directory: npm start