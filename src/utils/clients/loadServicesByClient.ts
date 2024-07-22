'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
  if (data.status === 401 || data.status === 403
    || dataCLient.status === 401 || dataCLient.status === 403) {
    redirect('/');
  }
  const resultClient = await dataCLient.json();
  console.log({ dataCLient, result });

  return { services: result, dataClient: resultClient };
}
