// "Avísame cuando esté lista" modal — open/close plumbing. Ports the Alpine
// `notifyOpen` boolean: opened by the hero CTA button, the FAQ answer's inline
// `notify:open` CustomEvent dispatch (kept as-is, it's plain JS already), the
// close (×) button, backdrop click, or Escape.
export function initNotifyModal() {
  const modal = document.querySelector('[data-notify-modal]');
  if (!modal) return;

  const backdrop = modal.querySelector('[data-notify-backdrop]');
  const closeButtons = modal.querySelectorAll('[data-notify-close]');
  const openButtons = document.querySelectorAll('[data-notify-open]');

  function open() {
    modal.classList.remove('hidden');
  }
  function close() {
    modal.classList.add('hidden');
  }

  openButtons.forEach((btn) => btn.addEventListener('click', open));
  closeButtons.forEach((btn) => btn.addEventListener('click', close));
  backdrop?.addEventListener('click', close);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
  window.addEventListener('notify:open', open);
}
