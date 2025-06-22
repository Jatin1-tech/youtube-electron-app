Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Get the directory where this script is located
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Check if node_modules exists, if not install dependencies
If Not fso.FolderExists(scriptDir & "\node_modules") Then
    WshShell.Run "cmd /c cd /d """ & scriptDir & """ && npm install", 0, True
End If

' Change to the script directory and run the launcher
WshShell.Run "cmd /c cd /d """ & scriptDir & """ && node launcher.js", 0, False