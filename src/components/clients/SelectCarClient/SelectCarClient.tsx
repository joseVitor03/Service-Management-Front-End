'use client';

import { SetStateAction, Dispatch } from 'react';
import { IoRefreshCircleSharp } from 'react-icons/io5';
import { Car } from '@/types/Services';
import { FormRegistrationClientType } from '@/types/FormLoginType';
import styles from './SelectCarClient.module.css';
import FormRegistrationCar from '../FormRegistrationCar/FormRegistrationCar';

type PropType = {
  setNameCar: React.Dispatch<SetStateAction<string>>,
  nameCar: string,
  filterCar: () => void,
  listInitialCars: Car[],
  setRegisterCarToogle: Dispatch<SetStateAction<boolean>>,
  registerCarToogle: boolean,
  refresh: () => void,
  registerCar: (formCar: Omit<Car, 'id'>) => Promise<void>,
  isLoading: boolean,
  listCars: Car[],
  setForm: Dispatch<SetStateAction<FormRegistrationClientType>>,
  form: FormRegistrationClientType,
  setModalSelectCar: Dispatch<SetStateAction<boolean>>
};
export default function SelectCarClient({
  setNameCar,
  nameCar,
  filterCar,
  listInitialCars,
  setRegisterCarToogle,
  registerCarToogle,
  refresh,
  registerCar,
  isLoading,
  listCars,
  setForm,
  form,
  setModalSelectCar,
}: PropType) {
  const selectedCar = (car: Car) => {
    setForm({
      ...form, car,
    });
    setModalSelectCar(false);
  };
  return (
    <div className={styles.containerSearch}>
      <div className={styles.card}>
        <h3>Filtrar Carros:</h3>
        <input
          value={nameCar}
          onChange={(e) => setNameCar(e.currentTarget.value)}
          type="text"
          placeholder="nome carro..."
        />
        <button className={styles.btnFilter} onClick={filterCar} type="button">Buscar</button>
        <div className={styles.containerCards}>
          { listInitialCars.length !== 0
        && (
        <div className={styles.containerRefreshAndRegisterCar}>
          <h5 className={styles.text}>
            Não encontrou o carro desejado? Cadastre
            <span
              className={styles.btnToogleCar}
              onClick={() => setRegisterCarToogle(!registerCarToogle)}
            >
              {' '}
              aqui.
            </span>
          </h5>
          <IoRefreshCircleSharp className={styles.refresh} onClick={refresh} />
        </div>
        )}
          <div className={styles.containerCardsCar}>
            { registerCarToogle && (
            <FormRegistrationCar
              cancel={setRegisterCarToogle}
              registerCar={registerCar}
            />
            )}
            { isLoading ? <div>Carregando...</div> : listCars.map((car) => (
              <div
                className={styles.cardCar}
                key={car.id}
                onClick={() => selectedCar(car)}
              >
                <p>
                  Nome:
                  {car.name}
                </p>
                <p>
                  Ano:
                  {car.year}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
