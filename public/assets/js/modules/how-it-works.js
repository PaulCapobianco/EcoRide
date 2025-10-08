
export function initHowSwitch() {
  document.documentElement.classList.add('js');

  const sections = Array.from(document.querySelectorAll('.how-section'));
  if (!sections.length) return;

  const setActive = (id) => {
    sections.forEach(sec => sec.classList.toggle('is-active', sec.id === id));
   
    history.replaceState(null, '', `#${id}`);
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('.how-switch');
    if (!a) return;
    e.preventDefault();
    const id = a.dataset.target || (a.hash || '').replace('#', '');
    if (id) setActive(id);
  });

  // hash initial (#passager / #conducteur)
  const initial = (location.hash || '').replace('#', '');
  if (initial && sections.some(s => s.id === initial)) {
    setActive(initial);
  }
}
