'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export default async function loadCarsByBrand(brand: string) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API_URL}/cars/brand`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Define o cabeçalho Content-Type
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      brand,
    }),
  });

  const result = await data.json();
  if (result.message) {
    redirect('/');
  }
  return result;
}
