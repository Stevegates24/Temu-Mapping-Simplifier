╔══════════════════════════════════════════════════════════════╗
║          MapFlow – Temu Mapping Tool · PWA Setup             ║
╚══════════════════════════════════════════════════════════════╝

FILES IN THIS PACKAGE:
  index.html       ← Main app (open this)
  sw.js            ← Service Worker (required for install)
  manifest.json    ← App manifest (icons, name, theme)
  icon-192.png     ← App icon (192×192)
  icon-512.png     ← App icon (512×512)

──────────────────────────────────────────────────────────────
  HOW TO INSTALL AS A STANDALONE APP (like Spotify/YouTube)
──────────────────────────────────────────────────────────────

⚠️  IMPORTANT: Browser security requires PWAs to be served
    over HTTP/HTTPS — NOT from a local file path (file://).
    Double-clicking index.html will NOT show the install button.

OPTION 1 — Python local server (easiest, no install needed):
  1. Open Terminal / Command Prompt
  2. cd into the folder containing these files
  3. Run:
       Python 3:  python -m http.server 8080
       Python 2:  python -m SimpleHTTPServer 8080
  4. Open Chrome/Edge and go to:  http://localhost:8080
  5. The 📲 install button will appear in the header
     OR look for the install icon (⊕) in the address bar

OPTION 2 — VS Code Live Server:
  1. Install the "Live Server" extension in VS Code
  2. Right-click index.html → "Open with Live Server"
  3. Chrome opens automatically at http://127.0.0.1:5500
  4. Install prompt will appear

OPTION 3 — Upload to any web host:
  Upload all files to any web server (GitHub Pages, Netlify,
  any hosting). Open the URL in Chrome/Edge → install appears.

──────────────────────────────────────────────────────────────
  AFTER INSTALLING:
──────────────────────────────────────────────────────────────
  • MapFlow appears in your Start Menu / Applications
  • Opens in its own window (no browser UI/tabs)
  • Works offline for previously loaded data
  • Window title bar shows in Temu orange (#FF6200)

──────────────────────────────────────────────────────────────
  SUPPORTED BROWSERS:
──────────────────────────────────────────────────────────────
  ✓ Google Chrome  (recommended)
  ✓ Microsoft Edge (full support)
  ✗ Firefox        (no PWA install support — use Chrome/Edge)
  ✗ Safari/iOS     (limited support)

──────────────────────────────────────────────────────────────
