import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import loadServices from '@/utils/services/loadServices';
import BtnAddService from '@/components/services/BtnAddService/BtnAddService';
import Header from '@/components/Header/Header';
import styles from './page.module.css';
import TableValueService from '../../components/services/TableValueService/TableValueService';
import SearchForm from '../../components/services/SearchForm/SearchForm';
import BtnServicePaid from '../../components/services/BtnServicePaid/BtnServicePaid';

export default async function Services() {
  const token = cookies().get('token-oficina');
  if (!token) {
    redirect('/');
  }

  const data = await loadServices();

  return (
    <div className={styles.main}>
      <Header />
      <SearchForm />
      <BtnServicePaid />
      <div className={styles.containerTable}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.client}>Cliente</th>
              <th>Carro</th>
              <th>Cor do Veículo</th>
              <th>Ano</th>
              <th>Placa</th>
              <th>Total</th>
              <th>Serviço Pago</th>
              <th>Data</th>
            </tr>
          </thead>
          { data.length > 0
            ? <TableValueService data={data} />
            : (
              <h4>Nenhum serviço</h4>
            )}
        </table>
      </div>
      <div className={styles.containerAddService}>
        <BtnAddService />
      </div>
    </div>
  );
}
