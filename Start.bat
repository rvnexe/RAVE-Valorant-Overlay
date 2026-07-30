@echo off
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed! Download it from: https://nodejs.org/en/download/current
    pause
    exit /b 1
)
node server.js
pause