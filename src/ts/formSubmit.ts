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
  element: HTMLElement,
  dataObject: FormDataObject
): Promise<HTMLElement> {
  const form = document.querySelector('#form__contact') as HTMLFormElement;
  const newElement = element.cloneNode(true) as HTMLElement;

  makeRequest<FormDataObject, ApiResponse>(
    `${BASE_URL}/registration`,
    'POST',
    dataObject
  )
    .then((res) => {
      if (res.data.status === 'success') {
        newElement.innerText = `Успех! ${res.data.message}`;
        form?.reset();
      } else {
        newElement.classList.add('form__not-valid');
        newElement.innerText = `Попробуйте снова: ${res.data.message}`;
      }
    })
    .catch((error) => {
      newElement.innerText = `Сервер выключен: ${error}`;
      newElement.classList.add('form__not-valid');
    });

  return newElement;
}
