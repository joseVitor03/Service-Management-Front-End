'use server';

import { cookies } from 'next/headers';

const API = process.env.NEXT_PUBLIC_API_URL as string;
export default async function findPiecesDB(name: string) {
  const token = cookies().get('token-oficina')?.value;
  const data = await fetch(`${API}/pieces/findPieces?name=${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await data.json();
  return result;
}
