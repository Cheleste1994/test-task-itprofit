function modalMenu() {
  const burgerIcon = document.querySelector('.burger__icon');
  const burgerOverlay = document.querySelector('.burger__overlay');

  burgerIcon?.addEventListener('click', () => {
    const burgerMenu = document.querySelector('.burger');
    burgerMenu?.classList.toggle('burger__open');
  });

  burgerOverlay?.addEventListener('click', () => {
    const burgerMenu = document.querySelector('.burger');
    burgerMenu?.classList.toggle('burger__open');
  });
}

modalMenu();
