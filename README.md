# Colorado Mycological Society Website Redesign

A beautiful, modern recreation of the Colorado Mycological Society website with an aesthetic focus and interactive animated mushroom elements.

## Features

- **Animated Video Background** – Fullscreen background video that plays automatically
- **Interactive Animated Mushrooms** – Custom SVG mushrooms that respond to mouse movement with natural parallax effects
- **Beautiful Typography & Colors** – Clean, modern design with custom gradient text and smooth transitions
- **Responsive Navigation** – Pill-style navigation bar with the CMS logo and main links
- **Tailwind CSS Styling** – Utility-first CSS for fast, maintainable styling
- **TypeScript** – Full type safety throughout the application
- **Vite** – Lightning-fast build tool with HMR (Hot Module Replacement)

## Technologies

- **React 18** – Modern UI library
- **TypeScript** – Type-safe JavaScript
- **Vite** – Next generation frontend tooling
- **Tailwind CSS** – Utility-first CSS framework
- **Lucide React** – Beautiful, consistent SVG icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

- `src/App.tsx` – Main application component containing the hero section and animated mushrooms
- `src/main.tsx` – React DOM entry point
- `src/index.css` – Tailwind CSS imports
- `tailwind.config.js` – Tailwind configuration
- `vite.config.ts` – Vite configuration

## Design Details

### Hero Section

The hero section features:
- Centered navigation with logo and links
- Large animated headline
- Descriptive subtext
- Call-to-action button with hover effects
- Bottom-left alignment for content

### Animated Mushrooms

Interactive SVG mushrooms with:
- Mouse-tracking parallax effect
- Scale animation on hover
- Smooth transitions
- Multiple color variations (browns, earthy tones)
- Subtle drop shadows for depth

## Colors

- Background: `#f0f0ee`
- Pill backgrounds: `#EDEDED`
- Primary accent: `blue-500/600/400`
- Text: `gray-900/700/400`

## Future Enhancements

- Additional sections (Events, Shop, Membership)
- Event calendar integration
- Blog section
- Member directory
- Photo gallery
