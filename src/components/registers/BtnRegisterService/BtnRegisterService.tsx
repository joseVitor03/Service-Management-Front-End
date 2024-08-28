'use client';

import { useRouter } from 'next/navigation';
import styles from './BtnRegisterService.module.css';

export default function BtnRegisterService() {
  const router = useRouter();
  return (
    <div>

      <button
        id="btnRegisterService"
        className={styles.btnRegister}
        type="button"
        onClick={() => router.push('/services/newService')}
      >
        Cadastrar Serviço
      </button>
    </div>
  );
}
