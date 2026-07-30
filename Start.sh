#!/bin/bash
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed! Download it from: https://nodejs.org/en/download/current"
    exit 1
fi
node server.js