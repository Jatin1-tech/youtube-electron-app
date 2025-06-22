// Preload file — can be extended for future use
const { contextBridge, ipcRenderer } = require('electron');

// Preload script to enhance YouTube experience
window.addEventListener('DOMContentLoaded', () => {
  // Remove any Electron-specific elements or modify page behavior
  
  // Hide/modify elements that might show this is Electron
  const style = document.createElement('style');
  style.textContent = `
    /* Optional: Add custom styles for better app experience */
    body {
      -webkit-app-region: no-drag;
    }
  `;
  document.head.appendChild(style);

  // Optional: Add keyboard shortcuts or other app-specific functionality
  document.addEventListener('keydown', (event) => {
    // Example: Ctrl+R to reload (like F5)
    if (event.ctrlKey && event.key === 'r') {
      location.reload();
    }
  });
});

// Expose safe APIs to renderer if needed
contextBridge.exposeInMainWorld('electronAPI', {
  // Add any safe APIs you want to expose to the renderer process
  platform: process.platform,
  // Example: Custom functions for YouTube integration
});