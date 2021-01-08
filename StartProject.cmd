cd codeExecService
echo "Compile and run main"
tsc main.ts && pm2 start main.js --name execService
cd ..
npm run serve