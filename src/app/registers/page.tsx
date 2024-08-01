import Header from '@/components/Header/Header';
import BtnRegisterCar from '@/components/registers/BtnRegisterCar/BtnRegisterCar';
import BtnRegisterItem from '@/components/registers/BtnRegisterItem/BtnRegisterItem';
import BtnRegisterClient from '@/components/registers/BtnRegisterClient/BtnRegisterClient';
import BtnRegisterService from '@/components/registers/BtnRegisterService/BtnRegisterService';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default function Registers() {
  const token = cookies().get('token-oficina')?.value;
  if (!token) {
    redirect('/');
  }
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.containerBtns}>
        <BtnRegisterCar />
        <BtnRegisterItem />
        <BtnRegisterClient />
        <BtnRegisterService />
      </section>
    </main>
  );
}
