import FormRegistrationClient from '@/components/clients/FormRegistrationClient/FormRegistrationClient';
import styles from './page.module.css';

export default function NewClient() {
  return (
    <main className={styles.main}>
      <h2>Cadastrar novo cliente:</h2>
      <section>
        <FormRegistrationClient />
      </section>
    </main>
  );
}
