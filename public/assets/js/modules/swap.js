// assets/js/modules/swap.js
export function initSwapButton({ buttonId = 'swapCities', fromId = 'from', toId = 'to' } = {}) {
  const btn  = document.getElementById(buttonId);
  const from = document.getElementById(fromId);
  const to   = document.getElementById(toId);
  if (!btn || !from || !to) return;

  if (btn.dataset.swapBound === '1') return;
  btn.dataset.swapBound = '1';

  btn.addEventListener('click', () => {
    [from.value, to.value] = [to.value, from.value];
    from.focus();
  });
}
