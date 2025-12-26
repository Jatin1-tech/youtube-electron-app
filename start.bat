@echo off
cd /d "%~dp0"

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Create and run VBScript to launch without console window
echo Set WshShell = CreateObject("WScript.Shell") > "%temp%\youtube_launcher.vbs"
echo WshShell.Run "cmd /c cd /d ""%~dp0"" && npx electron .", 0, False >> "%temp%\youtube_launcher.vbs"
cscript //nologo "%temp%\youtube_launcher.vbs"
del "%temp%\youtube_launcher.vbs"
