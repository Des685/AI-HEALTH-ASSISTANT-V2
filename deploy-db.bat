@echo off
echo Setting up database...

echo Generating Prisma client...
npx prisma generate

echo Pushing database schema...
npx prisma db push

echo Database setup complete!
pause
