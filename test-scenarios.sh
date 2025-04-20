#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Function to print section headers
print_header() {
    echo -e "\n${GREEN}=== $1 ===${NC}\n"
}

# Function to make API calls
call_api() {
    local method=$1
    local url=$2
    local data=$3
    
    if [ -z "$data" ]; then
        response=$(curl -s -X $method $url)
    else
        response=$(curl -s -X $method $url -H "Content-Type: application/json" -d "$data")
    fi
    
    echo $response
}

# Function to extract ID from response
extract_id() {
    echo $1 | grep -o '"id":"[^"]*' | cut -d'"' -f4
}

# Function to check if a command succeeded
check_result() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Success${NC}"
    else
        echo -e "${RED}✗ Failed${NC}"
        exit 1
    fi
}

# Wait for services to be ready
print_header "Waiting for services to be ready"
sleep 10

# Scenario 1: Menu Management
print_header "Scenario 1: Menu Management"

# Create menu item
echo "Creating menu item..."
menu_response=$(call_api "POST" "http://localhost:3001/menu" '{
    "name": "Margherita Pizza",
    "description": "Classic Italian pizza with tomatoes and mozzarella",
    "price": 12.99,
    "isAvailable": true
}')
menu_id=$(extract_id "$menu_response")
check_result

# Get all menu items
echo "Getting all menu items..."
call_api "GET" "http://localhost:3001/menu"
check_result

# Update menu item
echo "Updating menu item..."
call_api "PUT" "http://localhost:3001/menu/$menu_id" '{
    "price": 13.99,
    "isAvailable": false
}'
check_result

# Scenario 2: Order Management
print_header "Scenario 2: Order Management"

# Create order
echo "Creating order..."
order_response=$(call_api "POST" "http://localhost:3002/orders" '{
    "customerEmail": "test@example.com",
    "items": [
        {
            "menuId": "'$menu_id'",
            "quantity": 2
        }
    ]
}')
order_id=$(extract_id "$order_response")
check_result

# Get order status
echo "Getting order status..."
call_api "GET" "http://localhost:3002/orders/$order_id"
check_result

# Update order status
echo "Updating order status..."
call_api "PUT" "http://localhost:3002/orders/$order_id/status" '{
    "status": "PREPARING"
}'
check_result

# Scenario 3: Notification Testing
print_header "Scenario 3: Notification Testing"

# Test email notification
echo "Testing email notification..."
call_api "POST" "http://localhost:3003/notifications/test" '{
    "email": "test@example.com",
    "subject": "Test Notification",
    "message": "This is a test notification"
}'
check_result

# Scenario 4: Error Handling
print_header "Scenario 4: Error Handling"

# Try to create menu item with invalid data
echo "Testing invalid menu item creation..."
call_api "POST" "http://localhost:3001/menu" '{
    "name": "",
    "price": -10
}'
check_result

# Try to update non-existent order
echo "Testing update of non-existent order..."
call_api "PUT" "http://localhost:3002/orders/nonexistent/status" '{
    "status": "PREPARING"
}'
check_result

# Try to send notification to invalid email
echo "Testing notification with invalid email..."
call_api "POST" "http://localhost:3003/notifications/test" '{
    "email": "invalid-email",
    "subject": "Test",
    "message": "Test"
}'
check_result

print_header "All test scenarios completed!" 