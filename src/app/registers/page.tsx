import Header from '@/components/Header/Header';
import BtnRegisterCar from '@/components/registers/BtnRegisterCar/BtnRegisterCar';
import BtnRegisterItem from '@/components/registers/BtnRegisterItem/BtnRegisterItem';
import BtnRegisterClient from '@/components/registers/BtnRegisterClient/BtnRegisterClient';
import BtnRegisterService from '@/components/registers/BtnRegisterService/BtnRegisterService';
import styles from './page.module.css';

export default function Registers() {
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
