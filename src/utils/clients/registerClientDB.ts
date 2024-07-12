'use server';

import { Client } from '@/types/Services';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export default async function registerClientDB(client: Omit<Client, 'id'>) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Define o cabeçalho Content-Type
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: client.name,
      carId: client.car.id,
      plate: client.plate,
      phone: client.phone,
      carColor: client.carColor,
    }),
  });
  const result = await data.json();
  return result;
}
