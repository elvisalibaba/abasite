type IconProps = { size?: number; className?: string };

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true
});

export function ArrowRight({ size = 20, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
}
export function Shield({ size = 28, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M12 3 5 6v5c0 4.6 2.7 8 7 10 4.3-2 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></svg>;
}
export function Database({ size = 28, className }: IconProps) {
  return <svg {...base(size, className)}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>;
}
export function Fingerprint({ size = 28, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M12 11a2 2 0 0 1 2 2c0 3-.5 5.3-1.5 7"/><path d="M8 13a4 4 0 0 1 8 0c0 3-.4 5.7-1.3 8"/><path d="M5.2 16.7A11 11 0 0 0 6 13a6 6 0 0 1 12 0c0 2.2-.2 4.3-.7 6.3"/><path d="M4 12a8 8 0 0 1 15.5-2.8"/><path d="M9.2 17.5c.4-1.4.8-3 .8-4.5"/></svg>;
}
export function Network({ size = 28, className }: IconProps) {
  return <svg {...base(size, className)}><rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/></svg>;
}
export function MapPin({ size = 20, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
}
export function Mail({ size = 20, className }: IconProps) {
  return <svg {...base(size, className)}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
}
export function Phone({ size = 20, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 2.9.7a2 2 0 0 1 1.7 2Z"/></svg>;
}
export function Menu({ size = 24, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
}
