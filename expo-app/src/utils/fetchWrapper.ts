type Props = {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  body?: Record<string, unknown>;
  endpoint: string;
};

export const fetchWrapper = async <TData>({
  method = 'GET',
  body,
  endpoint,
}: Props): Promise<TData> => {
  try {
    const API_URL = process.env.APP_API_URL;
    const X_API_KEY = process.env.API_KEY;

    if (!API_URL) {
      throw new Error('API URL is missing');
    }
    if (!X_API_KEY) {
      throw new Error('API KEY is missing');
    }

    const response = await fetch(`${API_URL}${endpoint ?? ''}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': X_API_KEY,
      },
      ...(method !== 'GET' && body && {body: JSON.stringify(body)}),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json() as Promise<TData>;
  } catch (error) {
    console.error('Error fetching data at endpoint:', endpoint, error);
    throw new Error(error);
  }
};
