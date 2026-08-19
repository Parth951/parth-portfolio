## Parth Portfolio

A fast, responsive personal portfolio website showcasing projects, skills, and contact information.

### Features
- **Modern, responsive UI**: Clean layout optimized for desktop and mobile.
- **Smooth navigation**: Scroll-to-section with active link highlighting.
- **Lazy 3D hero background**: Defers loading of Three.js effect for performance.
- **Accessible markup**: Semantic HTML, ARIA labels on key media.

### Tech Stack
- **HTML5**, **CSS3**, **JavaScript (ES6+)**
- **IntersectionObserver** for nav highlighting and lazy-loading
- Optional **Three.js** background effect, loaded on demand (`three-hero.js`)

### Quick Start (Local)
1. Clone the repository and switch to the project directory.
2. Serve the site with any static server, for example using Python:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Alternatively, you can open `index.html` directly in your browser, but a local server is recommended.

### Deploy
This repo is designed to work well with GitHub Pages (a `.nojekyll` file is included). You can:
- Push to the branch configured for Pages in the repo settings, or
- Use a `docs/` folder if preferred and update your Pages settings accordingly.

### Project Structure
```text
/
├─ index.html        # Main page (edit content here)
├─ styles.css        # Global styles
├─ script.js         # Navigation, smooth scroll, lazy-load logic
├─ three-hero.js     # Optional Three.js background loader
├─ avatar.jpg        # Profile image
└─ .nojekyll         # For GitHub Pages
```

### Editing Content
- **Hero/contact**: `index.html` (within the `#hero` and `#contact` sections)
- **About**: `index.html` (`#about` section)
- **Projects**: `index.html` (`#projects` section)
  - Each project is an `<article class="card">` inside `.projects-grid`.
- **Skills**: `index.html` (`#skills` section)

### Notes
- The Projects section currently lists two sample projects. Add, remove, or edit cards directly in `index.html`.
- The Three.js background loads only when the hero section enters the viewport to keep initial load fast.

### License
This project is provided as-is for personal portfolio use. Add a LICENSE file if you plan to distribute under a specific license.

