# Restaurant System

A microservices-based restaurant management system built with NestJS, MongoDB, and RabbitMQ.

## Table of Contents
- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Architecture

The system consists of three main microservices:

1. **Menu Service** (Port: 3001)
   - Manages menu items
   - Handles CRUD operations for food items
   - Provides menu item information to other services
   - Includes a seeder for populating sample menu items

2. **Order Service** (Port: 3002)
   - Manages customer orders
   - Integrates with Menu Service for item details
   - Handles order status updates
   - Publishes order events to RabbitMQ
   - Supports order status flow: Pending → Preparing → Ready → Completed

3. **Notification Service** (Port: 3003)
   - Handles email notifications
   - Subscribes to order events
   - Sends order confirmations and status updates
   - Logs email content for debugging

### System Flow
1. Customer places order through Order Service
2. Order Service validates items with Menu Service
3. Order Service publishes order event
4. Notification Service sends confirmation email
5. Staff updates order status
6. Notification Service sends status update emails

## Features

- **Menu Management**
  - Create, update, delete menu items
  - Set item availability
  - Categorize items
  - Bulk import/export

- **Order Processing**
  - Multi-item orders
  - Real-time status updates
  - Order history
  - Price calculation

- **Notifications**
  - Order confirmation emails
  - Status update notifications
  - Customizable templates
  - Email logging

## Prerequisites

- Docker and Docker Compose
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (for local development)
- RabbitMQ (for local development)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd restaurant-system
   ```

2. Install dependencies for each service:
   ```bash
   cd menu-service && npm install
   cd ../order-service && npm install
   cd ../notification-service && npm install
   ```

3. Create .env files for each service (templates provided in each service directory)

4. Start the services:
   ```bash
   docker-compose up -d
   ```

5. Seed the menu database:
   ```bash
   cd menu-service && npm run seed
   ```

## API Documentation

### Menu Service (http://localhost:3001)

#### Get All Menu Items
- **GET** `/menu`
- Response:
  ```json
  [
    {
      "id": "1234",
      "name": "Margherita Pizza",
      "description": "Classic Italian pizza with tomatoes and mozzarella",
      "price": 12.99,
      "isAvailable": true
    }
  ]
  ```

#### Create Menu Item
- **POST** `/menu`
- Request:
  ```json
  {
    "name": "Margherita Pizza",
    "description": "Classic Italian pizza with tomatoes and mozzarella",
    "price": 12.99,
    "isAvailable": true
  }
  ```

#### Update Menu Item
- **PUT** `/menu/:id`
- Request:
  ```json
  {
    "price": 13.99,
    "isAvailable": false
  }
  ```

### Order Service (http://localhost:3002)

#### Create Order
- **POST** `/orders`
- Request:
  ```json
  {
    "items": [
      {
        "menuId": "menu-item-id",
        "quantity": 2
      }
    ],
    "customerEmail": "customer@example.com"
  }
  ```

#### Update Order Status
- **PUT** `/orders/:id/status`
- Request:
  ```json
  {
    "status": "Preparing"
  }
  ```
- Valid Statuses: `Pending`, `Preparing`, `Ready`, `Completed`, `Cancelled`

## Environment Setup

### Menu Service (.env)
```
PORT=3001
MONGODB_URI=mongodb://mongodb:27017/restaurant
RABBITMQ_URL=amqp://rabbitmq:5672
RABBITMQ_QUEUE=menu_queue
```

### Order Service (.env)
```
PORT=3002
MONGODB_URI=mongodb://mongodb:27017/restaurant
RABBITMQ_URL=amqp://rabbitmq:5672
RABBITMQ_QUEUE=order_queue
```

### Notification Service (.env)
```
PORT=3003
MONGODB_URI=mongodb://mongodb:27017/restaurant
RABBITMQ_URL=amqp://rabbitmq:5672
RABBITMQ_QUEUE=notification_queue
EMAIL_FROM=restaurant@example.com
```

## Development

1. Start services in development mode:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. Run tests:
   ```bash
   # For each service
   npm run test
   ```

3. Development Best Practices:
   - Use TypeScript strict mode
   - Follow NestJS coding guidelines
   - Write unit tests for new features
   - Update API documentation
   - Use meaningful commit messages

## Production Deployment

1. Build Docker images:
   ```bash
   docker-compose build
   ```

2. Start services:
   ```bash
   docker-compose up -d
   ```

3. Production Considerations:
   - Use environment-specific .env files
   - Enable production logging
   - Configure proper email service
   - Set up monitoring
   - Use container orchestration (Kubernetes)

## Monitoring

- **RabbitMQ Management UI**: http://localhost:15672
  - Monitor queues and message flow
  - Check connection status
  - View error logs

- **Service Logs**:
  ```bash
  # View service logs
  docker-compose logs <service-name>
  
  # Follow logs in real-time
  docker-compose logs -f <service-name>
  
  # View last 100 lines
  docker-compose logs --tail=100 <service-name>
  ```

- **MongoDB Data**:
  - Access through MongoDB Compass
  - Monitor database performance
  - View collections and documents

## Troubleshooting

1. **Service Connection Issues**
   - Check if services are running: `docker-compose ps`
   - Verify MongoDB connection: `docker-compose logs mongodb`
   - Check RabbitMQ status: `docker-compose logs rabbitmq`
   - Ensure correct environment variables

2. **Order Creation Issues**
   - Verify menu items exist: `curl http://localhost:3001/menu`
   - Check order service logs: `docker-compose logs order-service`
   - Validate request payload format

3. **Notification Issues**
   - Check notification service logs: `docker-compose logs notification-service`
   - Verify RabbitMQ queues in Management UI
   - Check email configuration

## Security

1. **API Security**
   - Use HTTPS in production
   - Implement rate limiting
   - Add request validation
   - Sanitize inputs

2. **Database Security**
   - Use strong passwords
   - Enable authentication
   - Regular backups
   - Monitor access logs

3. **Container Security**
   - Use official base images
   - Regular security updates
   - Proper permission settings
   - Resource limitations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Commit Guidelines
- Use meaningful commit messages
- Reference issue numbers
- Keep changes focused
- Add tests for new features

## License

This project is licensed under the MIT License. 