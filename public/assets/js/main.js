// assets/js/main.js
import { initSwapButton } from './modules/swap.js';
import { initHowSwitch } from './modules/how-it-works.js';
import { initBootstrapValidation } from './modules/bootstrapValidation.js';
import { initProfilePage } from './modules/profile.js';

document.documentElement.classList.add('js');

window.addEventListener('DOMContentLoaded', () => {

  if (typeof initSwapButton === 'function') {
    initSwapButton({ buttonId: 'swapCities', fromId: 'from', toId: 'to' });
  }
  
  if (typeof initHowSwitch === 'function') initHowSwitch();

  if (typeof initBootstrapValidation === 'function') initBootstrapValidation();

  if (typeof initProfilePage === 'function') initProfilePage();
});




