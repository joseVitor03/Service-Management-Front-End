'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { MdCancel } from 'react-icons/md';
import registerItemDB from '@/utils/registers/registerItemDB';
import styles from './BtnRegisterItem.module.css';

export default function BtnRegisterItem() {
  const [register, setRegister] = useState(false);
  const [item, setItem] = useState('');

  const registerItem = async () => {
    const result = await registerItemDB(item);
    if (result.status !== 201) {
      Swal.fire({
        icon: 'error',
        title: result.message,
        timer: 2000,
      });
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
          <button id="registerItem" onClick={registerItem} type="button">Cadastrar Item</button>
        </div>
      )
        : (
          <button
            id="btnRegisterItem"
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
