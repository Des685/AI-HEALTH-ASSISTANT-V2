Write-Host "🚀 Setting up database..." -ForegroundColor Green

Write-Host "📦 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

Write-Host "🗄️ Pushing database schema..." -ForegroundColor Yellow
npx prisma db push

Write-Host "✅ Database setup complete!" -ForegroundColor Green
