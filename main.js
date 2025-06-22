const { app, BrowserWindow, shell, session } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('dns-over-https-mode', 'secure');
app.commandLine.appendSwitch('dns-over-https-servers', 'https://cloudflare-dns.com/dns-query');

// Hide Electron from user agent and window title
app.commandLine.appendSwitch('disable-features', 'ElectronVersionDetection');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "YouTube",
    icon: path.join(__dirname, 'youtube.ico'),
    show: false, // Don't show until ready
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      // Make it appear more like a regular browser
      webSecurity: true,
      allowRunningInsecureContent: false
    },
    // Remove Electron branding
    titleBarStyle: 'default',
    // Optional: Remove menu bar for more app-like experience
    autoHideMenuBar: true
  });

  // Set custom user agent to hide Electron
  const userAgent = mainWindow.webContents.getUserAgent().replace(/Electron\/[^\s]+\s/, '');
  mainWindow.webContents.setUserAgent(userAgent);

  // Handle external links and authentication
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Handle Google authentication
    if (url.includes("accounts.google.com") || 
        url.includes("accounts.youtube.com") ||
        url.includes("myaccount.google.com")) {
      
      // Create a new window for authentication
      const authWindow = new BrowserWindow({
        width: 500,
        height: 600,
        parent: mainWindow,
        modal: true,
        show: false,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          webSecurity: true
        }
      });

      authWindow.loadURL(url);
      authWindow.show();

      // Handle the redirect back to YouTube
      authWindow.webContents.on('will-redirect', (event, redirectUrl) => {
        if (redirectUrl.includes('youtube.com')) {
          // Close auth window and reload main window
          authWindow.close();
          mainWindow.reload();
        }
      });

      // Handle when auth window navigates to YouTube
      authWindow.webContents.on('did-navigate', (event, navUrl) => {
        if (navUrl.includes('youtube.com')) {
          authWindow.close();
          mainWindow.reload();
        }
      });

      // Clean up when auth window is closed
      authWindow.on('closed', () => {
        // Optional: You can add logic here if needed
      });

      return { action: 'deny' };
    }
    
    // Open other external links in default browser
    if (!url.includes('youtube.com') && !url.includes('googlevideo.com')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    
    return { action: 'allow' };
  });

  // Handle navigation within the main window
  mainWindow.webContents.on('will-navigate', (event, url) => {
    // Allow navigation within YouTube and Google domains
    if (!url.includes('youtube.com') && 
        !url.includes('googlevideo.com') && 
        !url.includes('accounts.google.com') &&
        !url.includes('gstatic.com') &&
        !url.includes('googleusercontent.com')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Load YouTube
  mainWindow.loadURL("https://www.youtube.com");
}

// Set app name (removes Electron branding)
app.setName('YouTube');

app.whenReady().then(() => {
  // Set up session for better YouTube compatibility
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    // Remove Electron from headers
    if (details.requestHeaders['User-Agent']) {
      details.requestHeaders['User-Agent'] = details.requestHeaders['User-Agent'].replace(/Electron\/[^\s]+\s/, '');
    }
    callback({ requestHeaders: details.requestHeaders });
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});