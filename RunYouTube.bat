@echo off
if "%1" == "hide" goto :run
cmd /v:on /c "%0 hide & exit" <nul >nul 2>&1 & exit /b
:run
cd /d "%~dp0"
if not exist "node_modules" npm install >nul 2>&1
node launcher.js