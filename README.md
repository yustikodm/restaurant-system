# Restaurant Order Management System

A microservices-based restaurant order management system built with Node.js, TypeScript, and RabbitMQ.

## Overview

This system consists of three microservices:
- **Menu Service**: Manages restaurant menu items
- **Order Service**: Handles order processing and management
- **Notification Service**: Sends notifications for order status updates

## Features

- Create and manage menu items
- Place and track orders
- Real-time order status updates
- Email notifications for order status changes
- RESTful API endpoints
- Message queue-based communication between services

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Docker and Docker Compose
- RabbitMQ

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yustikodm/restaurant-system.git
cd restaurant-system
```

2. Install dependencies for each service:
```bash
cd menu-service && npm install
cd ../order-service && npm install
cd ../notification-service && npm install
```

3. Create `.env` files in each service directory based on the provided `.env.example` files.

4. Start the services using Docker Compose:
```bash
docker-compose up -d
```

## Deployment Guide

### Local Deployment

1. **Environment Setup**
   - Ensure all prerequisites are installed
   - Configure environment variables in `.env` files
   - Set up MongoDB and RabbitMQ

2. **Service Deployment**
   ```bash
   # Build and start all services
   docker-compose up -d --build

   # Verify services are running
   docker-compose ps
   ```

3. **Health Checks**
   - Menu Service: http://localhost:3001/health
   - Order Service: http://localhost:3002/health
   - Notification Service: http://localhost:3003/health
   - RabbitMQ Management: http://localhost:15672
   - MongoDB: mongodb://localhost:27017

### Production Deployment

1. **Infrastructure Requirements**
   - Kubernetes cluster or cloud provider (AWS, GCP, Azure)
   - Load balancer
   - Managed MongoDB service
   - Managed RabbitMQ service
   - SSL certificates

2. **Deployment Steps**
   ```bash
   # Build production images
   docker-compose -f docker-compose.prod.yml build

   # Push images to container registry
   docker-compose -f docker-compose.prod.yml push

   # Deploy to Kubernetes
   kubectl apply -f k8s/
   ```

3. **Scaling**
   ```bash
   # Scale services
   kubectl scale deployment menu-service --replicas=3
   kubectl scale deployment order-service --replicas=3
   kubectl scale deployment notification-service --replicas=2
   ```

## Feature Testing Guide

### 1. Menu Management

#### Create Menu Item
```bash
curl -X POST http://localhost:3001/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Margherita Pizza",
    "description": "Classic Italian pizza with tomatoes and mozzarella",
    "price": 12.99,
    "isAvailable": true
  }'
```

#### Get All Menu Items
```bash
curl http://localhost:3001/menu
```

#### Update Menu Item
```bash
curl -X PUT http://localhost:3001/menu/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "price": 13.99,
    "isAvailable": false
  }'
```

### 2. Order Management

#### Create Order
```bash
curl -X POST http://localhost:3002/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerEmail": "customer@example.com",
    "items": [
      {
        "menuId": "{menu_id}",
        "quantity": 2
      }
    ]
  }'
```

#### Get Order Status
```bash
curl http://localhost:3002/orders/{order_id}
```

#### Update Order Status
```bash
curl -X PUT http://localhost:3002/orders/{order_id}/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "PREPARING"
  }'
```

### 3. Notification Testing

#### Test Email Notification
```bash
curl -X POST http://localhost:3003/notifications/test \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "subject": "Test Notification",
    "message": "This is a test notification"
  }'
```

## Testing Scenarios

### Scenario 1: Complete Order Flow
1. Create a menu item
2. Place an order with the menu item
3. Update order status to PREPARING
4. Update order status to READY
5. Verify email notifications at each status change

### Scenario 2: Menu Availability
1. Create multiple menu items
2. Set some items as unavailable
3. Try to order unavailable items (should fail)
4. Update item availability
5. Verify order succeeds after item becomes available

### Scenario 3: Order Modifications
1. Place an order
2. Update order status to PREPARING
3. Try to modify order (should fail)
4. Cancel order
5. Verify cancellation notification

### Scenario 4: High Load Testing
1. Create multiple menu items
2. Place multiple orders simultaneously
3. Update order statuses in parallel
4. Verify all notifications are sent
5. Check system performance

### Scenario 5: Error Handling
1. Try to create menu item with invalid data
2. Place order with non-existent menu items
3. Update non-existent order
4. Send notification to invalid email
5. Verify appropriate error responses

## API Documentation

### Menu Service (Port 3001)
- `GET /menu` - Get all menu items
- `POST /menu` - Create a new menu item
- `GET /menu/:id` - Get a specific menu item
- `PUT /menu/:id` - Update a menu item
- `DELETE /menu/:id` - Delete a menu item

### Order Service (Port 3002)
- `POST /orders` - Create a new order
- `GET /orders/:id` - Get order details
- `PUT /orders/:id/status` - Update order status

### Notification Service (Port 3003)
- `POST /notifications` - Send a notification
- `POST /notifications/test` - Test email notification

## Development

To run the services in development mode:

```bash
# Menu Service
cd menu-service
npm run dev

# Order Service
cd order-service
npm run dev

# Notification Service
cd notification-service
npm run dev
```

## Testing

Run tests for each service:

```bash
# Menu Service
cd menu-service
npm test

# Order Service
cd order-service
npm test

# Notification Service
cd notification-service
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Node.js
- TypeScript
- RabbitMQ
- Express.js
- Docker 