import FormRegistrationClient from '@/components/clients/FormRegistrationClient/FormRegistrationClient';
import Header from '@/components/Header/Header';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import styles from './page.module.css';

export default function NewClient() {
  const token = cookies().get('token-oficina');
  if (!token) {
    redirect('/');
  }
  return (
    <main className={styles.main}>
      <Header />
      <section>
        <FormRegistrationClient />
      </section>
    </main>
  );
}
