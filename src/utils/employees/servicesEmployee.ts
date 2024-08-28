'use server';

import { cookies } from 'next/headers';

const API = process.env.NEXT_PUBLIC_API_URL as string;

export default async function servicesEmployees({ id, dateInitial, dateFinal }: {
  id: number, dateInitial: string, dateFinal: string
}) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API}/employee/${id}/services`, {
    method: 'POST',
    body: JSON.stringify({ dateFinal, dateInitial }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await data.json();

  return result;
}
