#!/bin/bash

# Run npm install and dev for the client
cd client/
npm install
npm run dev &

# Run npm install and dev for the server
cd ../server/
npm install
npm run dev &

