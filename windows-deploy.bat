@echo off
echo 🚀 Starting Windows deployment to Vercel...

echo 📦 Installing dependencies...
npm install

echo 🔧 Generating Prisma client...
npx prisma generate

echo 🗄️ Setting up database schema...
npx prisma db push

echo 🌐 Deploying to Vercel...
vercel --prod

echo ✅ Deployment complete!
echo 🌍 Check your deployment at: https://vercel.com/dashboard

pause
