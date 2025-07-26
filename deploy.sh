#!/bin/bash

echo "🚀 Starting Vercel deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Login check
echo "Checking Vercel authentication..."
vercel whoami || vercel login

# Deploy to production
echo "Deploying to production..."
vercel --prod

# Check deployment status
echo "✅ Deployment complete!"
echo "🌐 Your app is live at:"
vercel ls | head -2 | tail -1

echo "🔧 Don't forget to:"
echo "1. Set up environment variables: vercel env add"
echo "2. Configure your database"
echo "3. Test all functionality"
