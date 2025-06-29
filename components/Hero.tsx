// components/Hero.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const phrases = [
  'Charts for Every Soloist',
  'Instant Download, Instant Groove',
  'Bring Your Band to Life',
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
<section
  className="relative flex justify-center items-start min-h-[30vh] px-6 py-16 bg-neutral-900 bg-cover bg-center"
  style={{ backgroundImage: "url('/music1.jpg')" }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70 pointer-events-none" />

  {/* Content */}
  <div className="relative max-w-4xl text-center z-10">
    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
      Big Band Arrangements
    </h1>
    <p className="text-xl md:text-2xl text-neutral-300 h-[2.5rem] mb-6 transition-opacity duration-500">
      {phrases[idx]}
    </p>
    <div className="flex justify-center gap-4">
      <Link
        href="/arrangements"
        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition"
      >
        Browse Arrangements
      </Link>
      <Link
        href="https://youtu.be/DXhAmASJnbc?si=5juoo9X_Cgba22Ce"
        className="px-4 py-3 border border-blue-600 rounded-xl text-blue-400 hover:text-blue-300 transition"
      >
        Hear a Sample
      </Link>
    </div>
  </div>
</section>

  );
}
