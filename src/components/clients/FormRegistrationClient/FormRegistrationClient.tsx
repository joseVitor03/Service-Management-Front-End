'use client';

import loadCarsByBrand from '@/utils/clients/loadCarsByBrand';
import { useState } from 'react';
import { Car } from '@/types/Services';
import { IoRefreshCircleSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';
import registerClientDB from '@/utils/clients/registerClientDB';
import { useRouter } from 'next/navigation';
import { FormRegistrationClientType } from '@/types/FormLoginType';
import registerCarDB from '@/utils/clients/registerCarDB';
import styles from './formRegistrationClient.module.css';
import FormRegistrationCar from '../FormRegistrationCar/FormRegistrationCar';

const INITIAL_STATE = {
  name: '',
  phone: '',
  plate: '',
  car: {
    id: 0,
    name: '',
    brand: '',
    year: 0,
  },
  carColor: '',
};
const REGEXPLATE = /^[a-zA-Z]{3}-[0-9][A-Za-z0-9][0-9]{2}$/g;
export default function FormRegistrationClient() {
  const router = useRouter();
  const [form, setForm] = useState<FormRegistrationClientType>(INITIAL_STATE);
  const [listCars, setListCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listInitialCars, setInitialCars] = useState([]);
  const [nameCar, setNameCar] = useState('');
  const [registerCarToogle, setRegisterCarToogle] = useState(false);
  const registerClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form === INITIAL_STATE) {
      Swal.fire({
        icon: 'warning',
        title: 'Todos os campos são obrigatórios',
        timer: 3000,
      });
    } else {
      const result = await registerClientDB(form);
      if (result.message) {
        Swal.fire({
          icon: 'error',
          text: result.message,
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'cliente cadastrado',
          timer: 3000,
        });
        router.push('/clients');
      }
    }
  };
  const registerCar = async (formCar: Omit<Car, 'id'>) => {
    await registerCarDB(formCar);
    setIsLoading(true);
    const result = await loadCarsByBrand(form.car.brand);
    setInitialCars(result);
    setListCars(result);
    setIsLoading(false);
    setRegisterCarToogle(!registerCarToogle);
  };
  const filterCar = () => {
    const result = listCars.filter((car) => (car.name.toLocaleLowerCase()
      .includes(nameCar.toLocaleLowerCase())));
    setListCars(result);
  };
  const refresh = () => {
    setNameCar('');
    setListCars(listInitialCars);
  };
  const searchCar = async () => {
    if (form.car.brand.length > 0) {
      setIsLoading(true);
      const result = await loadCarsByBrand(form.car.brand);
      setInitialCars(result);
      setListCars(result);
      setIsLoading(false);
    }
  };
  console.log(form);

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => registerClient(e)}
      >
        <label htmlFor="name">
          Nome cliente:
          <input
            onChange={(event) => setForm({ ...form, name: event.currentTarget.value })}
            type="text"
            id="name"
            placeholder="nome cliente"
          />
        </label>
        <label htmlFor="phone">
          Número de celular:
          <input
            type="tel"
            onChange={(event) => setForm({ ...form, phone: event.currentTarget.value })}
            id="phone"
            placeholder="ex: 61991111234"
          />
        </label>
        {form.phone.length > 0 && !form.phone.match(/^\d{11}$/) && <p>formato inválido</p>}
        <select
          onChange={(event) => setForm({
            ...form,
            car: { ...form.car, brand: event.currentTarget.value },
          })}
          name="cars"
          id="cars"
        >
          <option value="">SELECIONAR</option>
          <option value="VOLKSWAGEN">VOLKSWAGEN</option>
          <option value="CHEVROLET">CHEVROLET</option>
          <option value="FIAT">FIAT</option>
          <option value="FORD">FORD</option>
          <option value="TOYOTA">TOYOTA</option>
          <option value="HYUNDAI">HYUNDAI</option>
          <option value="HONDA">HONDA</option>
          <option value="RENAULT">RENAULT</option>
          <option value="NISSAN">NISSAN</option>
          <option value="JEEP">JEEP</option>
        </select>
        <button onClick={searchCar} disabled={form.car.brand === ''} type="button">Buscar carro</button>
        <h3 className={form.car.id !== 0 ? styles.carSelected
          : styles.carNotSelected}
        >
          Carro selecionado
        </h3>
        { form.car.id !== 0 && (
        <div>
          <p>
            Nome:
            {form.car.name}
          </p>
          <p>
            Ano:
            {form.car.year}
          </p>
        </div>
        )}
        <label htmlFor="plate">
          Placa:
          <input
            type="text"
            value={form.plate}
            placeholder="ABC-1D23"
            onChange={(e) => setForm({ ...form, plate: e.currentTarget.value.toLocaleUpperCase() })}
          />
        </label>
        <label htmlFor="color">
          Cor do carro:
          <input
            onChange={(event) => setForm({
              ...form,
              carColor: event.currentTarget.value.toLocaleUpperCase(),
            })}
            type="text"
            id="color"
            placeholder="azul"
          />
        </label>
        <button
          disabled={form.name.length < 3
          || !form.phone.match(/^\d{2} \d{5}-\d{4}$/) || form.carColor.length < 4 || form.car.id === 0 || form.car.brand === ''
        || !form.plate.match(REGEXPLATE)}
          type="submit"
        >
          Cadastrar
        </button>
      </form>
      <div className={styles.containerSearch}>
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
          <h5>
            Não encontrou o carro desejado?
            Cadastre
            <div
              className={styles.btnToogleCar}
              onClick={() => setRegisterCarToogle(!registerCarToogle)}
            >
              aqui.
            </div>
          </h5>
          <IoRefreshCircleSharp className={styles.refresh} onClick={refresh} />
        </div>
        )}
          { registerCarToogle && <FormRegistrationCar registerCar={registerCar} />}
          { isLoading ? <div>Carregando...</div> : listCars.map((car) => (
            <div
              className={styles.card}
              key={car.id}
              onClick={() => setForm({ ...form, car })}
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
  );
}