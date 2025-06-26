// components/NotePop.tsx
'use client';
import { useEffect, useState } from 'react';

export default function NotePop() {
  const [notes, setNotes] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setNotes((prev) => [
        ...prev,
        { id: Date.now(), x: e.clientX, y: e.clientY },
      ]);
      setTimeout(() => {
        setNotes((prev) => prev.slice(1));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {notes.map((note) => (
        <div
          key={note.id}
          className="absolute animate-pop text-blue-400 text-xl pointer-events-none select-none"
          style={{ top: note.y, left: note.x }}
        >
          🎶
        </div>
      ))}
    </>
  );
}
