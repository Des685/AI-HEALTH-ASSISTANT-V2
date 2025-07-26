#!/bin/bash

# Generate Prisma client
npx prisma generate

# Push database schema to production
npx prisma db push

# Optional: Seed database
# npx prisma db seed
