export function ScienceIllustration() {
  return (
    <svg width="180" height="180" viewBox="0 0 160 160" overflow="visible">
      <g className="svc-sci-o1">
        <ellipse cx="80" cy="80" rx="65" ry="20" fill="none" stroke="#4fc3f7" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.85" />
        <circle cx="145" cy="80" r="7" fill="#4fc3f7" />
      </g>
      <g className="svc-sci-o2">
        <g transform="rotate(60 80 80)">
          <ellipse cx="80" cy="80" rx="65" ry="20" fill="none" stroke="#2ecc71" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.75" />
          <circle cx="145" cy="80" r="7" fill="#2ecc71" />
        </g>
      </g>
      <g className="svc-sci-o3">
        <g transform="rotate(120 80 80)">
          <ellipse cx="80" cy="80" rx="65" ry="20" fill="none" stroke="#f0a500" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.75" />
          <circle cx="145" cy="80" r="7" fill="#f0a500" />
        </g>
      </g>
      <circle cx="80" cy="80" r="20" fill="#4fc3f7" className="svc-sci-core" opacity="0.9" />
      <circle cx="80" cy="80" r="11" fill="#061620" />
      <circle cx="80" cy="80" r="5" fill="#4fc3f7" />
    </svg>
  )
}

export function MathsIllustration() {
  return (
    <svg width="180" height="180" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="48" fill="none" stroke="#2ecc71" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
      <g className="svc-mat-o1">
        <polygon points="80,28 90,46 70,46" fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinejoin="round" />
      </g>
      <g className="svc-mat-o2">
        <polygon points="80,28 87,35 80,42 73,35" fill="none" stroke="#4fc3f7" strokeWidth="2.5" strokeLinejoin="round" />
      </g>
      <g className="svc-mat-o3">
        <circle cx="80" cy="34" r="8" fill="none" stroke="#f0a500" strokeWidth="2.5" />
      </g>
      <text x="80" y="91" textAnchor="middle" fill="#2ecc71" fontSize="40" fontFamily="Georgia, serif" fontWeight="bold" className="svc-mat-pi" opacity="0.9">π</text>
    </svg>
  )
}

export function GKIllustration() {
  return (
    <svg width="180" height="180" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="60" fill="none" stroke="#f0a500" strokeWidth="2" opacity="0.85" />
      <ellipse cx="80" cy="80" rx="60" ry="18" fill="none" stroke="#f0a500" strokeWidth="1" opacity="0.45" />
      <ellipse cx="80" cy="62" rx="50" ry="12" fill="none" stroke="#f0a500" strokeWidth="1" opacity="0.3" />
      <ellipse cx="80" cy="98" rx="50" ry="12" fill="none" stroke="#f0a500" strokeWidth="1" opacity="0.3" />
      <g className="svc-gk-long">
        <ellipse cx="80" cy="80" rx="18" ry="60" fill="none" stroke="#f0a500" strokeWidth="1" opacity="0.5" />
        <ellipse cx="80" cy="80" rx="40" ry="60" fill="none" stroke="#f0a500" strokeWidth="1" opacity="0.35" />
      </g>
      <g className="svc-gk-pin1">
        <line x1="80" y1="30" x2="80" y2="40" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" />
        <circle cx="80" cy="27" r="5" fill="#f0a500" />
      </g>
      <g className="svc-gk-pin2">
        <line x1="107" y1="58" x2="107" y2="68" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" />
        <circle cx="107" cy="55" r="5" fill="#f0a500" />
      </g>
      <g className="svc-gk-pin3">
        <line x1="53" y1="74" x2="53" y2="84" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" />
        <circle cx="53" cy="71" r="5" fill="#f0a500" />
      </g>
    </svg>
  )
}

export function StudentIllustration() {
  return (
    <svg width="180" height="180" viewBox="0 0 160 160">
      <g className="svc-stu-book">
        <path d="M35,55 L35,115 L80,104 L125,115 L125,55 L80,66 Z" fill="none" stroke="#9b59b6" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="80" y1="66" x2="80" y2="104" stroke="#9b59b6" strokeWidth="2" />
        <line x1="46" y1="73" x2="78" y2="71" stroke="#9b59b6" strokeWidth="1" opacity="0.45" />
        <line x1="46" y1="82" x2="78" y2="80" stroke="#9b59b6" strokeWidth="1" opacity="0.45" />
        <line x1="46" y1="91" x2="78" y2="89" stroke="#9b59b6" strokeWidth="1" opacity="0.45" />
        <line x1="82" y1="71" x2="114" y2="73" stroke="#9b59b6" strokeWidth="1" opacity="0.45" />
        <line x1="82" y1="80" x2="114" y2="82" stroke="#9b59b6" strokeWidth="1" opacity="0.45" />
        <line x1="82" y1="89" x2="114" y2="91" stroke="#9b59b6" strokeWidth="1" opacity="0.45" />
      </g>
      <g className="svc-stu-s1">
        <text x="55" y="50" textAnchor="middle" fontSize="18" fill="#9b59b6">✦</text>
      </g>
      <g className="svc-stu-s2">
        <text x="80" y="42" textAnchor="middle" fontSize="22" fill="#c39bd3">✦</text>
      </g>
      <g className="svc-stu-s3">
        <text x="105" y="48" textAnchor="middle" fontSize="16" fill="#7d3c98">✦</text>
      </g>
    </svg>
  )
}

export function TeacherIllustration() {
  return (
    <svg viewBox="0 0 200 160" style={{ height: '80%', width: 'auto', display: 'block' }}>
      {/* Board: x=[20,180] y=[18,118] — center (100,68); total content center ~(100,79) ≈ viewBox center (100,80) */}
      <rect x="20" y="18" width="160" height="100" rx="6" fill="#061e14" stroke="#4fc3f7" strokeWidth="2" />
      <text x="100" y="63" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#4fc3f7" className="svc-tch-f" opacity="0.9">
        a² + b² = c²
      </text>
      <line x1="20" y1="80" x2="180" y2="80" stroke="#4fc3f7" strokeWidth="1" opacity="0.2" />
      <text x="100" y="103" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="#4fc3f7" className="svc-tch-sub" opacity="0.6">
        Pythagorean Theorem
      </text>
      {/* Chalk pointer: entirely inside board bounds — tip ends at board bottom-right corner */}
      <circle cx="163" cy="107" r="4" fill="#f0a500" />
      <line x1="163" y1="107" x2="177" y2="118" stroke="#f0a500" strokeWidth="3" strokeLinecap="round" />
      {/* Particles: horizontally balanced below board, all within viewBox */}
      <circle cx="70" cy="133" r="4" fill="#4fc3f7" className="svc-tch-p1" opacity="0.7" />
      <circle cx="100" cy="136" r="3" fill="#4fc3f7" className="svc-tch-p2" opacity="0.6" />
      <circle cx="130" cy="132" r="4" fill="#4fc3f7" className="svc-tch-p3" opacity="0.7" />
    </svg>
  )
}

export function WorkshopIllustration() {
  return (
    <svg width="180" height="180" viewBox="0 0 160 160">
      <circle cx="80" cy="72" r="38" fill="#2ecc71" className="svc-wsh-glow" opacity="0.12" />
      <line x1="80" y1="28" x2="80" y2="16" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" className="svc-wsh-ray" />
      <line x1="80" y1="28" x2="80" y2="16" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" className="svc-wsh-ray" transform="rotate(45 80 72)" />
      <line x1="80" y1="28" x2="80" y2="16" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" className="svc-wsh-ray" transform="rotate(90 80 72)" />
      <line x1="80" y1="28" x2="80" y2="16" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" className="svc-wsh-ray" transform="rotate(135 80 72)" />
      <line x1="80" y1="28" x2="80" y2="16" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" className="svc-wsh-ray" transform="rotate(180 80 72)" />
      <line x1="80" y1="28" x2="80" y2="16" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" className="svc-wsh-ray" transform="rotate(225 80 72)" />
      <line x1="80" y1="28" x2="80" y2="16" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" className="svc-wsh-ray" transform="rotate(270 80 72)" />
      <line x1="80" y1="28" x2="80" y2="16" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" className="svc-wsh-ray" transform="rotate(315 80 72)" />
      <circle cx="80" cy="72" r="26" fill="none" stroke="#2ecc71" strokeWidth="2.5" />
      <path d="M63,90 Q63,100 80,100 Q97,100 97,90" fill="none" stroke="#2ecc71" strokeWidth="2.5" />
      <line x1="66" y1="103" x2="94" y2="103" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="109" x2="90" y2="109" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M72,84 L77,72 L82,80 L80,72 L88,84" fill="none" stroke="#2ecc71" strokeWidth="1.5" opacity="0.8" className="svc-wsh-glow" />
      <circle cx="44" cy="52" r="6" fill="none" stroke="#2ecc71" strokeWidth="1.5" className="svc-wsh-i1" opacity="0.65" />
      <circle cx="116" cy="56" r="5" fill="none" stroke="#2ecc71" strokeWidth="1.5" className="svc-wsh-i2" opacity="0.65" />
      <circle cx="46" cy="96" r="4" fill="none" stroke="#2ecc71" strokeWidth="1.5" className="svc-wsh-i3" opacity="0.65" />
    </svg>
  )
}
