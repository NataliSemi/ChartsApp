// components/Navbar.tsx

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-neutral-900 border-b border-neutral-800 text-neutral-100">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          🎶 [Your Name]
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <Link href="/" className="hover:text-blue-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/arrangements" className="hover:text-blue-400 transition">
              Arrangements
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
