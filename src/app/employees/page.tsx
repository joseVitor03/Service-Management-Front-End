import Header from '@/components/Header/Header';
import SearchEmployeeData from '@/components/employees/SearchEmployeeData/SearchEmployeeData';
import loadEmployees from '@/utils/employees/loadEmployees';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import styles from './page.module.css';

export default async function Employees() {
  const token = cookies().get('token-oficina');
  if (!token) {
    redirect('/');
  }
  const employees = await loadEmployees();

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
