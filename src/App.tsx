import { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  Users,
  Award,
  Sprout,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';

/* Brand icons (removed from lucide-react for trademark reasons) */
const IconFacebook = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
  </svg>
);
const IconInstagram = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
  </svg>
);
const IconYoutube = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M23.5 6.2a3 3 0 0 0-2.11-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.39.52A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.13c1.89.52 9.39.52 9.39.52s7.5 0 9.39-.52a3 3 0 0 0 2.11-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Interactive mushroom illustrations                                 */
/*  Each is a hand-drawn SVG species. They idle-sway, and on hover     */
/*  they pop up, tilt toward the cursor and the cap wobbles.           */
/* ------------------------------------------------------------------ */

type MushroomProps = {
  species: 'flyagaric' | 'chanterelle' | 'porcini' | 'morel' | 'inkcap';
  className?: string;
  swaySeconds?: number;
};

const Mushroom = ({ species, className = '', swaySeconds = 6 }: MushroomProps) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dx = (e.clientX - center) / (rect.width / 2); // -1 .. 1
    setTilt(Math.max(-1, Math.min(1, dx)) * 12);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt(0);
      }}
      onMouseMove={handleMove}
      className={`group relative cursor-pointer select-none ${className}`}
      style={{
        transformOrigin: 'bottom center',
        transform: hovered
          ? `translateY(-14px) rotate(${tilt}deg) scale(1.08)`
          : 'translateY(0) rotate(0) scale(1)',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        filter: 'drop-shadow(0 18px 18px rgba(0,0,0,0.35))',
      }}
    >
      <div
        className="animate-sway"
        style={{ animationDuration: `${swaySeconds}s` }}
      >
        <SpeciesArt species={species} hovered={hovered} />
      </div>
    </div>
  );
};

const SpeciesArt = ({
  species,
  hovered,
}: {
  species: MushroomProps['species'];
  hovered: boolean;
}) => {
  const capStyle = {
    transformOrigin: '50% 60%',
    transform: hovered ? 'scaleX(1.05) scaleY(0.96)' : 'scale(1)',
    transition: 'transform 0.35s ease',
  } as const;

  switch (species) {
    case 'flyagaric':
      return (
        <svg viewBox="0 0 120 160" width="100%" height="100%">
          <ellipse cx="60" cy="150" rx="30" ry="7" fill="#000" opacity="0.18" />
          <path d="M52 96 q-6 40 -2 48 q10 6 20 0 q4 -8 -2 -48 Z" fill="#F3ECD9" />
          <path d="M52 96 q-6 40 -2 48 q3 3 8 3 q-3 -30 2 -51 Z" fill="#E4D9BE" />
          <g style={capStyle}>
            <path
              d="M60 20 C22 20 8 60 8 78 q0 10 12 10 h80 q12 0 12 -10 C112 60 98 20 60 20 Z"
              fill="#C8352B"
            />
            <path
              d="M60 20 C40 20 26 38 20 62 q40 -14 80 0 C94 38 80 20 60 20 Z"
              fill="#D9463A"
            />
            <circle cx="40" cy="52" r="6" fill="#F7F1E1" />
            <circle cx="62" cy="42" r="7" fill="#F7F1E1" />
            <circle cx="84" cy="54" r="5.5" fill="#F7F1E1" />
            <circle cx="52" cy="66" r="4.5" fill="#F7F1E1" />
            <circle cx="74" cy="68" r="5" fill="#F7F1E1" />
            <circle cx="98" cy="70" r="4" fill="#F7F1E1" />
            <circle cx="24" cy="70" r="4" fill="#F7F1E1" />
          </g>
        </svg>
      );
    case 'chanterelle':
      return (
        <svg viewBox="0 0 120 160" width="100%" height="100%">
          <ellipse cx="60" cy="150" rx="26" ry="6" fill="#000" opacity="0.18" />
          <g style={capStyle}>
            <path
              d="M60 30 C40 30 30 50 26 70 q-4 20 34 20 q38 0 34 -20 C90 50 80 30 60 30 Z"
              fill="#E8A62C"
            />
            <path
              d="M28 74 q32 16 64 0 q-6 14 -32 14 q-26 0 -32 -14 Z"
              fill="#C9861B"
            />
            <path d="M60 30 q-14 4 -20 30 q22 -10 40 0 q-6 -26 -20 -30 Z" fill="#F2BE55" />
          </g>
          <path d="M50 88 q2 34 4 54 q6 5 12 0 q2 -20 4 -54 q-10 -6 -20 0 Z" fill="#F0D89B" />
          <path d="M50 88 q2 34 4 54 q3 2 6 2 q-2 -30 -1 -56 q-5 -1 -9 0 Z" fill="#E3C579" />
        </svg>
      );
    case 'porcini':
      return (
        <svg viewBox="0 0 120 160" width="100%" height="100%">
          <ellipse cx="60" cy="152" rx="32" ry="7" fill="#000" opacity="0.18" />
          <path
            d="M40 92 q-10 34 -6 54 q22 8 32 0 q4 -20 -6 -54 Z"
            fill="#EFE2C8"
          />
          <path d="M40 92 q-10 34 -6 54 q6 3 10 3 q-4 -32 4 -57 Z" fill="#DDCBA6" />
          <g style={capStyle}>
            <path
              d="M60 34 C32 34 14 58 14 76 q0 14 46 14 q46 0 46 -14 C106 58 88 34 60 34 Z"
              fill="#8A5A2B"
            />
            <path
              d="M60 34 C40 34 24 50 18 68 q42 -12 84 0 C96 50 80 34 60 34 Z"
              fill="#A06E38"
            />
            <ellipse cx="46" cy="52" rx="10" ry="5" fill="#B98A4E" opacity="0.6" />
          </g>
        </svg>
      );
    case 'morel':
      return (
        <svg viewBox="0 0 120 160" width="100%" height="100%">
          <ellipse cx="60" cy="152" rx="22" ry="6" fill="#000" opacity="0.18" />
          <path d="M50 96 q0 30 2 52 q8 5 16 0 q2 -22 2 -52 Z" fill="#EDE3CB" />
          <g style={capStyle}>
            <path
              d="M60 14 C42 14 36 44 38 70 q0 26 22 26 q22 0 22 -26 C84 44 78 14 60 14 Z"
              fill="#8C7A4E"
            />
            <g fill="#5F5231">
              <path d="M52 26 l8 -4 l6 6 l-6 6 l-8 -2 Z" />
              <path d="M66 30 l8 0 l2 8 l-6 4 l-6 -6 Z" />
              <path d="M46 40 l8 -2 l4 8 l-6 6 l-8 -4 Z" />
              <path d="M60 44 l8 -2 l4 8 l-6 6 l-8 -4 Z" />
              <path d="M52 58 l8 -2 l4 8 l-6 6 l-8 -4 Z" />
              <path d="M66 60 l8 0 l2 8 l-6 4 l-6 -6 Z" />
              <path d="M44 56 l6 0 l2 6 l-5 4 l-4 -5 Z" />
            </g>
          </g>
        </svg>
      );
    case 'inkcap':
    default:
      return (
        <svg viewBox="0 0 120 160" width="100%" height="100%">
          <ellipse cx="60" cy="152" rx="20" ry="6" fill="#000" opacity="0.18" />
          <path d="M54 70 q-4 44 0 78 q6 5 12 0 q4 -34 0 -78 Z" fill="#F1EBDD" />
          <path d="M54 70 q-4 44 0 78 q3 2 6 2 q-2 -40 0 -80 Z" fill="#E0D8C4" />
          <g style={capStyle}>
            <path
              d="M60 14 C46 14 42 40 44 60 q2 18 16 18 q14 0 16 -18 C78 40 74 14 60 14 Z"
              fill="#B9AE96"
            />
            <path
              d="M60 14 C52 14 48 34 49 56 q3 12 11 12 q8 0 11 -12 C72 34 68 14 60 14 Z"
              fill="#CFC6B0"
            />
            <path d="M46 58 q14 8 28 0 q-2 12 -14 12 q-12 0 -14 -12 Z" fill="#4A4232" />
          </g>
        </svg>
      );
  }
};

/* ------------------------------------------------------------------ */
/*  Floating spores                                                    */
/* ------------------------------------------------------------------ */

const Spores = () => {
  const spores = Array.from({ length: 22 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {spores.map((i) => {
        const left = (i * 47) % 100;
        const size = 2 + ((i * 7) % 5);
        const dur = 9 + ((i * 3) % 8);
        const delay = (i * 1.3) % 9;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-amber-100"
            style={{
              left: `${left}%`,
              bottom: '-10px',
              width: size,
              height: size,
              opacity: 0,
              animation: `drift ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section helpers                                                    */
/* ------------------------------------------------------------------ */

const Reveal = ({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={style}
      className={`${className} ${shown ? 'animate-fade-up' : 'opacity-0'}`}
    >
      {children}
    </div>
  );
};

const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 120 160" aria-hidden="true">
    <path
      d="M60 24 C34 24 20 52 20 70 q0 10 40 10 q40 0 40 -10 C100 52 86 24 60 24 Z"
      fill="#E8A62C"
    />
    <circle cx="44" cy="54" r="4" fill="#0f1a12" />
    <circle cx="62" cy="46" r="4.5" fill="#0f1a12" />
    <circle cx="80" cy="56" r="4" fill="#0f1a12" />
    <path d="M52 80 q-4 30 0 44 q8 5 16 0 q4 -14 0 -44 Z" fill="#F3ECD9" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data (pulled from cmsweb.org)                                      */
/* ------------------------------------------------------------------ */

const NAV = ['Mission', 'Events', 'Society', 'Contact'];

const EVENTS = [
  {
    date: 'JUL 12',
    title: 'July Meeting: Agaricus of Colorado',
    where: 'Gates Hall, Denver Botanic Gardens',
  },
  {
    date: 'AUG 9',
    title: 'CMS Mushroom Fair',
    where: 'Mitchell Hall',
  },
  {
    date: 'SEP 14',
    title: 'Cook & Taste Event',
    where: 'A celebration of the harvest',
  },
  {
    date: 'OCT 12',
    title: 'October Meeting',
    where: 'Closing the foray season',
  },
];

const PILLARS = [
  {
    icon: Users,
    title: 'Membership Benefits',
    body: 'Guided forays, monthly meetings, expert identification and a community of over a thousand mycophiles.',
  },
  {
    icon: Sprout,
    title: 'Special Interest Groups',
    body: 'From cultivation to microscopy, dive deep with fellow enthusiasts. The Cultivation SIG meets the last Tuesday monthly.',
  },
  {
    icon: Award,
    title: 'CMS Awards',
    body: 'Honoring members whose scholarship, teaching and stewardship advance Colorado mycology.',
  },
  {
    icon: Calendar,
    title: 'Volunteer',
    body: 'Forays, fairs, classes and outreach are powered entirely by members who give their time.',
  },
];

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

const App = () => {
  return (
    <div className="min-h-screen bg-[#14231a] text-[#f3ecd9]">
      {/* ============ HERO ============ */}
      <header className="relative min-h-screen overflow-hidden">
        {/* Forest gradient backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% -10%, #23402c 0%, #17291d 45%, #0e1a12 100%)',
          }}
        />
        {/* Sun rays */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'conic-gradient(from 210deg at 60% -5%, transparent 0deg, rgba(232,166,44,0.18) 20deg, transparent 40deg, rgba(232,166,44,0.12) 70deg, transparent 90deg)',
          }}
        />
        {/* Drifting mist */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 opacity-30"
          style={{
            background:
              'linear-gradient(to top, rgba(180,200,170,0.25), transparent)',
            animation: 'mist 14s ease-in-out infinite alternate',
          }}
        />
        <Spores />

        {/* Nav */}
        <nav className="relative z-20 flex items-center justify-between px-5 sm:px-10 lg:px-16 pt-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1d3324] ring-1 ring-amber-500/30">
              <Logo />
            </span>
            <span className="hidden sm:block text-sm font-semibold tracking-wide text-amber-100/90">
              Colorado Mycological Society
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#1d3324]/80 px-2 py-1.5 ring-1 ring-white/5 backdrop-blur">
            {NAV.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-amber-50/80 transition-colors hover:bg-amber-500/15 hover:text-amber-100"
              >
                {n}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero copy */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-16 sm:pt-24 text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.2em] text-amber-200 ring-1 ring-amber-500/25">
            Est. community of mycophiles
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
            Stalking the
            <br />
            <span className="text-amber-400">Wild Mushroom</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-amber-50/70">
            We're scientists, naturalists, chefs, writers, artists, gardeners,
            cultivators, hikers and admirers who've come together to share our
            passion for mushrooms.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#events"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-[#14231a] transition-transform hover:scale-105"
            >
              See Upcoming Events
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#society"
              className="rounded-full px-6 py-3 text-sm font-semibold text-amber-50/80 ring-1 ring-white/15 transition-colors hover:bg-white/5"
            >
              Join the Society
            </a>
          </div>
        </div>

        {/* Interactive mushroom row along the forest floor */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0">
          <div className="pointer-events-auto mx-auto flex max-w-6xl items-end justify-center gap-2 sm:gap-6 px-4 pb-4">
            <Mushroom species="inkcap" swaySeconds={7} className="h-28 w-20 sm:h-40 sm:w-28" />
            <Mushroom species="chanterelle" swaySeconds={5.5} className="h-32 w-24 sm:h-48 sm:w-32" />
            <Mushroom species="flyagaric" swaySeconds={6.5} className="h-40 w-28 sm:h-60 sm:w-40" />
            <Mushroom species="porcini" swaySeconds={5} className="h-36 w-28 sm:h-52 sm:w-36" />
            <Mushroom species="morel" swaySeconds={7.5} className="h-28 w-20 sm:h-44 sm:w-28" />
          </div>
          <div className="h-6 w-full bg-gradient-to-t from-[#0e1a12] to-transparent" />
        </div>
        <p className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 text-[11px] uppercase tracking-[0.25em] text-amber-100/40">
          hover the mushrooms
        </p>
      </header>

      {/* ============ MISSION ============ */}
      <section id="mission" className="bg-[#0e1a12] px-6 py-24 sm:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Our Mission
          </h2>
          <p className="mt-6 text-2xl sm:text-4xl font-medium leading-snug text-amber-50">
            To promote the study and enjoyment of mushrooms, and the science of
            mycology, through education, forays, cultivation and fellowship
            across Colorado.
          </p>
        </Reveal>
      </section>

      {/* ============ EVENTS ============ */}
      <section id="events" className="bg-[#14231a] px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                What's Growing
              </h2>
              <p className="mt-2 text-3xl sm:text-4xl font-semibold text-amber-50">
                Upcoming Events
              </p>
            </div>
            <p className="max-w-xs text-sm text-amber-50/60">
              Meetings, forays, classes and fairs run spring through fall. Open
              to members and the curious alike.
            </p>
          </Reveal>

          <div className="space-y-3">
            {EVENTS.map((e, i) => (
              <Reveal key={e.title} style={{ animationDelay: `${i * 80}ms` } as React.CSSProperties}>
                <a
                  href="#contact"
                  className="group flex items-center gap-5 rounded-2xl bg-[#1d3324]/60 p-5 ring-1 ring-white/5 transition-all hover:bg-[#1d3324] hover:ring-amber-500/30"
                >
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {e.date.split(' ')[0]}
                    </span>
                    <span className="text-xl font-bold leading-none">
                      {e.date.split(' ')[1]}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-semibold text-amber-50">
                      {e.title}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-sm text-amber-50/55">
                      <MapPin className="h-3.5 w-3.5" />
                      {e.where}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-amber-400/50 transition-transform group-hover:translate-x-1 group-hover:text-amber-400" />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 rounded-2xl bg-amber-500/10 p-5 text-sm text-amber-100/80 ring-1 ring-amber-500/20">
            <span className="font-semibold text-amber-200">Cultivation SIG</span>{' '}
            gathers the last Tuesday of each month, 6:30–8:00 PM, at the
            Edgewater Public Market Food Court.
          </Reveal>
        </div>
      </section>

      {/* ============ SOCIETY ============ */}
      <section id="society" className="bg-[#0e1a12] px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-14 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              The Society
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-semibold text-amber-50">
              More than a club
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} style={{ animationDelay: `${i * 80}ms` } as React.CSSProperties}>
                <div className="h-full rounded-2xl bg-[#1d3324]/50 p-7 ring-1 ring-white/5 transition-colors hover:ring-amber-500/25">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-semibold text-amber-50">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-amber-50/60">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POISON NOTICE ============ */}
      <section className="bg-[#14231a] px-6 py-16">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl bg-red-950/40 p-8 text-center ring-1 ring-red-500/30 sm:flex-row sm:text-left">
          <Phone className="h-9 w-9 shrink-0 text-red-300" />
          <div className="flex-1">
            <p className="text-lg font-semibold text-red-100">
              Suspected mushroom poisoning?
            </p>
            <p className="text-sm text-red-100/70">
              Contact the Rocky Mountain Poison &amp; Drug Center immediately.
              Never eat a wild mushroom without expert identification.
            </p>
          </div>
          <a
            href="tel:3037391123"
            className="rounded-full bg-red-500 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            303-739-1123
          </a>
        </Reveal>
      </section>

      {/* ============ CONTACT / FOOTER ============ */}
      <footer id="contact" className="bg-[#0e1a12] px-6 pt-24 pb-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Mushroom
              species="flyagaric"
              swaySeconds={6}
              className="mx-auto mb-6 h-24 w-16"
            />
            <h2 className="text-3xl sm:text-5xl font-semibold text-amber-50">
              Come stalk with us.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-amber-50/60">
              Whether you're a seasoned forager or just mushroom-curious,
              there's a place for you in the Colorado Mycological Society.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://cmsweb.org/contact-cms/"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-[#14231a] transition-transform hover:scale-105"
              >
                <Mail className="h-4 w-4" />
                Contact CMS
              </a>
              <div className="flex items-center gap-2">
                {[
                  { icon: IconFacebook, label: 'Facebook', href: 'https://cmsweb.org' },
                  { icon: IconInstagram, label: 'Instagram', href: 'https://instagram.com/colomycosociety' },
                  { icon: IconYoutube, label: 'YouTube', href: 'https://cmsweb.org' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1d3324] text-amber-200 ring-1 ring-white/5 transition-colors hover:bg-amber-500/20"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-16 border-t border-white/10 pt-6 text-xs text-amber-50/40">
            Colorado Mycological Society · Stalking the Wild Mushroom® ·
            Denver, Colorado
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
