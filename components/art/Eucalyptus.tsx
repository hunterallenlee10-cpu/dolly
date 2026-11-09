// Delicate eucalyptus line illustration, drawn from the sprig on Dolly's desk cover photo.
type Leaf = { x: number; y: number; r: number; s: number };

const stemA = "M120 470 C 128 400, 112 330, 132 262 S 150 140, 128 40";
const stemB = "M131 300 C 168 268, 196 236, 214 190";
const stemC = "M126 380 C 96 352, 72 330, 52 292";

const leaves: Leaf[] = [
  { x: 128, y: 44, r: -10, s: 0.7 },
  { x: 138, y: 86, r: 40, s: 0.85 },
  { x: 120, y: 112, r: -48, s: 0.9 },
  { x: 145, y: 150, r: 46, s: 1 },
  { x: 121, y: 184, r: -52, s: 1 },
  { x: 146, y: 222, r: 48, s: 1.1 },
  { x: 122, y: 252, r: -55, s: 1.1 },
  { x: 214, y: 192, r: 20, s: 0.8 },
  { x: 196, y: 226, r: 70, s: 0.95 },
  { x: 176, y: 252, r: -20, s: 0.95 },
  { x: 158, y: 280, r: 60, s: 1 },
  { x: 54, y: 294, r: -30, s: 0.85 },
  { x: 70, y: 330, r: -80, s: 0.95 },
  { x: 84, y: 340, r: 10, s: 0.95 },
  { x: 104, y: 368, r: -70, s: 1 },
  { x: 130, y: 330, r: 55, s: 1.05 },
  { x: 132, y: 418, r: 50, s: 1.1 },
  { x: 116, y: 444, r: -50, s: 1.05 },
];

export default function Eucalyptus({ className = "", stroke = "#8A9A86" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 260 480" className={className} aria-hidden focusable="false" fill="none" stroke={stroke} strokeWidth="1.1" strokeLinecap="round">
      <path d={stemA} />
      <path d={stemB} />
      <path d={stemC} />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
          <ellipse rx="17" ry="12" fill={stroke} fillOpacity=".14" />
          <path d="M-15 0 Q 0 -1.5 15 0" strokeOpacity=".55" />
        </g>
      ))}
    </svg>
  );
}
