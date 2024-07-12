'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export default async function loadClientByNameAndPlate({ name, plate }:
{ name: string, plate: string }) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API_URL}/clients/findClient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, plate }),
  });

  const result = data.json();
  return result;
}
