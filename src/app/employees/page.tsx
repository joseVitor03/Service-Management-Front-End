import Header from '@/components/Header/Header';
import SearchEmployeeData from '@/components/employees/SearchEmployeeData/SearchEmployeeData';
import loadEmployees from '@/utils/employees/loadEmployees';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function Employees() {
  const employees = await loadEmployees();
  if (employees.message) {
    redirect('/');
  }
  return (
    <main className={styles.main}>
      <Header />
      <section>
        <h2>Funcionários:</h2>
        <SearchEmployeeData employees={employees} />
      </section>
    </main>
  );
}
