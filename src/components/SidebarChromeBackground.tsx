/** Misma capa visual que el menú lateral (foto + verde). */
export function SidebarChromeBackground() {
  return (
    <>
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-[2px]"
        style={{ backgroundImage: "url(/sidebar-texture.jpg)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[#1b3d2f] mix-blend-color"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1b3d2f]/55 via-[#143023]/65 to-[#0c2218]/80"
        aria-hidden
      />
    </>
  );
}
