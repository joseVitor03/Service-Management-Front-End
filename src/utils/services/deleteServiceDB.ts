'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL as string;
export default async function deleteServiceDB(id: number) {
  const token = cookies().get('token-oficina');
  if (!token) {
    redirect('/');
  }
  const data = await fetch(`${API}/services/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    method: 'DELETE',
  });
  return data.status;
}
