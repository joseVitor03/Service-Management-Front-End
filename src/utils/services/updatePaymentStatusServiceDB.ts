'use server';

import { cookies } from 'next/headers';

const API = process.env.NEXT_PUBLIC_API_URL as string;
export default async function updatePaymentStatusService({ paymentStatus, id }:
{ paymentStatus: boolean, id: number }): Promise<{ status: number }> {
  const result = await fetch(`${API}/services/${id}`, {
    headers: {
      Authorization: `Beader ${cookies().get('token-oficina')?.value}`,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({
      paymentStatus: !paymentStatus,
    }),
  });
  console.log(result);

  return { status: result.status };
}
