#!/bin/bash

# Start backend
echo "Starting backend..."
cd backend
nodemon index.js & # Run backend in the background

# Start frontend
echo "Starting frontend..."
cd ../frontend
npm run dev