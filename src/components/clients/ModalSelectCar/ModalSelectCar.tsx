import { Client, Car } from '@/types/Services';
import { Dispatch, SetStateAction } from 'react';
import { IoRefreshCircleSharp } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import styles from './ModalSelectCar.module.css';
import FormRegistrationCar from '../FormRegistrationCar/FormRegistrationCar';

type PropType = {
  setNameCar: React.Dispatch<SetStateAction<string>>,
  nameCar: string,
  filterCar: () => void,
  setRegisterCarToogle: Dispatch<SetStateAction<boolean>>,
  registerCarToogle: boolean,
  refresh: () => void,
  registerCar: (formCar: Omit<Car, 'id'>) => Promise<void>,
  listCars: Car[],
  setForm: Dispatch<SetStateAction<Client>>,
  form: Client,
  setModalSelectCarToogle: Dispatch<SetStateAction<boolean>>
};

export default function ModalSelectCar({
  setForm, setNameCar, setRegisterCarToogle, setModalSelectCarToogle,
  nameCar, filterCar, listCars, refresh, registerCar,
  registerCarToogle, form,
}: PropType) {
  const selectCar = (car: Car) => {
    setForm({
      ...form,
      car,
    });
    setModalSelectCarToogle(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.containerCancel}>
        <MdCancel
          className={styles.cancel}
          onClick={() => setModalSelectCarToogle(false)}
        />
      </div>
      <div className={styles.filter}>
        <input
          value={nameCar}
          onChange={(e) => setNameCar(e.currentTarget.value)}
          type="text"
          placeholder="nome carro..."
        />
        <button onClick={filterCar} type="button">Filtrar</button>
      </div>
      <div className={styles.containerRefresh}>
        <IoRefreshCircleSharp
          className={styles.refresh}
          onClick={refresh}
        />
      </div>
      <div className={styles.containerCards}>
        <p>
          Caso não tenha encontrado o carro desejado. Cadastre
          {' '}
          <span onClick={() => setRegisterCarToogle(true)}>aqui</span>
          { registerCarToogle && (
          <FormRegistrationCar
            registerCar={registerCar}
            cancel={setRegisterCarToogle}
          />
          ) }
        </p>
        { listCars.map((car) => (
          <div onClick={() => selectCar(car)} key={car.id} className={styles.card}>
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
  );
}
