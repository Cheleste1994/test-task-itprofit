async function makeRequest<T, K>(
  url: string,
  method: string,
  body?: T
): Promise<{ data: K }> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body !== undefined ? JSON.stringify(body) : null,
  });
  if (response) {
    const data = await response.json();
    return { data };
  }
  throw new Error(`${response}`);
}

export default makeRequest;
