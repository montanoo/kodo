#!/bin/sh
echo "Running migrations..."
npx prisma migrate deploy
echo "Seeding database..."
npm run seed
echo "Starting server..."
npm run dev