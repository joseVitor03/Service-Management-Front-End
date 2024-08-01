'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export default async function deleteClientDB(id: number) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API_URL}/clients/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.status;
}
