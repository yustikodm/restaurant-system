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
git clone https://github.com/yourusername/restaurant-system.git
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

## API Documentation

### Menu Service
- `GET /menu` - Get all menu items
- `POST /menu` - Create a new menu item
- `GET /menu/:id` - Get a specific menu item
- `PUT /menu/:id` - Update a menu item
- `DELETE /menu/:id` - Delete a menu item

### Order Service
- `POST /orders` - Create a new order
- `GET /orders/:id` - Get order details
- `PUT /orders/:id/status` - Update order status

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