import React, { useState } from 'react';

const Logo = () => (
  <svg width="18" height="18" viewBox="0 0 256 256" fill="none">
    <path
      fill="rgb(84, 84, 84)"
      d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
    />
  </svg>
);

const AnimatedMushroom = ({ id }: { id: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const offsetX = (mousePos.x - 50) * 0.15;
  const offsetY = (mousePos.y - 50) * 0.15;

  const colors = [
    { cap: '#D4766F', stem: '#E8D4B8' },
    { cap: '#A85645', stem: '#F5E6D3' },
    { cap: '#C9705E', stem: '#EDE5D0' },
    { cap: '#956B56', stem: '#F0E7DA' },
    { cap: '#B8845A', stem: '#FBF4E6' },
    { cap: '#8B6F47', stem: '#EFCB9C' },
  ];

  const mushroom = colors[id % colors.length];

  return (
    <div
      key={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-24 h-24 cursor-pointer transition-transform duration-300 group"
      style={{
        transform: isHovered ? `scale(1.1)` : 'scale(1)',
      }}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transition: isHovered ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          className="transition-all duration-300 drop-shadow-lg"
        >
          <defs>
            <radialGradient id={`grad-${id}`} cx="35%" cy="35%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
              <stop offset="100%" stopColor={mushroom.cap} />
            </radialGradient>
          </defs>

          <ellipse cx="50" cy="35" rx="28" ry="25" fill={`url(#grad-${id})`} />

          <circle cx="38" cy="28" r="8" fill="#fff" opacity="0.3" />

          <rect x="45" y="50" width="10" height="30" fill={mushroom.stem} />

          <ellipse cx="50" cy="80" rx="12" ry="4" fill={mushroom.stem} opacity="0.7" />

          <circle cx="40" cy="68" r="3" fill="#9B7D6B" opacity="0.5" />
          <circle cx="55" cy="72" r="3" fill="#9B7D6B" opacity="0.5" />
          <circle cx="48" cy="76" r="2.5" fill="#9B7D6B" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};

const App = () => {
  const navLinks = ['About', 'Events', 'Society', 'Shop', 'Contact'];

  const mushrooms = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f0f0ee]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
          type="video/mp4"
        />
      </video>

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex items-center justify-center pt-4 sm:pt-6 px-4 sm:px-8 gap-2 sm:gap-3">
          <div
            className="flex items-center justify-center rounded-full w-10 h-10 sm:w-11 sm:h-11 shrink-0"
            style={{ backgroundColor: '#EDEDED' }}
          >
            <Logo />
          </div>

          <div
            className="flex items-center gap-4 sm:gap-10 rounded-xl px-4 sm:px-8 py-2.5 sm:py-3"
            style={{ backgroundColor: '#EDEDED' }}
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[12px] sm:text-[14px] font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </nav>

        <div className="flex-1 flex items-end pb-10 sm:pb-16 lg:pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
          <div className="max-w-xs">
            <a
              href="#mission"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 hover:text-blue-600 transition-colors mb-3 group"
            >
              Scientists, Naturalists & Mycophiles United
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>

            <h1 className="text-[1.5rem] sm:text-[1.75rem] leading-[1.15] font-medium text-gray-900 tracking-tight mb-3">
              Stalking The Wild Mushroom
            </h1>

            <p className="text-[13px] text-gray-400 font-normal mb-3">
              Join Colorado's premier community of mushroom enthusiasts, foragers, cultivators, and scientists.
            </p>

            <a
              href="#events"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
            >
              Explore Events
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s' }}>
          <AnimatedMushroom id={0} />
        </div>
        <div
          className="absolute top-32 right-20 animate-bounce"
          style={{ animationDelay: '0.2s' }}
        >
          <AnimatedMushroom id={1} />
        </div>
        <div
          className="absolute bottom-40 left-20 animate-bounce"
          style={{ animationDelay: '0.4s' }}
        >
          <AnimatedMushroom id={2} />
        </div>
        <div
          className="absolute bottom-32 right-32 animate-bounce"
          style={{ animationDelay: '0.6s' }}
        >
          <AnimatedMushroom id={3} />
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-8 max-w-4xl">
          {mushrooms.map((id) => (
            <div key={id} className="pointer-events-auto">
              <AnimatedMushroom id={id} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f0f0ee] to-transparent z-0 pointer-events-none" />
    </div>
  );
};

export default App;
