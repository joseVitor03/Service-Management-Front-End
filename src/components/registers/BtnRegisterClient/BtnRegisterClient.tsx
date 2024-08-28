'use client';

import { useRouter } from 'next/navigation';
import styles from './BtnRegisterClient.module.css';

export default function BtnRegisterClient() {
  const router = useRouter();
  return (
    <div>
      <button
        id="btnRegisterClient"
        className={styles.btnRegister}
        type="button"
        onClick={() => router.push('/clients/newClient')}
      >
        Cadastrar Cliente
      </button>
    </div>
  );
}
