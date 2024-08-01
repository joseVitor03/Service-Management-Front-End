import Header from '@/components/Header/Header';
import SearchClientByNameAndPlate from '@/components/services/SearchClientByNameAndPlate/SearchClientByNameAndPlate';
import PieceService from '@/components/services/PieceService/PieceService';
import ClientData from '@/components/services/ClientData/ClientData';
import EmployeeService from '@/components/services/EmployeeService/EmployeeService';
import BtnRegisterService from '@/components/services/BtnRegisterService/BtnRegisterService';
import PrincipalEmployeeInService from '@/components/services/PrincipalEmployeeInService/PrincipalEmployeeInService';
import styles from './page.module.css';

export default function newService() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.container}>
        <section className={styles.containerForms}>
          <PrincipalEmployeeInService />
          <SearchClientByNameAndPlate />
          <PieceService />
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
