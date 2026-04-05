import React from 'react'

const Assignments = () => {
  return (
    <div className="relative w-full h-full rounded-3xl bg-[#07080d] flex flex-col items-center justify-center gap-4 overflow-hidden p-12">

      {/* Grid */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(99,120,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,120,255,.04) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Glow orb */}
      <div className="absolute w-72 h-72 rounded-full pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle,rgba(99,120,255,.1) 0%,transparent 70%)' }} />

      {/* Badge */}
      <div className="relative z-10 text-[11px] tracking-[.2em] uppercase text-[rgba(99,120,255,.8)] bg-[rgba(99,120,255,.1)] border border-[rgba(99,120,255,.25)] rounded-full px-4 py-1.5">
        Coming Soon
      </div>

      {/* Title */}
      <h2 className="relative z-10 text-5xl font-extrabold text-white tracking-tight"
        style={{ fontFamily: "'Syne', sans-serif" }}>
        Assignments
      </h2>

      {/* Subtitle */}
      <p className="relative z-10 text-[13px] font-light text-white/30 text-center max-w-[260px] leading-relaxed">
        This feature is currently being built. Check back soon.
      </p>

      {/* Animated dots */}
      <div className="relative z-10 flex gap-1.5 mt-1">
        {[0, 150, 300].map((delay) => (
          <div key={delay} className="w-1.5 h-1.5 rounded-full bg-[rgba(99,120,255,.4)]"
            style={{ animation: `bounce 0.9s ${delay}ms ease-in-out infinite` }} />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
        @keyframes bounce {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(-3px); }
        }
      `}</style>
    </div>
  )
}

export default Assignments