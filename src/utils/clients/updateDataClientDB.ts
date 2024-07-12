'use server';

import { Client } from '@/types/Services';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export default async function updateDataClientDB(client:Client) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API_URL}/clients/${client.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: client.name,
      carId: client.car.id,
      phone: client.phone,
      plate: client.plate,
      carColor: client.carColor,
    }),
  });
  if (data.status !== 200) {
    redirect('/');
  }
}
