import FormRegistrationClient from '@/components/clients/FormRegistrationClient/FormRegistrationClient';
import Header from '@/components/Header/Header';
import styles from './page.module.css';

export default function NewClient() {
  return (
    <main className={styles.main}>
      <Header />
      <h2>Cadastrar novo cliente:</h2>
      <section>
        <FormRegistrationClient />
      </section>
    </main>
  );
}
