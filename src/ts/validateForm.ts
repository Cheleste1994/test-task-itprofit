import formSubmit, { FormDataObject } from './formSubmit';

const RULES_MIN_LENGTH_NAME = 3;
const RULES_NAME_VALIDATION = `Поле name должно содержать не менее ${RULES_MIN_LENGTH_NAME} символов`;
const RULES_EMAIL_VALIDATION = `Поле email должно содержать корректный адрес электронной почты`;

const validateForm = () => {
  const form = document.querySelector('#form__contact');
  const nameInput = form?.querySelector('#name');
  const emailInput = form?.querySelector('#email');

  nameInput?.addEventListener('blur', (event) => {
    const target = event.target as HTMLInputElement;
    const labelName = form?.querySelector(
      'label[for="name"]'
    ) as HTMLLabelElement;
    const isNameValid = target.value.length > RULES_MIN_LENGTH_NAME;
    const elementP = labelName.querySelector('.message__isValid');

    target.classList.toggle('not__valid', !isNameValid);
    labelName.classList.toggle('not__valid', !isNameValid);

    if (!isNameValid && elementP) {
      elementP.innerHTML = RULES_NAME_VALIDATION;
    }
  });

  emailInput?.addEventListener('blur', (event) => {
    const target = event.target as HTMLInputElement;
    const isValid = /^[^\s]+@[^\s]+\.[^\s]+$/.test(target.value);
    const labelEmail = form?.querySelector(
      'label[for="email"]'
    ) as HTMLLabelElement;
    const elementP = labelEmail.querySelector('.message__isValid');

    target.classList.toggle('not__valid', !isValid);
    labelEmail.classList.toggle('not__valid', !isValid);

    if (!isValid && elementP) {
      elementP.innerHTML = RULES_EMAIL_VALIDATION;
    }
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const span = document.querySelector('.form__response') as HTMLSpanElement;
    span.innerText = '';
    form.querySelector('.form__valid')?.remove();

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
      return;
    }

    await formSubmit(span, formDataObject);
  });
};

validateForm();
