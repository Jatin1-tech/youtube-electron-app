@echo off
echo Creating YouTube launcher executable...

REM Create PowerShell script to compile C# code
echo Add-Type -TypeDefinition @" > compile_launcher.ps1
echo using System; >> compile_launcher.ps1
echo using System.Diagnostics; >> compile_launcher.ps1
echo using System.IO; >> compile_launcher.ps1
echo. >> compile_launcher.ps1
echo public class YouTubeLauncher >> compile_launcher.ps1
echo { >> compile_launcher.ps1
echo     public static void Main() >> compile_launcher.ps1
echo     { >> compile_launcher.ps1
echo         string currentDir = Directory.GetCurrentDirectory(); >> compile_launcher.ps1
echo         ProcessStartInfo psi = new ProcessStartInfo(); >> compile_launcher.ps1
echo         psi.FileName = "node"; >> compile_launcher.ps1
echo         psi.Arguments = "launcher.js"; >> compile_launcher.ps1
echo         psi.WorkingDirectory = currentDir; >> compile_launcher.ps1
echo         psi.WindowStyle = ProcessWindowStyle.Hidden; >> compile_launcher.ps1
echo         psi.CreateNoWindow = true; >> compile_launcher.ps1
echo         Process.Start(psi); >> compile_launcher.ps1
echo     } >> compile_launcher.ps1
echo } >> compile_launcher.ps1
echo "@ -OutputAssembly "YouTube.exe" -OutputType ConsoleApplication >> compile_launcher.ps1
echo [YouTubeLauncher]::Main() >> compile_launcher.ps1

powershell -ExecutionPolicy Bypass -File compile_launcher.ps1
del compile_launcher.ps1

echo YouTube.exe created! Double-click it to run YouTube without any console window.
pause