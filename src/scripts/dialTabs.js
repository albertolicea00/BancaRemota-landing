// dial.astro's mobile bottom tab bar — switches which bank's column is shown.
// The active/inactive visual state of each BankCard "tab" variant is driven
// purely by CSS off the `data-active` attribute this sets (see BankCard.astro
// and the [data-bank-tab] rules in site.css) — no inline-style computation here.
export function initDialTabs() {
  const tabButtons = Array.from(document.querySelectorAll('[data-bank-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-bank-panel]'));
  if (tabButtons.length === 0) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const bankId = btn.dataset.bankTab;
      tabButtons.forEach((b) => b.setAttribute('data-active', b.dataset.bankTab === bankId ? 'true' : 'false'));
      panels.forEach((p) => p.classList.toggle('hidden', p.dataset.bankPanel !== bankId));
    });
  });
}
