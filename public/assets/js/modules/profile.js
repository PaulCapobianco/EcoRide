export function initProfilePage() {
  const root = document.querySelector('.page-profile');
  if (!root) return;

  const driverBlocks = root.querySelectorAll('[data-requires="driver"]');
  const radios = root.querySelectorAll('input[name="role"], input[name="role-inline"]');

  const applyRole = (role) => {
    const show = (role === 'driver' || role === 'both');
    driverBlocks.forEach(el => el.toggleAttribute('hidden', !show));
  };

  const checked = root.querySelector('input[name="role"]:checked, input[name="role-inline"]:checked');
  applyRole(checked ? checked.value : 'passenger');

  radios.forEach(r => {
    r.addEventListener('change', () => {
      if (!r.checked) return;
      radios.forEach(rr => { rr.checked = (rr.value === r.value); });
      applyRole(r.value);
    });
  });

  const STORAGE = 'ecoride.prefs';
  let prefs = {};
  try { prefs = JSON.parse(localStorage.getItem(STORAGE) || '{}'); } catch { prefs = {}; }

  const pills = root.querySelectorAll('.pref-pill[data-pref]');
  pills.forEach(pill => {
    const key = pill.dataset.pref;
    const initial = (key in prefs) ? !!prefs[key] : (pill.getAttribute('aria-pressed') === 'true');
    pill.setAttribute('role', 'button');
    pill.setAttribute('tabindex', '0');
    pill.setAttribute('aria-pressed', initial ? 'true' : 'false');
    pill.classList.toggle('is-on', initial);
  });

  const toggle = (pill) => {
    const key = pill.dataset.pref;
    const next = pill.getAttribute('aria-pressed') !== 'true';
    pill.setAttribute('aria-pressed', next ? 'true' : 'false');
    pill.classList.toggle('is-on', next);
    prefs[key] = next;
    localStorage.setItem(STORAGE, JSON.stringify(prefs));
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => toggle(pill));
    pill.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(pill); }
    });
  });
}

