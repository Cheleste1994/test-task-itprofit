import '../scss/global.scss';
import './phoneMask';
import './validateForm';
import './modal';

window.addEventListener('load', () => {
  const body = document.querySelector('.body') as HTMLElement;
  body.style.opacity = '1';
});
