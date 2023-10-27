import formSubmit, { FormDataObject } from './formSubmit';

const MIN_LENGTH_NAME = 3;

const validateForm = () => {
  const form = document.querySelector('#form__contact');
  const nameInput = form?.querySelector('#name');
  const emailInput = form?.querySelector('#email');

  nameInput?.addEventListener('blur', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.value.length > MIN_LENGTH_NAME) {
      target.classList.remove('not__valid');
    } else {
      target.classList.add('not__valid');
    }
  });

  emailInput?.addEventListener('blur', (event) => {
    const target = event.target as HTMLInputElement;
    const isValid = /^[^\s]+@[^\s]+\.[^\s]+$/.test(target.value);

    if (isValid) {
      target.classList.remove('not__valid');
    } else {
      target.classList.add('not__valid');
    }
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const isValid = !target.querySelector('.not__valid');

    form.querySelector('.form__valid')?.remove();
    const span = document.createElement('span');
    span.classList.add('form__valid');

    if (!isValid) {
      span.innerText = `
      1. поле name должно содержать не менее ${MIN_LENGTH_NAME} символов;
      2. поле email должно содержать корректный адрес электронной почты;
      `;
      form.appendChild(span);
      return;
    }

    const formData = new FormData(target);
    const formDataObject: FormDataObject = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    if (Object.values(formDataObject).includes('')) {
      span.innerText = `
      Все поля обязательны к заполнению.
      `;
      form.appendChild(span);
      return;
    }

    formSubmit(span, formDataObject).then((element) =>
      form.appendChild(element)
    );
  });
};

validateForm();
