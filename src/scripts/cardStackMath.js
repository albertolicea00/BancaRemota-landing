// Pure math for the draggable card-stack carousel — no DOM access, so it can be
// imported both server-side (Astro frontmatter, to compute a flash-free initial
// inline style) and client-side (cardStack.js, to recompute on drag/cycle).
// Ported 1:1 from the original app.js `cardStack()` Alpine factory.

export const FAN_POS = [
  { r: 0, x: 0, y: 0, z: 50 },
  { r: -7, x: -22, y: 4, z: 40 },
  { r: 7, x: 22, y: 4, z: 30 },
  { r: -13, x: -40, y: 8, z: 20 },
  { r: 13, x: 40, y: 8, z: 10 },
];

// i: position in the current front-to-back order (0 = front/top card)
// state: { dragging, dragX, dragY, flying, flyDir }
// scale: fan-offset scale factor (0.55 for compact stacks, 1 for the hero stack)
export function computeStyle(i, state, scale) {
  if (i === 0) {
    if (state.dragging) {
      const rot = state.dragX * 0.07;
      return {
        transform: `translate(${state.dragX}px,${state.dragY * 0.35}px) rotate(${rot}deg)`,
        zIndex: 50,
        transition: 'none',
      };
    }
    if (state.flying) {
      return {
        transform: `translate(${state.flyDir * 520}px,60px) rotate(${state.flyDir * 28}deg)`,
        zIndex: 50,
        transition: 'transform 0.35s ease, opacity 0.3s ease',
        opacity: 0,
      };
    }
    return {
      transform: 'rotate(0deg) translate(0,0)',
      zIndex: 50,
      transition: 'transform 0.45s cubic-bezier(0.34,1.4,0.64,1)',
      opacity: 1,
    };
  }
  // While flying, pre-animate each card one step forward so they're already
  // in position when the order reshuffles — no visual jump.
  const targetIdx = state.flying ? i - 1 : i;
  const p = FAN_POS[targetIdx] ?? FAN_POS[FAN_POS.length - 1];
  const z = (FAN_POS[i] ?? FAN_POS[FAN_POS.length - 1]).z;
  return {
    transform: `rotate(${p.r}deg) translate(${p.x * scale}px,${p.y * scale}px)`,
    zIndex: z,
    transition: 'transform 0.35s ease',
    opacity: 1,
  };
}
