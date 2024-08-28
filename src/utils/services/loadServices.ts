'use server';

import { Service } from '@/types/Services';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export default async function loadServices(token: string): Promise<Service[]> {
  const responseServiceFalse = await fetch(`${API_URL}/services/paymentStatusFalse`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  const responseServiceTrue = await fetch(`${API_URL}/services/paymentStatusTrue `, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataServiceFalse = await responseServiceFalse.json();
  const dataServiceTrue = await responseServiceTrue.json();

  return [...dataServiceFalse, ...dataServiceTrue];
}
