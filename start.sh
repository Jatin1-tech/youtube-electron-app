#!/bin/bash

# Go to script directory
cd "$(dirname "$0")" || exit 1

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run Electron app (no extra terminal window issue on Linux)
npx electron . >/dev/null 2>&1 &
disown


