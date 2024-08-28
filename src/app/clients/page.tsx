import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import loadCLients from '@/utils/clients/loadClients';
import TableValueClients from '@/components/clients/TableValueClients/TableValueClients';
import FormSearchClient from '@/components/clients/FormSearchClient/FormSearchClient';
import IconAddClient from '@/components/clients/IconAddClient/IconAddClient';
import Header from '@/components/Header/Header';
import styles from './page.module.css';

export default async function Clients() {
  const token = cookies().get('token-oficina');
  if (!token) {
    redirect('/');
  }
  const clients = await loadCLients();

  return (
    <main className={styles.page}>
      <Header />
      <section className={styles.containerForm}>
        <FormSearchClient />
      </section>
      <section className={styles.containerTable}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.client}>Nome</th>
              <th>Carro</th>
              <th>Cor do Veículo</th>
              <th>Ano</th>
              <th>Placa</th>
            </tr>
          </thead>
          <TableValueClients data={clients} />
        </table>
      </section>
      <div className={styles.containerIcon}>
        <IconAddClient />
      </div>
    </main>
  );
}
