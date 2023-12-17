const appUrl = import.meta.env.VITE_APP_URL;

let apiUrl = '';

if (appUrl === 'localhost') {
  apiUrl = 'http://localhost:5001';
} else {
  apiUrl = `https://${appUrl}`;
}

const API_URL = apiUrl;

export { API_URL };
