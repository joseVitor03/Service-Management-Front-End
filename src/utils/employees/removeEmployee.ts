'use server';

import { cookies } from 'next/headers';

const API = process.env.NEXT_PUBLIC_API_URL as string;
export default async function removeEmployee(id: number) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API}/employees/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.status;
}
