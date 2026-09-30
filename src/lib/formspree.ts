// Progressive enhancement for forms marked data-formspree: submits via fetch so the
// visitor stays on-site, then redirects to /thank-you/. Without JS the form still
// POSTs to Formspree's own confirmation page.
export function initFormspreeForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-formspree]').forEach((form) => {
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (status) status.textContent = '';
      if (button) button.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
        window.location.href = '/thank-you/';
      } catch {
        if (status) {
          status.textContent =
            'Sorry, we could not send your message. Please try again, or call or WhatsApp us directly.';
        }
        if (button) button.disabled = false;
      }
    });
  });
}
