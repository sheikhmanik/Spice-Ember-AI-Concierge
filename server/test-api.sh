#!/bin/bash

echo "Starting server..."
cd /Users/md.manikullah/Ai\ Products/Restaurant/server
npm run dev > /tmp/server.log 2>&1 &
SERVER_PID=$!

sleep 6

echo "Testing API endpoint..."
curl -s http://localhost:4000/api/menu | head -c 500
echo ""

echo "--- Server log ---"
cat /tmp/server.log

kill $SERVER_PID 2>/dev/null || true
pkill -f "ts-node-dev" 2>/dev/null || true

echo "Done."