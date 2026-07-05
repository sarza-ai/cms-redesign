# Colorado Mycological Society Website - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd cms-redesign
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser

### 3. Start Editing
Edit `src/App.tsx` and save - changes appear instantly!

---

## 📁 Project Structure

```
src/
├── App.tsx          ← Main component (all code is here!)
├── main.tsx         ← React entry point
└── index.css        ← Tailwind imports
```

## 🎨 What You'll See

A beautiful hero section with:
- 📽️ Full-screen background video
- 🧭 Navigation bar with logo and menu
- 📝 Headline, description, and call-to-action
- 🍄 8 animated mushrooms at the bottom
- 4️⃣ Background mushrooms with bounce animations

## 🎯 Key Features

### Animated Mushrooms
- Hover over them to see parallax effect
- They "lean" toward your cursor
- Grow larger when you hover directly on them
- 6 different color variations

### Navigation
- Five menu items: About, Events, Society, Shop, Contact
- Smooth hover transitions
- Logo on the left side

### Responsive Design
- Works on mobile, tablet, and desktop
- All text sizes adjust automatically
- Mushrooms reposition for different screens

---

## 🛠️ Common Tasks

### Change Colors
Edit in `src/App.tsx`:
```javascript
// Page background
bg-[#f0f0ee]

// Pill backgrounds
backgroundColor: '#EDEDED'

// Mushroom colors (lines 27-33)
const colors = [
  { cap: '#D4766F', stem: '#E8D4B8' }, // Change these
  // ... more colors
];
```

### Change Headline Text
In `src/App.tsx` (line ~135):
```javascript
<h1>Your headline here</h1>
```

### Change Navigation Links
In `src/App.tsx` (line ~95):
```javascript
const navLinks = ['About', 'Events', 'Society', 'Shop', 'Contact'];
```

### Change Video Background
In `src/App.tsx` (line ~115):
```javascript
<source src="YOUR_VIDEO_URL_HERE" type="video/mp4" />
```

### Adjust Mushroom Parallax Strength
In `src/App.tsx` (line ~25):
```javascript
const offsetX = (mousePos.x - 50) * 0.15; // Change 0.15 to adjust strength
```

### Change Hover Scale
In `src/App.tsx` (line ~49):
```javascript
transform: isHovered ? `scale(1.1)` : 'scale(1)', // Change 1.1 to adjust
```

---

## 📦 Build for Production

```bash
npm run build
```

Creates optimized files in `dist/` folder ready to deploy.

Preview production build:
```bash
npm run preview
```

---

## 🎨 Customization Guide

### Button Colors
Modify the CTA button in `src/App.tsx` (line ~151):
```javascript
className="... text-blue-500 border border-blue-400 ... hover:bg-blue-500 ..."
```

Color options: blue, green, red, purple, pink, etc.

### Text Sizes
Responsive sizing already in place:
```javascript
text-[1.5rem] sm:text-[1.75rem]  // Mobile to desktop
text-[12px] sm:text-[14px]       // Small to large screens
```

### Spacing
Adjust padding and margins:
```javascript
pb-10 sm:pb-16 lg:pb-20    // Bottom padding for different sizes
px-6 sm:px-12 md:px-20     // Horizontal padding
gap-2 sm:gap-3             // Gap between elements
```

### Animations
Change animation speeds (in milliseconds):
```javascript
transition-colors duration-200  // 200ms color transition
transition-transform duration-200  // 200ms transform
```

---

## 🐛 Troubleshooting

### Dev server not starting?
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

### Videos not playing?
- Check video URL is accessible
- Ensure browser allows autoplay with mute
- Try different video format (MP4, WebM, Ogg)

### Mushrooms not showing?
- Check browser console for errors
- Ensure z-index values aren't being overridden
- Verify opacity values (currently 0.2 for background, 1 for foreground)

### Build failing?
```bash
# Clean build
rm -r dist
npm run build
```

---

## 📊 Performance Tips

- Video file should be < 5MB (optimize with FFmpeg)
- CSS is automatically minified (Tailwind)
- JS is automatically minified (Vite)
- Images should be WebP format when possible

---

## 🌐 Deployment

### Vercel (Easiest)
1. Push to GitHub
2. Connect repo to Vercel
3. Auto-deploys on push

### Netlify
1. Push to GitHub
2. Connect repo to Netlify
3. Auto-deploys on push

### Traditional Host
```bash
npm run build
# Upload dist/ folder to your server
# Configure to serve index.html for all routes (SPA)
```

---

## 📖 Documentation Files

- **README.md** - Overview and features
- **DESIGN_GUIDE.md** - Complete design specifications
- **PROJECT_SUMMARY.md** - Full project details
- **QUICK_START.md** - This file

---

## 🎓 Learning Resources

- **React Docs:** https://react.dev
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **Tailwind CSS:** https://tailwindcss.com
- **Vite Docs:** https://vite.dev

---

## 📞 Support

Need help? Check these in order:
1. Browser console (F12) for error messages
2. DESIGN_GUIDE.md for styling details
3. PROJECT_SUMMARY.md for architecture info
4. React/Tailwind/Vite official docs

---

## ✨ What's Next?

### Easy Additions
- [ ] Add more pages (Events, Shop, About)
- [ ] Add form submissions (Contact)
- [ ] Add image gallery
- [ ] Add blog section

### Medium Additions
- [ ] Add backend API
- [ ] User authentication
- [ ] Database integration
- [ ] Email notifications

### Advanced
- [ ] Real-time event updates
- [ ] Member portal
- [ ] Payment processing
- [ ] Advanced analytics

---

**Happy coding! 🚀**
