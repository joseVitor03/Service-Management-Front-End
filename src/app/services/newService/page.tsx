import Header from '@/components/Header/Header';
import SearchClientByNameAndPlate from '@/components/services/SearchClientByNameAndPlate/SearchClientByNameAndPlate';
import ItensService from '@/components/services/ItensService/ItensService';
import ClientData from '@/components/services/ClientData/ClientData';
import EmployeeService from '@/components/services/EmployeeService/EmployeeService';
import BtnRegisterService from '@/components/services/BtnRegisterService/BtnRegisterService';
import PrincipalEmployeeInService from '@/components/services/PrincipalEmployeeInService/PrincipalEmployeeInService';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default function newService() {
  const token = cookies().get('token-oficina');
  if (!token) {
    redirect('/');
  }
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.container}>
        <section className={styles.containerForms}>
          <PrincipalEmployeeInService />
          <SearchClientByNameAndPlate />
          <ItensService />
          <EmployeeService />
        </section>
        <section className={styles.containerDataClient}>
          <ClientData />
          <BtnRegisterService />
        </section>
      </div>
    </main>
  );
}
