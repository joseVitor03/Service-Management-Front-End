'use server';

import { cookies } from 'next/headers';

const API = process.env.NEXT_PUBLIC_API_URL as string;
export default async function registerEmployee(name: string) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API}/employees`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  const result = await data.json();

  return result;
}
