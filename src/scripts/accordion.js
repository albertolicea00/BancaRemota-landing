// Single-open accordion (manual de usuario steps, FAQ items) — ports Alpine's
// `x-data="{ open: null }"` + `open === i ? null : i` pattern: clicking an open
// item's header closes it, clicking a closed one opens it and closes any sibling.
export function initAccordion(container) {
  const items = Array.from(container.querySelectorAll(':scope > [data-accordion-item]'));
  const activeClasses = (container.getAttribute('data-accordion-active-class') || 'ring-2 ring-gold').split(' ');

  items.forEach((item) => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    const body = item.querySelector('[data-accordion-body]');
    const chevron = item.querySelector('[data-accordion-chevron]');

    trigger.addEventListener('click', () => {
      const isOpen = !body.classList.contains('hidden');

      items.forEach((other) => {
        const otherBody = other.querySelector('[data-accordion-body]');
        const otherChevron = other.querySelector('[data-accordion-chevron]');
        otherBody.classList.add('hidden');
        otherChevron?.classList.remove('rotate-180');
        activeClasses.forEach((cls) => other.classList.remove(cls));
      });

      if (!isOpen) {
        body.classList.remove('hidden');
        chevron?.classList.add('rotate-180');
        activeClasses.forEach((cls) => item.classList.add(cls));
      }
    });
  });
}

export function initAllAccordions(root = document) {
  root.querySelectorAll('[data-accordion]').forEach((el) => initAccordion(el));
}
