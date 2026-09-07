// Vanilla-JS drag physics for the fanned card-stack carousel — a reusable
// instantiator, one independent instance per `.card-stack` element on the page
// (the hero carousel plus one per feature-panel mockup, ~10 instances total).
import { computeStyle } from './cardStackMath.js';

const FRONT_SHADOW = ['shadow-2xl'];
const BACK_SHADOW = ['shadow-lg', 'shadow-black/20'];
const FRONT_SHADOW_COMPACT = ['shadow-2xl', 'shadow-black/40'];
const BACK_SHADOW_COMPACT = ['shadow-md', 'shadow-black/10'];

export function initCardStack(container, { compact = false } = {}) {
  const scale = compact ? 0.55 : 1;
  const frontShadow = compact ? FRONT_SHADOW_COMPACT : [...FRONT_SHADOW, 'shadow-black/50'];
  const backShadow = compact ? BACK_SHADOW_COMPACT : BACK_SHADOW;

  let cardEls = Array.from(container.querySelectorAll(':scope > .card-face'));
  if (cardEls.length === 0) return;

  const state = { dragging: false, dragX: 0, dragY: 0, startX: 0, startY: 0, flying: false, flyDir: 1, snapInstant: false };

  function applyStyle(el, i) {
    const s = computeStyle(i, state, scale);
    el.style.transform = s.transform;
    el.style.zIndex = String(s.zIndex);
    el.style.transition = s.transition;
    el.style.opacity = s.opacity === undefined ? '' : String(s.opacity);
  }

  function updateFrontBackState() {
    cardEls.forEach((el, i) => {
      const isFront = i === 0;
      el.classList.toggle('pointer-events-none', !isFront);
      [...FRONT_SHADOW_COMPACT, ...FRONT_SHADOW, 'shadow-black/50', ...BACK_SHADOW, ...BACK_SHADOW_COMPACT].forEach((cls) =>
        el.classList.remove(cls)
      );
      (isFront ? frontShadow : backShadow).forEach((cls) => el.classList.add(cls));
    });
  }

  function render() {
    cardEls.forEach((el, i) => applyStyle(el, i));
  }

  function onPointerDown(e) {
    if (state.flying) return;
    state.dragging = true;
    state.startX = e.clientX;
    state.startY = e.clientY;
    state.dragX = 0;
    state.dragY = 0;
    try {
      container.setPointerCapture(e.pointerId);
    } catch {
      /* pointer capture is best-effort */
    }
    render();
  }

  function onPointerMove(e) {
    if (!state.dragging) return;
    state.dragX = e.clientX - state.startX;
    state.dragY = e.clientY - state.startY;
    render();
  }

  function onPointerUp() {
    if (!state.dragging) return;
    state.dragging = false;
    if (Math.abs(state.dragX) > 75) {
      state.flyDir = state.dragX > 0 ? 1 : -1;
      state.flying = true;
      render();
      setTimeout(() => {
        cardEls.push(cardEls.shift());
        state.dragX = 0;
        state.dragY = 0;
        state.flying = false;
        updateFrontBackState();
        render();
      }, 360);
    } else {
      state.dragX = 0;
      state.dragY = 0;
      state.snapInstant = true;
      render();
      // Re-arm the eased transition for the next legitimate use of the rest
      // state (e.g. a card settling into front position after a swipe).
      requestAnimationFrame(() => {
        state.snapInstant = false;
      });
    }
  }

  container.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  updateFrontBackState();
  render();
}

export function initAllCardStacks(root = document) {
  root.querySelectorAll('.card-stack:not([data-initialized])').forEach((el) => {
    el.setAttribute('data-initialized', 'true');
    initCardStack(el, { compact: el.getAttribute('data-compact') === 'true' });
  });
}
