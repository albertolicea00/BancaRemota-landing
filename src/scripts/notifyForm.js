// Notify-me email form (posts to /api/subscribe). Ports Alpine's `notifyForm()`
// factory 1:1 — same three states (idle / loading / sent) and the same error
// copy — just driven by real event listeners instead of `x-model`/`x-show`.
// Instantiated independently per `[data-notify-form]` on the page (the inline
// community-section form and the modal form each get their own instance/state).
export function initNotifyForm(container) {
  const form = container.querySelector('form');
  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');
  const idleEl = button.querySelector('[data-state="idle"]');
  const loadingEl = button.querySelector('[data-state="loading"]');
  const sentEl = button.querySelector('[data-state="sent"]');
  const errorEl = container.querySelector('[data-notify-error]');
  const successEl = container.querySelector('[data-notify-success]');

  let sent = false;

  function setButtonState(state) {
    idleEl.classList.toggle('hidden', state !== 'idle');
    loadingEl.classList.toggle('hidden', state !== 'loading');
    sentEl.classList.toggle('hidden', state !== 'sent');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!input.value || sent) return;

    input.disabled = true;
    button.disabled = true;
    errorEl.classList.add('hidden');
    setButtonState('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: input.value }),
      });

      if (res.ok) {
        sent = true;
        setButtonState('sent');
        successEl?.classList.remove('hidden');
      } else {
        errorEl.textContent = 'Hubo un error al suscribirte. Inténtalo de nuevo.';
        errorEl.classList.remove('hidden');
        setButtonState('idle');
        input.disabled = false;
        button.disabled = false;
      }
    } catch {
      errorEl.textContent = 'Error de red. Por favor, revisa tu conexión e inténtalo de nuevo.';
      errorEl.classList.remove('hidden');
      setButtonState('idle');
      input.disabled = false;
      button.disabled = false;
    }
  });
}

export function initAllNotifyForms(root = document) {
  root.querySelectorAll('[data-notify-form]').forEach((el) => initNotifyForm(el));
}
