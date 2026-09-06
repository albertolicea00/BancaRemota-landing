// "Funciones principales" feature selector — ports Alpine's `{ feat: 'banking' }`.
// Clicking a button swaps its active styling and shows the matching mockup panel
// (desktop-only right column), hiding the rest.
export function initFeatureTabs(container) {
  const buttons = Array.from(container.querySelectorAll('[data-feat-button]'));
  const panels = Array.from(container.querySelectorAll('[data-feat-panel]'));

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const feat = btn.dataset.featButton;
      buttons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('feat-active', active);
        b.classList.toggle('feat-inactive', !active);
      });
      panels.forEach((p) => {
        p.classList.toggle('hidden', p.dataset.featPanel !== feat);
      });
    });
  });
}
