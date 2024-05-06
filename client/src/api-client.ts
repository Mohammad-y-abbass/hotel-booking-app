import { SignupForm } from './pages/Signup';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signup = async (formData: SignupForm) => {
  const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/validate-token`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Token invalid');
  }
  return response.json();
};
