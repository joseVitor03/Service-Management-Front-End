'use server';

import { Car } from '@/types/Services';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export default async function registerCarDB(car: Omit<Car, 'id'>) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API_URL}/cars`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Define o cabeçalho Content-Type
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(car),
  });
  if (data.status !== 201) {
    redirect('/');
  }
  const result = await data.json();
  return result;
}
