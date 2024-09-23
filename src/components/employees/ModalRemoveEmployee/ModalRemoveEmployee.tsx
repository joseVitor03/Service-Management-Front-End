'use client';

import removeEmployee from '@/utils/employees/removeEmployee';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import styles from './ModalRemoveEmployee.module.css';

export default function ModalRemoveEmployee({ employee, setModalRemoveEmployee }:
{ employee: { id: number, name: string },
  setModalRemoveEmployee: React.Dispatch<React.SetStateAction<boolean>> }) {
  const router = useRouter();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { id } = e.currentTarget;
    if (id === 'yes') {
      const result = await removeEmployee(employee.id);
      if (result === 200) {
        Swal.fire({
          icon: 'success',
          timer: 2000,
          title: 'funcionário removido',
          showConfirmButton: false,
        });
      } else {
        router.push('/');
      }
    }
    setModalRemoveEmployee(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>
          Deseja remover o funcioário(a)
          {' '}
          {employee.name}
          ?
        </h3>
        <div className={styles.btns}>
          <button id="no" onClick={(e) => handleSubmit(e)} type="button">Não</button>
          <button id="yes" onClick={(e) => handleSubmit(e)} type="button">Sim</button>
        </div>
      </div>
    </div>
  );
}
