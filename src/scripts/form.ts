/**
 * Enquiry form: accessible client-side validation and submission to Web3Forms.
 *
 * Markup contract (see EnquiryForm.astro):
 *   form[data-enquiry-form]
 *     fields with an id, a data-label ("your name") and a sibling #<id>-error element
 *     select[name="topic"]                preselected from ?topic= when present
 *     button[type="submit"][data-submit]  contains [data-submit-label]
 *     [data-form-status]                  polite live region for errors
 *   [data-form-success]                   hidden until a successful submission
 */

const ENDPOINT = 'https://api.web3forms.com/submit';

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const isField = (el: Element): el is Field =>
  el instanceof HTMLInputElement ||
  el instanceof HTMLTextAreaElement ||
  el instanceof HTMLSelectElement;

function messageFor(field: Field): string {
  const v = field.validity;
  if (v.valid) return '';
  const label = field.dataset.label ?? 'this field';
  if (v.valueMissing) {
    return field instanceof HTMLSelectElement
      ? `Please choose ${label}.`
      : `Please enter ${label}.`;
  }
  if (v.typeMismatch && field.type === 'email') {
    return 'Please enter a valid email address, for example name@company.co.za.';
  }
  if (v.patternMismatch && field.type === 'tel') {
    return 'Please enter a valid phone number, for example 081 049 8443.';
  }
  if (v.tooShort && 'minLength' in field) {
    return `Please enter at least ${field.minLength} characters.`;
  }
  return field.validationMessage;
}

function setError(field: Field, message: string): void {
  const error = document.getElementById(`${field.id}-error`);
  if (error) error.textContent = message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
}

function initForm(form: HTMLFormElement, signal: AbortSignal): void {
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const success = document.querySelector<HTMLElement>('[data-form-success]');
  const fields = () =>
    Array.from(form.elements)
      .filter(isField)
      .filter((f) => f.willValidate);
  const idleLabel = submitLabel?.textContent ?? 'Send enquiry';
  let attempted = false;

  // Preselect the topic when arriving from a service page (/contact?topic=iv-lounge).
  const topicSelect = form.querySelector<HTMLSelectElement>('select[name="topic"]');
  const requestedTopic = new URLSearchParams(window.location.search).get('topic');
  if (topicSelect && requestedTopic) {
    const match = Array.from(topicSelect.options).some((o) => o.value === requestedTopic);
    if (match) topicSelect.value = requestedTopic;
  }

  // After the first submit attempt, re-validate as the user corrects fields.
  form.addEventListener(
    'input',
    (event) => {
      const target = event.target as Element;
      if (!attempted || !isField(target)) return;
      setError(target, messageFor(target));
    },
    { signal },
  );
  form.addEventListener(
    'focusout',
    (event) => {
      const target = event.target as Element;
      if (!isField(target) || !target.value) return;
      setError(target, messageFor(target));
    },
    { signal },
  );

  const setBusy = (busy: boolean) => {
    if (!submit) return;
    submit.disabled = busy;
    submit.setAttribute('aria-busy', String(busy));
    if (submitLabel) submitLabel.textContent = busy ? 'Sending…' : idleLabel;
  };

  const setStatus = (message: string) => {
    if (status) status.textContent = message;
  };

  form.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();
      attempted = true;
      setStatus('');

      let firstInvalid: Field | undefined;
      for (const field of fields()) {
        const message = messageFor(field);
        setError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      }
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const data = new FormData(form);
      const topicLabel = topicSelect?.selectedOptions[0]?.text ?? 'General enquiry';
      data.set('topic', topicLabel);
      data.set('subject', `Website enquiry: ${topicLabel}`);

      setBusy(true);
      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
        const result = (await response.json().catch(() => ({}))) as { success?: boolean };
        if (!response.ok || !result.success) throw new Error('Submission failed');

        form.reset();
        attempted = false;
        if (success) {
          form.hidden = true;
          success.hidden = false;
          success.focus();
        } else {
          setStatus('Thank you. Your enquiry has been sent.');
        }
      } catch {
        setStatus(
          'Sorry, your enquiry could not be sent. Please try again, or contact us by phone, WhatsApp or email.',
        );
      } finally {
        setBusy(false);
      }
    },
    { signal },
  );
}

let controller: AbortController | undefined;

export function initForms(): void {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;
  document
    .querySelectorAll<HTMLFormElement>('form[data-enquiry-form]')
    .forEach((form) => initForm(form, signal));
}
