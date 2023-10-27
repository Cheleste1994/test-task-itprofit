const validateForm = () => {
  const form = document.querySelector('#form__contact');

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);
  });
};

validateForm();
