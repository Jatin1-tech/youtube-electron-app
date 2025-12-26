# YouTube Desktop App 🎬

A cross-platform desktop YouTube client built with Electron.js, designed to bypass DNS-level restrictions while delivering a native application experience.

![YouTube Desktop App](https://img.shields.io/badge/Electron-28.2.2-blue?logo=electron)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux%20%7C%20macOS-lightgrey)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Building from Source](#building-from-source)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

YouTube Desktop App provides a standalone desktop experience for YouTube, addressing common limitations of browser-based access. Originally developed to work around DNS filtering restrictions while maintaining privacy controls, this application offers seamless YouTube access with a native feel across Windows, Linux, and macOS platforms.

### Why This Exists

Many users implement DNS-level filtering (CleanBrowsing, Pi-hole, NextDNS) for privacy and content control. However, these solutions can inadvertently block YouTube access in browsers. This application solves that problem by:

- Bypassing DNS restrictions using DNS-over-HTTPS (DoH)
- Providing a dedicated YouTube environment separate from browser settings
- Delivering a native desktop application experience
- Eliminating the need for browser extensions or workarounds

## ✨ Features

- 🚀 **Cross-Platform Support**: Native experience on Windows, Linux, and macOS
- 🔒 **Secure Authentication**: Leverages system browser for Google login
- 🛡️ **DNS Bypass**: Utilizes Cloudflare DNS-over-HTTPS to circumvent restrictions
- 🎨 **Native Interface**: Custom window controls and application-like behavior
- 🤫 **Silent Execution**: Multiple launcher options with no console windows
- ⚡ **Performance Optimized**: Direct YouTube access without browser overhead
- 🖼️ **Custom Branding**: Includes application icon and removes Electron branding
- 📱 **Responsive Design**: Optimized viewing experience for desktop environments

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/jatin1-tech/youtube-desktop-app.git
   cd youtube-desktop-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

## 💻 Usage

### Windows

**Option 1: Batch Script (Recommended)**
```bash
# Double-click start.bat for silent startup
start.bat
```

**Option 2: VBScript Launcher (Completely Invisible)**
```bash
# Double-click YouTube.vbs - no console window
YouTube.vbs
```

### Linux / macOS

**Shell Script**
```bash
# Make executable (first time only)
chmod +x start.sh

# Run the application
./start.sh
```

### Development Mode

For debugging and development:
```bash
npm run dev
```

## 🏗️ Building from Source

### Create Distributable Packages

**Windows Installer**
```bash
npm run build-win
```

**Current Platform**
```bash
npm run build
```

**All Platforms**
```bash
npm run build-all
```

Built applications will be available in the `dist/` directory.

## 📂 Project Structure

```
youtube-desktop-app/
├── main.js              # Main Electron process
├── launcher.js          # Silent launcher script
├── preload.js           # Preload script for renderer
├── package.json         # Project configuration and dependencies
├── start.bat            # Windows batch launcher
├── start.sh             # Linux/macOS shell launcher
├── YouTube.vbs          # VBScript silent launcher
├── youtube.png          # Application icon
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## 🔧 Configuration

### DNS Over HTTPS Settings

Modify DNS servers in `main.js`:

```javascript
app.commandLine.appendSwitch(
  'dns-over-https-servers', 
  'https://cloudflare-dns.com/dns-query'
);
```

**Alternative DNS Providers:**
- Cloudflare: `https://cloudflare-dns.com/dns-query`
- Google: `https://dns.google/dns-query`
- Quad9: `https://dns.quad9.net/dns-query`

### Window Customization

Adjust application window settings in `main.js`:

```javascript
const mainWindow = new BrowserWindow({
  width: 1200,              // Window width
  height: 800,              // Window height
  title: "YouTube",         // Application title
  icon: path.join(__dirname, 'youtube.png'),  // App icon
  // ... additional options
});
```

### Application Icon

Replace `youtube.png` with your custom icon. Supported formats: PNG, JPEG, ICO

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### Application Won't Launch Silently
- **Windows**: Use `YouTube.vbs` for completely invisible startup
- **Linux/macOS**: Ensure `start.sh` has execute permissions (`chmod +x start.sh`)
- Verify Node.js is properly installed and accessible in system PATH

#### Authentication Problems
- Clear browser cache and cookies
- Complete Google authentication in your default browser first
- Check firewall settings for potential blocking

#### DNS Blocking Persists
- Verify your DNS provider doesn't block DoH requests
- Try alternative DNS servers (see Configuration section)
- Check network-level firewalls or proxy settings

#### Icon Not Displaying
- Ensure `youtube.png` exists in the project root directory
- Rebuild the application after adding/changing the icon
- For Windows, convert icon to .ico format for better compatibility

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate documentation.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is provided for educational and personal use. Users are responsible for complying with YouTube's Terms of Service and their organization's acceptable use policies. The developers assume no liability for misuse or policy violations.

## 🙏 Acknowledgments

- [Electron.js](https://www.electronjs.org/) - Application framework
- [Cloudflare](https://cloudflare.com/) - DNS-over-HTTPS infrastructure
- [YouTube](https://youtube.com/) - Content platform
- Open source community for continued support and feedback

## 👨‍💻 Author

**Jatin Sharma**

[![GitHub](https://img.shields.io/badge/GitHub-jatin1--tech-181717?logo=github)](https://github.com/jatin1-tech)

---

<div align="center">

**If you find this project useful, please consider giving it a ⭐**

Made with ❤️ for unrestricted YouTube access

</div>
