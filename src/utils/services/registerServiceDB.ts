'use server';

import { NewServiceType } from '@/types/Services';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL as string;
export default async function registerServiceDB(service: NewServiceType) {
  const token = cookies().get('token-oficina');
  if (!token) {
    redirect('/');
  }
  const data = await fetch(`${API}/services`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(service),
  });

  return data.status;
}
