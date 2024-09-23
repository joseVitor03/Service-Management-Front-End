'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import registerEmployee from '@/utils/employees/registerEmployee';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import styles from './ModalAddEmployee.module.css';

export default function ModalAddEmployee({ setModalAddEmployee }: {
  setModalAddEmployee: Dispatch<SetStateAction<boolean>>
}) {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await registerEmployee(name);
    if (result.message) {
      router.push('/');
    } else {
      Swal.fire({
        icon: 'success',
        timer: 2000,
        title: 'Funcionário cadastrado.',
        showConfirmButton: false,
      });
    }
    setModalAddEmployee(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header>
          <MdCancel onClick={() => setModalAddEmployee(false)} className={styles.cancel} />
        </header>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          <h3>Cadastrar</h3>
          <label htmlFor="name">
            Nome:
            <input
              value={name}
              onChange={(e) => setName(e.currentTarget.value.toLocaleUpperCase())}
              type="text"
              id="name"
            />
          </label>
          <button disabled={name.length < 3} type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
