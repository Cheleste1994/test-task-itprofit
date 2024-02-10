import makeRequest from './makeRequest';

export interface FormDataObject {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiResponse {
  message: string;
  status: 'success' | 'error';
}

const BASE_URL = 'http://localhost:9090/api';

export default async function formSubmit(
  element: HTMLSpanElement,
  dataObject: FormDataObject
): Promise<HTMLSpanElement> {
  const form = document.querySelector('#form__contact') as HTMLFormElement;
  element.classList.remove('form__response_error');

  makeRequest<FormDataObject, ApiResponse>(
    `${BASE_URL}/registration`,
    'POST',
    dataObject
  )
    .then((res) => {
      if (res.data.status === 'success') {
        element.innerText = `Успех! ${res.data.message}`;
        form?.reset();
      } else {
        element.classList.add('form__response_error');
        element.innerText = `Попробуйте снова: ${res.data.message}`;
      }
    })
    .catch((error) => {
      element.innerText = `Сервер выключен: ${error}`;
      element.classList.add('form__response_error');
    });

  return element;
}
