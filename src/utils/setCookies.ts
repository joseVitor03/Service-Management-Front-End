'use server';

import { cookies } from 'next/headers';

export default async function setCokkie(token: string) {
  const cookie = cookies();
  // const oneDayInSeconds = 60 * 60 * 24; // 60 segundos * 60 minutos * 24 horas
  cookie.set('token-oficina', token, { httpOnly: true });
}
