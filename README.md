# Navrai Beauty Salon — Redesigned Website

Premium beauty salon website for **Navrai Beauty Salon**, Sangli, Maharashtra, India.

## 📁 Project Structure

```
redesigned-site/
│
├── index.html              ← Homepage
├── about.html              ← About Us
├── services.html           ← Beauty Services
├── gallery.html            ← Photo Gallery
├── contact.html            ← Contact Us
│
├── css/
│   └── style.css           ← Complete design system + all styles
│
├── js/
│   └── main.js             ← Navigation, animations, gallery, forms
│
├── images/                 ← Replace placeholders with real images
│   ├── hero/               ← Hero section backgrounds
│   ├── services/           ← Service images
│   ├── gallery/            ← Gallery photos
│   ├── about/              ← About page images
│   └── icons/              ← App icons & favicons
│
├── fonts/                  ← Custom fonts (if needed)
├── manifest.json           ← Web App Manifest
├── PROJECT_ANALYSIS.md     ← Technical analysis
├── IMPLEMENTATION_REPORT.md ← Changes documentation
└── README.md               ← This file
```

## 🚀 How to Run Locally

### Option 1: VS Code Live Server (Recommended)
1. Open the `redesigned-site` folder in VS Code
2. Install the "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
4. Website opens at `http://127.0.0.1:5500`

### Option 2: Python
```bash
cd redesigned-site
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### Option 3: Node.js
```bash
npx serve redesigned-site
```

### Option 4: Direct File
Simply double-click `index.html` to open in your browser.
> Note: Some features like font loading may work better with a local server.

## ✏️ How to Edit Content

### Change Text
Open any `.html` file in a text editor. The HTML is semantic and well-structured — look for the section you want to edit.

### Replace Images
1. Add your images to the appropriate `images/` subfolder
2. In the HTML, find the `<div class="img-placeholder">` elements
3. Replace them with `<img>` tags:
```html
<!-- Before -->
<div class="img-placeholder">Bridal Makeup</div>

<!-- After -->
<img src="images/services/bridal.jpg" alt="Bridal Makeup by Navrai" loading="lazy">
```

### Add Hero Background
In `index.html`, find the hero section and update:
```html
<!-- Before -->
<div class="hero-bg no-image"></div>

<!-- After -->
<div class="hero-bg" style="background-image: url('images/hero/main.jpg');"></div>
```

## 🎨 How to Modify Colors

Open `css/style.css` and edit the CSS variables at the top:

```css
:root {
  --color-primary: #8C6A5D;      /* Main brand color */
  --color-secondary: #C9A96E;    /* Gold accent */
  --color-accent: #D4956A;       /* Warm accent */
  --bg-primary: #FEFCFA;         /* Main background */
  --bg-dark: #1A1A2E;            /* Dark sections */
}
```

Change these values and the entire site updates instantly.

## 🌐 How to Deploy to GoDaddy/Shared Hosting

1. **Backup existing files**: Download current `public_html` contents from cPanel
2. **Upload new files**: 
   - Open cPanel → File Manager
   - Navigate to `public_html`
   - Upload all files from `redesigned-site/` folder
   - Or use FTP (FileZilla) to upload
3. **Verify**: Visit your domain to check the site
4. **SSL**: Ensure SSL certificate is active in cPanel → SSL/TLS

### Important Notes
- Keep the same filenames (`index.html`, `about.html`, etc.) to preserve SEO
- Upload images to their respective directories
- Test all links after deployment
- Clear browser cache after deploying

## ⚠️ Known Limitations

1. **Images**: Placeholder divs are used where actual images should go — replace with real photos from the original site
2. **Contact Form**: Frontend-only validation. For actual email sending, you need:
   - A PHP script on the server, OR
   - A third-party service like Formspree, EmailJS, or Netlify Forms
3. **Google Maps**: The map section has a placeholder — add your actual Google Maps embed code
4. **Social Links**: Facebook and Instagram links point to `#` — update with real social media URLs

## 🔮 Future Improvements

- [ ] Add actual business images from original website
- [ ] Set up contact form backend (PHP mail or third-party service)
- [ ] Add Google Maps embed
- [ ] Connect real social media profiles
- [ ] Add Google Analytics tracking
- [ ] Add Schema.org structured data for local business
- [ ] Create a blog/news section
- [ ] Add online booking integration
- [ ] Add service pricing (if business wants to display prices)
- [ ] Create customer testimonials with real reviews
- [ ] Optimize images (WebP format, proper sizing)
- [ ] Add cookie consent banner
