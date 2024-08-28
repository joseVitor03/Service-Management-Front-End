'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export default async function loadServicesByClient(id: string) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API_URL}/services/client/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await data.json();
  const dataCLient = await fetch(`${API_URL}/clients/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultClient = await dataCLient.json();

  return { services: result, dataClient: resultClient };
}
