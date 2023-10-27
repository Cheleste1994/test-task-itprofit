const MIN_LENGTH_NAME = 3;

const validateForm = () => {
  const form = document.querySelector('#form__contact');
  const nameInput = form?.querySelector('#name');
  const emailInput = form?.querySelector('#email');

  nameInput?.addEventListener('blur', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.value.length > MIN_LENGTH_NAME) {
      target.classList.remove('not__valid')
    } else {
      target.classList.add('not__valid')
    }
  });

  emailInput?.addEventListener('blur', (event) => {
    const target = event.target as HTMLInputElement;
    const isValid = /^[^\s]+@[^\s]+\.[^\s]+$/.test(target.value)

    if (isValid) {
      target.classList.remove('not__valid')
    } else {
      target.classList.add('not__valid')
    }
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const isValid = !target.querySelector('.not__valid');

    form.querySelector('.form__valid')?.remove();

    if (!isValid) {
      const span = document.createElement('span')
      span.classList.add('form__valid');
      span.innerText = `
      1. поле name должно содержать не менее ${MIN_LENGTH_NAME} символов;
      2. поле email должно содержать корректный адрес электронной почты;
      `
      form.appendChild(span);
      return;
    }

    const formData = new FormData(target);
    const formDataObject = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    if (Object.values(formDataObject).includes('')) {
      const span = document.createElement('span')
      span.classList.add('form__valid');
      span.innerText = `
      Все поля обязательны к заполнению.
      `
      form.appendChild(span);
      return;
    }

    console.log(formDataObject)
  });
};

validateForm();
