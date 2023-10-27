import Inputmask from 'inputmask';

const phoneMask = () => {
  const phoneInput = document.querySelector('#phone') as HTMLElement;
  const mask = new Inputmask('+999 (99) 999-99-99');
  mask.mask(phoneInput);
};

phoneMask();
