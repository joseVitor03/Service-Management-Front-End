'use client';

import { useState } from 'react';
import { Car, Client } from '@/types/Services';
import loadCarsByBrand from '@/utils/clients/loadCarsByBrand';
import { IoRefreshCircleSharp } from 'react-icons/io5';
import registerCarDB from '@/utils/clients/registerCarDB';
import styles from './FormUpdateClient.module.css';
import FormRegistrationCar from '../FormRegistrationCar/FormRegistrationCar';

export default function FormUpdateClient({ client, updateDataClient }:
{ client: Client, updateDataClient: ({ client, event }:
{ client: Client, event: React.FormEvent<HTMLFormElement> }) => Promise<void> }) {
  const INITIAL_STATE = client;
  const REGEXPLATE = /^[a-zA-Z]{3}-[0-9][A-Za-z0-9][0-9]{2}$/g;

  const [form, setForm] = useState<Client>(INITIAL_STATE);
  const [listInitialCars, setInitialCars] = useState<Car[]>([]);
  const [listCars, setListCars] = useState<Car[]>([]);
  const [nameCar, setNameCar] = useState('');
  const [registerCarToogle, setRegisterCarToogle] = useState(false);

  const registerCar = async (formCar: Omit<Car, 'id'>) => {
    await registerCarDB(formCar);
    const result = await loadCarsByBrand(form.car.brand);
    setInitialCars(result);
    setListCars(result);
    setRegisterCarToogle(!registerCarToogle);
  };

  const loadCars = async () => {
    if (form.car.brand !== '') {
      const result = await loadCarsByBrand(form.car.brand);
      setInitialCars(result);
      setListCars(result);
    }
  };

  const refresh = () => {
    setNameCar('');
    setListCars(listInitialCars);
  };
  const filterCar = () => {
    const result = listCars.filter((car) => (car.name.toLocaleLowerCase()
      .includes(nameCar.toLocaleLowerCase())));
    setListCars(result);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(event) => updateDataClient({ client: form, event })} className={styles.form}>
        <h3>Dados:</h3>
        <label htmlFor="name">
          Nome:
          <input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
            type="text"
          />
        </label>
        <select
          onChange={(e) => setForm({ ...form, car: { ...form.car, brand: e.currentTarget.value } })}
          name="cars"
          value={form.car.brand}
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
        <button disabled={form.car.brand === ''} onClick={loadCars} type="button">Buscar carro</button>
        <h4>
          Carro selecionado:
          {' '}
          {form.car.name}
          {' '}
          -
          {' '}
          {form.car.year}
        </h4>
        <label htmlFor="carColor">
          Cor carro:
          <input
            id="carColor"
            value={form.carColor}
            onChange={(e) => setForm({
              ...form,
              carColor: e.currentTarget.value.toLocaleUpperCase(),
            })}
            type="text"
          />
        </label>
        <label htmlFor="plate">
          Placa:
          <input
            id="plate"
            value={form.plate}
            onChange={(e) => setForm({ ...form, plate: e.currentTarget.value.toLocaleUpperCase() })}
            type="text"
          />
        </label>
        <label htmlFor="phone">
          Celular:
          <input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.currentTarget.value })}
            type="text"
          />
        </label>
        <button
          id="btnUpdateClient"
          disabled={client === form || form.name.length < 3
          || !form.phone.match(/^\d{2} \d{5}-\d{4}$/) || form.carColor.length < 4
          || form.car.brand === '' || !form.plate.match(REGEXPLATE)}
          type="submit"
        >
          Atualizar dados
        </button>
      </form>
      <div className={styles.containerCars}>
        <div className={styles.containerFilter}>
          <h3>Filtrar Carros:</h3>
          <label htmlFor="car">
            Nome carro:
            <input
              id="car"
              value={nameCar}
              onChange={(e) => setNameCar(e.currentTarget.value)}
              type="text"
              placeholder="nome carro..."
            />
          </label>
          <button className={styles.btnFilter} onClick={filterCar} type="button">Buscar</button>

          { listInitialCars.length !== 0 && (
          <div className={styles.containerRefreshAndRegisterCar}>
            <h5>
              Não encontrou o carro desejado?
              Cadastre
              <div
                className={styles.btnToogleCar}
                onClick={() => setRegisterCarToogle(true)}
              >
                aqui.
              </div>
            </h5>
          </div>
          )}
          { registerCarToogle && (
          <FormRegistrationCar
            cancel={setRegisterCarToogle}
            registerCar={registerCar}
          />
          )}
        </div>
        {!registerCarToogle && listInitialCars.length > 0
          && (
            <div className={styles.containerRefresh}>
              <IoRefreshCircleSharp title="remover filtragem" className={styles.refresh} onClick={refresh} />
            </div>
          )}
        {!registerCarToogle && (
        <div className={styles.containerCards}>
          { listCars.length > 0 && listCars.map((car) => (
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
        )}
      </div>
    </div>
  );
}
