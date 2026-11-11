#!/bin/bash

# Medical Center React Project Setup Script

echo "====================================="
echo "Medical Center React Setup"
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install it first."
    exit 1
fi

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file..."
    cp .env.example .env
    echo "Please update the .env file with your email configuration"
fi

echo ""
echo "====================================="
echo "Setup Complete!"
echo "====================================="
echo ""
echo "To run the development server:"
echo "  npm run dev"
echo ""
echo "To run the backend server (in a separate terminal):"
echo "  npm run server"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
