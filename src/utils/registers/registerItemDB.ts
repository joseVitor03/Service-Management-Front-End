'use server';

import { cookies } from 'next/headers';

const API = process.env.NEXT_PUBLIC_API_URL as string;
export default async function registerItemDB(item: string) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API}/itens`, {
    method: 'POST',
    body: JSON.stringify({ name: item }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Beader ${token}`,
    },
  });
  const result = await data.json();
  return { status: data.status, message: result.message };
}
