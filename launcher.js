const { spawn } = require('child_process');
const path = require('path');

// Launch Electron app detached from parent process
const child = spawn('npx', ['electron', '.'], {
  cwd: __dirname,
  detached: true,
  stdio: 'ignore',
  windowsHide: true
});

// Unref the child process so parent can exit
child.unref();

// Exit the launcher immediately
process.exit(0);