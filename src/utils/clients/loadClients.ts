'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export default async function loadCLients() {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API_URL}/clients`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await data.json();
  return result;
}
