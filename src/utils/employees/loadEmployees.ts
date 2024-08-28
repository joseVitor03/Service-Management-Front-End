'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL as string;

export default async function loadEmployees() {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API}/employee`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await data.json();
  if (result.message) {
    redirect('/');
  }

  return result;
}
