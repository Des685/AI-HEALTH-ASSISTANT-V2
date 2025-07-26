#!/bin/bash

echo "🔐 Setting up JWT_SECRET for Vercel deployment..."

# Generate secure JWT secret
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")

echo "Generated JWT_SECRET: $JWT_SECRET"
echo ""
echo "Now run these commands:"
echo "vercel env add JWT_SECRET"
echo "# Paste this value: $JWT_SECRET"
echo ""
echo "vercel env add NODE_ENV"
echo "# Enter: production"
echo ""
echo "Then redeploy: vercel --prod"
