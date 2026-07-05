# Colorado Mycological Society Website Redesign
## Design & Implementation Guide

## Overview

A beautiful, modern single-page website redesign for the Colorado Mycological Society with an aesthetic focus on nature-inspired design and interactive elements.

## Live Demo

**URL:** `http://localhost:5173`

The website is currently running in development mode with hot module reloading enabled.

## Design Philosophy

- **Aesthetic First** – Pure visual beauty without SEO optimization
- **Nature-Inspired** – Mushroom themes and earth tones throughout
- **Interactive** – Engaging, responsive mushroom animations
- **Minimal** – Clean, uncluttered interface focusing on key elements
- **Responsive** – Works beautifully on all screen sizes

## Hero Section Layout

### Navigation Bar (Top)
Located at the top center with two pill-shaped containers:

**Left Pill (Logo Container):**
- Dimensions: 40px x 40px (responsive: 44px on larger screens)
- Background: Light gray (#EDEDED)
- Contains: Inline SVG logo (18px x 18px)
- Color: Charcoal gray (rgb(84, 84, 84))

**Right Pill (Navigation Links):**
- Background: Light gray (#EDEDED)
- Links: About, Events, Society, Shop, Contact
- Font sizes: 12px (mobile) to 14px (desktop)
- Hover effect: Transitions from gray-700 to gray-900

### Hero Content (Bottom-Left)
Positioned at bottom-left with maximum width of 21rem:

**Badge (Top):**
- Text: "Scientists, Naturalists & Mycophiles United"
- Color: Blue-500
- Icon: Right arrow (→)
- Hover: Translates arrow right by 0.5px
- Font size: 11.5px

**Headline:**
- Text: "Stalking The Wild Mushroom"
- Font size: 1.5rem (mobile) to 1.75rem (desktop)
- Line height: 1.15
- Color: Gray-900
- Margin bottom: 0.75rem

**Subtext:**
- Text: "Join Colorado's premier community of mushroom enthusiasts, foragers, cultivators, and scientists."
- Font size: 13px
- Color: Gray-400
- Margin bottom: 0.75rem

**Call-to-Action Button:**
- Text: "Explore Events" with arrow
- Border: 1px solid blue-400
- Padding: 0.625rem 1.25rem
- Border radius: Full (rounded pill)
- Default colors:
  - Text: Blue-500
  - Border: Blue-400
  - Background: Transparent
- Hover colors:
  - Text: White
  - Border: Blue-500
  - Background: Blue-500
- Transition: 200ms duration
- Arrow animation: Translates right by 0.5px on hover

### Background

**Video:**
- URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4`
- Behavior: Autoplay, muted, loop, playsInline
- Positioning: Absolute, full screen, cover object-fit
- Opacity: Varies by zone

**Page Background:**
- Color: #f0f0ee (warm off-white)
- Fallback if video fails to load

## Animated Mushrooms

### Overview
Interactive SVG mushrooms that respond to mouse movement with parallax effects. 8 mushrooms are displayed in the bottom center area.

### Interaction Behavior

**Mouse Movement:**
- Mushroom content translates based on cursor position
- Offset calculation: `(mousePos - center) * 0.15`
- Creates a parallax "leaning" effect toward the cursor
- Smooth transitions (300ms) when not hovering

**Hover Effects:**
- Scale increases to 1.1 (10% larger)
- Transitions are instant while hovering
- Smooth return to normal scale on mouse leave

### Mushroom Design

Each mushroom consists of:

**Cap (Top):**
- Element: SVG ellipse
- Dimensions: 28px width × 25px height
- Gradient fill with radial gradient for depth
- Highlight circle for shine (8px radius)
- Colors: 6 varieties of brown/tan tones

**Stem (Middle):**
- Element: SVG rectangle
- Dimensions: 10px width × 30px height
- Earthy tan/cream color
- Complementary to cap color

**Base (Bottom):**
- Element: SVG ellipse
- Subtle shadow/base appearance
- 3 small speckles for detail

### Color Palette

6 mushroom color variations:
1. Brown cap (#D4766F) with cream stem (#E8D4B8)
2. Dark rust cap (#A85645) with light cream stem (#F5E6D3)
3. Medium brown cap (#C9705E) with ivory stem (#EDE5D0)
4. Deep brown cap (#956B56) with off-white stem (#F0E7DA)
5. Warm brown cap (#B8845A) with pale cream stem (#FBF4E6)
6. Olive brown cap (#8B6F47) with khaki stem (#EFCB9C)

### Positioning

**Background Mushrooms (Low Opacity):**
- 4 mushrooms with 20% opacity
- Positioned in corners and edges
- Animate with Tailwind's bounce animation
- Staggered delays (0s, 0.2s, 0.4s, 0.6s)

**Foreground Mushrooms (Interactive):**
- 8 mushrooms arranged in bottom-center flex layout
- Full opacity
- Interactive on hover
- Responsive to mouse movement

### Animation Details

**Bounce Animation (Background):**
- Continuous vertical bounce
- Staggered timing for wave effect
- Low opacity to not distract from content

**Parallax Effect (Foreground):**
- Immediate response to mouse movement
- Smooth easing out when stationary
- Scale animation on hover

## Responsive Design

### Breakpoints (Tailwind-based)

**Mobile (< 640px):**
- Navigation padding: 1rem (16px)
- Nav gap: 0.5rem (8px)
- Logo size: 40px
- Headline font: 1.5rem
- Nav link font: 12px
- Hero padding: 1.5rem (24px)

**Tablet (640px - 1024px):**
- Navigation padding: 1rem (24px)
- Nav gap: 0.75rem (12px)
- Logo size: 44px
- Headline font: 1.75rem
- Nav link font: 14px
- Hero padding: 3rem (48px)

**Desktop (> 1024px):**
- Navigation padding: 2rem (32px) to 7rem (112px)
- Nav gap: 2.5rem (40px)
- Logo size: 44px
- Headline font: 1.75rem
- Nav link font: 14px
- Hero padding: 5rem (80px) to 7rem (112px)

## Content Integration

The website incorporates key information from the Colorado Mycological Society:

### Organization Information
- **Official Name:** The Colorado Mycological Society, Stalking The Wild Mushroom®
- **Mission:** Community of scientists, naturalists, chefs, writers, artists, gardeners, cultivators, and hikers united by passion for mushrooms

### Key Sections (To Be Implemented)
- **About** – Organization mission and history
- **Events** – Monthly meetings, forays, classes, and fairs
- **Society** – Membership, volunteer opportunities, special interest groups
- **Shop** – Mushroom-related merchandise
- **Contact** – Contact forms, poison control information, social media

### Event Types
- Monthly meetings (Spring through Fall)
- Guided forays (mushroom hunts)
- Educational classes
- Annual mushroom fair
- Special interest group meetups
- Cook and taste events

### Contact Information
- General contact form available
- Poison Control: 303-739-1123 (Rocky Mountain Poison and Drug Center)
- Social media: Facebook, Instagram (@colomycosociety), YouTube

## Color System

### Primary Palette
- **Page Background:** #f0f0ee (Warm off-white)
- **Card/Pill Background:** #EDEDED (Light gray)
- **Logo Color:** rgb(84, 84, 84) (Charcoal)

### Accent Colors
- **Primary Blue:** blue-500 (#3B82F6)
- **Hover Blue:** blue-600 (#2563EB)
- **Border Blue:** blue-400 (#60A5FA)

### Text Colors
- **Primary Text:** gray-900 (#111827)
- **Secondary Text:** gray-700 (#374151)
- **Tertiary Text:** gray-400 (#9CA3AF)

### Mushroom Earth Tones
- Browns, tans, creams, and khakis
- Natural, earthy palette
- Complementary warm tones

## Typography

**Font Stack:** System UI fonts (Segoe UI, Roboto, -apple-system, BlinkMacSystemFont)

**Font Sizes:**
- Badge: 11.5px
- Nav link: 12px (mobile), 14px (desktop)
- Subtext: 13px
- Headline: 1.5rem to 1.75rem
- Responsive scaling on larger screens

**Font Weight:**
- Regular: 400 (body text)
- Medium: 500 (navigation, badges)

**Line Heights:**
- Headline: 1.15
- Body: Default (1.5)

## Technical Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **CSS Framework:** Tailwind CSS
- **Icons/Graphics:** Lucide React (for future use), Custom SVG
- **Package Manager:** npm

## File Structure

```
cms-redesign/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # (Tailwind utilities only)
│   ├── index.css               # Tailwind CSS imports
│   ├── main.tsx                # React DOM entry point
│   └── assets/                 # Static assets (unused currently)
├── public/                     # Static files
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint with Oxlint
npm run lint
```

## Browser Support

Modern browsers with ES6+ support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

1. **Additional Pages**
   - Full events calendar with filtering
   - Membership portal
   - Blog section for articles and field guides
   - Photo gallery from forays

2. **Enhanced Interactivity**
   - More animated elements (mushroom growth animations, spore effects)
   - Scroll-triggered animations
   - Mushroom click interactions (information popups)

3. **Dynamic Content**
   - Backend integration for event management
   - Member authentication
   - Email newsletter signup

4. **Accessibility**
   - ARIA labels and semantic HTML
   - Keyboard navigation
   - Reduced motion preferences

5. **Performance**
   - Image optimization
   - Code splitting
   - Service worker for offline support

## Notes

- No external animation libraries (using Tailwind and CSS transitions)
- Accessible color contrasts maintained
- Mobile-first responsive design
- Smooth, subtle interactions
- Pure aesthetics focus without SEO optimization

## Contact

Website redesign for: Colorado Mycological Society (cmsweb.org)
Design & Development: Jared Schipkin (jaredschipkin@gmail.com)
