'use server';

import { Service } from '@/types/Services';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export default async function loadServices(): Promise<Service[]> {
  const token = cookies().get('token-oficina')?.value;
  const responseServiceFalse = await fetch(`${API_URL}/services/paymentStatusFalse`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseServiceTrue = await fetch(`${API_URL}/services/paymentStatusTrue `, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataServiceFalse = await responseServiceFalse.json();
  const dataServiceTrue = await responseServiceTrue.json();
  // console.log(data);

  return [...dataServiceFalse, ...dataServiceTrue];
}
