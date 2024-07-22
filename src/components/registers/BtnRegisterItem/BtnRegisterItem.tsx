'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { MdCancel } from 'react-icons/md';
import registerItemDB from '@/utils/registers/registerItemDB';
import { useRouter } from 'next/navigation';
import styles from './BtnRegisterItem.module.css';

export default function BtnRegisterItem() {
  const [register, setRegister] = useState(false);
  const [item, setItem] = useState('');
  const router = useRouter();
  const registerItem = async () => {
    const result = await registerItemDB(item);
    if (result.message) {
      router.push('/');
    } else {
      setRegister(false);
      Swal.fire({
        icon: 'success',
        title: 'Item cadastrado',
        timer: 2000,
      });
    }
  };
  return (
    <div className={styles.container}>
      { register ? (
        <div className={styles.card}>
          <div className={styles.header}>
            <h3>
              Cadastrar Item:
            </h3>
            <MdCancel onClick={() => setRegister(false)} className={styles.cancel} />
          </div>
          <input
            onChange={(e) => setItem(e.currentTarget.value.toLocaleUpperCase())}
            type="text"
            id="name"
            placeholder="filtro ar"
          />
          <button onClick={registerItem} type="button">Cadastrar Item</button>
        </div>
      )
        : (
          <button
            className={styles.btnItem}
            onClick={() => setRegister(true)}
            type="button"
          >
            Cadastrar Item
          </button>
        )}
    </div>
  );
}
