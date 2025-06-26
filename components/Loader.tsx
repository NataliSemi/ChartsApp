// components/JazzyLoader.tsx

export default function Loader() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 px-6 relative">
      {/* Pulsing saxophone */}
      <div className="text-6xl animate-pulse mb-4">🎷</div>
      <p className="text-xl text-center font-medium">Loading arrangements...</p>

      {/* Floating musical notes */}
      <div className="absolute top-10 left-1/4 text-3xl animate-float text-blue-400">🎶</div>
      <div className="absolute bottom-10 right-1/4 text-2xl animate-float-reverse text-purple-400">🎵</div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.8;
          }
        }

        @keyframes floatReverse {
          0% {
            transform: translateY(0);
            opacity: 0.8;
          }
          50% {
            transform: translateY(20px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.8;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: floatReverse 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
