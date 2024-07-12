'use client';

import { Oval } from 'react-loader-spinner';
import styles from './page.module.css';

export default function Loading() {
  return (
    <main className={styles.loading}>
      <Oval
        visible
        height="80"
        width="80"
        color="#e23314"
        secondaryColor="#d35f4a"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </main>
  );
}
