'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export default async function login({ email, password }: { email:string, password: string }) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Define o cabeçalho Content-Type
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  return data;
}
