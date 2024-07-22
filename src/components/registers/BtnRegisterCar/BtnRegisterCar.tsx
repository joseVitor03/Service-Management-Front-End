'use client';

import FormRegistrationCar from '@/components/clients/FormRegistrationCar/FormRegistrationCar';
import { Car } from '@/types/Services';
import registerCarDB from '@/utils/clients/registerCarDB';
import { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './BtnRegisterCar.module.css';

export default function BtnRegisterCar() {
  const [register, setRegister] = useState(false);

  const registerCar = async (formCar: Omit<Car, 'id'>) => {
    await registerCarDB(formCar);
    setRegister(false);
    Swal.fire({
      icon: 'success',
      title: 'Carro cadastrado',
      timer: 2000,
    });
  };
  return (
    <div className={styles.card}>
      { register
        ? (
          <div className={styles.containerForm}>
            <FormRegistrationCar cancel={setRegister} registerCar={registerCar} />
          </div>
        )
        : (
          <button
            onClick={() => setRegister(true)}
            type="button"
            className={styles.btnRegister}
          >
            Cadastrar carro
          </button>
        )}
    </div>
  );
}
