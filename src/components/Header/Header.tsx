'use client';

import { HeaderContext } from '@/app/context/HeaderContext';
import { useContext } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './index.module.css';
import logo from '../../images/2kYwIJSloMyjwys9ZDgl5lBpSKf.svg';

export default function Header() {
  const path = usePathname();
  const { handleClick } = useContext(HeaderContext);

  return (
    <header className={styles.header}>
      <div className={styles.containerImage}>
        <Image className={styles.logo} src={logo} alt="logo" />
      </div>
      <div className={styles.containerBtn}>
        <div
          id="services"
          className={path.includes('services')
            ? styles.btnHeaderActived : styles.btnHeader}
          onClick={(e) => handleClick(e, path)}
        >
          Serviços
        </div>
        <div
          id="clients"
          className={path.includes('clients')
            ? styles.btnHeaderActived : styles.btnHeader}
          onClick={(e) => handleClick(e, path)}
        >
          Clientes
        </div>
        <div
          id="employees"
          className={path.includes('employees')
            ? styles.btnHeaderActived : styles.btnHeader}
          onClick={(e) => handleClick(e, path)}
        >
          Funcionários
        </div>
        <div
          id="registers"
          className={path.includes('registers')
            ? styles.btnHeaderActived : styles.btnHeader}
          onClick={(e) => handleClick(e, path)}
        >
          Área de cadastros

        </div>
      </div>
    </header>
  );
}
