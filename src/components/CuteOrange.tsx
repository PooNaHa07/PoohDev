export type OrangeMood = "happy" | "surprised" | "wink" | "excited" | "neutral";

export default function CuteOrange({ 
  className = "", 
  mood = "happy" 
}: { 
  className?: string;
  mood?: OrangeMood;
}) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="orangeGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffb347" />
          <stop offset="70%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#ea580c" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Main Orange Body */}
      <circle cx="50" cy="55" r="40" fill="url(#orangeGrad)" filter="url(#shadow)" />
      
      {/* Texture Details (Dots) */}
      <circle cx="28" cy="40" r="1.5" fill="#ea580c" opacity="0.6"/>
      <circle cx="70" cy="45" r="2" fill="#ea580c" opacity="0.5"/>
      <circle cx="35" cy="75" r="1.5" fill="#ea580c" opacity="0.4"/>
      <circle cx="65" cy="70" r="2" fill="#ea580c" opacity="0.4"/>
      <circle cx="80" cy="55" r="1.5" fill="#ea580c" opacity="0.5"/>
      <circle cx="20" cy="60" r="1.5" fill="#ea580c" opacity="0.4"/>

      {/* Stem */}
      <path d="M50 15 Q55 5 45 -5" fill="none" stroke="#4d2f0a" strokeWidth="3" strokeLinecap="round" />

      {/* Leaf 1 */}
      <path d="M50 15 C50 15, 75 0, 70 20 C65 40, 50 15, 50 15" fill="#4ade80" />
      <path d="M50 15 Q60 15 65 24" fill="none" stroke="#16a34a" strokeWidth="1.5" />

      {/* Leaf 2 (Smaller) */}
      <path d="M50 15 C50 15, 30 5, 35 20 C40 30, 50 15, 50 15" fill="#22c55e" />

      {/* Cute Face Rendering Based on Mood */}
      <g>
        {/* Eyes */}
        {mood === "wink" ? (
          <>
            <circle cx="35" cy="50" r="4" fill="#4d2f0a" />
            <path d="M60 50 Q65 45 70 50" fill="none" stroke="#4d2f0a" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : mood === "surprised" ? (
          <>
            <circle cx="35" cy="48" r="5" fill="#4d2f0a" />
            <circle cx="65" cy="48" r="5" fill="#4d2f0a" />
            <circle cx="35" cy="48" r="1.5" fill="white" />
            <circle cx="65" cy="48" r="1.5" fill="white" />
          </>
        ) : mood === "excited" ? (
          <>
            <path d="M30 50 Q35 40 40 50" fill="none" stroke="#4d2f0a" strokeWidth="4" strokeLinecap="round" />
            <path d="M60 50 Q65 40 70 50" fill="none" stroke="#4d2f0a" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="35" cy="50" r="4" fill="#4d2f0a" />
            <circle cx="65" cy="50" r="4" fill="#4d2f0a" />
            {/* Eye Highlights */}
            <circle cx="33" cy="48" r="1.5" fill="#ffffff" />
            <circle cx="63" cy="48" r="1.5" fill="#ffffff" />
          </>
        )}

        {/* Mouth */}
        {mood === "surprised" ? (
          <circle cx="50" cy="65" r="5" fill="none" stroke="#4d2f0a" strokeWidth="3" />
        ) : mood === "excited" ? (
          <path d="M35 62 Q50 75 65 62" fill="#4d2f0a" />
        ) : mood === "neutral" ? (
          <path d="M42 62 L58 62" fill="none" stroke="#4d2f0a" strokeWidth="3" strokeLinecap="round" />
        ) : (
          <path d="M42 60 Q50 68 58 60" fill="none" stroke="#4d2f0a" strokeWidth="3" strokeLinecap="round" />
        )}
      </g>
      
      {/* Blush */}
      <ellipse cx="25" cy="55" rx="5" ry="3" fill="#ff7f50" opacity="0.6" />
      <ellipse cx="75" cy="55" rx="5" ry="3" fill="#ff7f50" opacity="0.6" />

      {/* Top Body Highlights */}
      <path d="M25 40 Q30 25 45 22" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
