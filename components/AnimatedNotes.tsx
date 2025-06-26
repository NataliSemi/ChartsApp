// components/AnimatedNotes.tsx

export default function AnimatedNotes() {
  const notes = ['🎵', '🎶', '♩', '♪', '𝄞'];
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 10 + Math.random() * 10;
        const size = 20 + Math.random() * 20;
        const note = notes[Math.floor(Math.random() * notes.length)];

        return (
          <div
            key={i}
            className="absolute text-white opacity-10 animate-note-float"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              fontSize: `${size}px`,
              top: '100%',
            }}
          >
            {note}
          </div>
        );
      })}
    </div>
  );
}
