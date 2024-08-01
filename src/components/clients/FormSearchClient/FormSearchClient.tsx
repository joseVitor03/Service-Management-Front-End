'use client';

import { ClientContext } from '@/app/context/ClientsContext';
import { FormEvent, use, useState } from 'react';
import { IoRefreshCircleSharp } from 'react-icons/io5';
import styles from './FormSearchClient.module.css';

const INITIAL_FORM = {
  name: '',
  car: '',
  plate: '',
  year: '',
};

type FormType = {
  name: string,
  plate: string
  car: string,
  year: string
};
export default function FormSearchClient() {
  const { clients, setClients, refreshClients } = use(ClientContext);
  const [form, setForm] = useState<FormType>(INITIAL_FORM);
  const filterClients = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('a');

    const result = clients.filter((client) => (client.name.toLocaleUpperCase()
      .includes(form.name.toLocaleUpperCase())
       && client.car.name.toLocaleLowerCase().includes(form.car)
      && client.plate.toLocaleUpperCase().includes(form.plate.toLocaleUpperCase())
    && client.car.year.toString().includes(form.year)));

    setClients(result);
  };

  return (
    <form className={styles.form} onSubmit={(event) => filterClients(event)}>
      <div className={styles.inline}>
        <label htmlFor="name">
          Nome:
          <input
            id="name"
            placeholder="maria"
            value={form.name}
            type="text"
            onChange={(event) => setForm({ ...form, name: event.currentTarget.value })}
          />
        </label>
        <IoRefreshCircleSharp title="remover filtragem" className={styles.refresh} onClick={refreshClients} />
      </div>
      <label htmlFor="car">
        Carro:
        <input
          id="car"
          placeholder="cruze"
          type="text"
          onChange={(event) => setForm({ ...form, car: event.currentTarget.value })}
          value={form.car}
        />
      </label>
      <label htmlFor="plate">
        Placa:
        <input
          id="plate"
          type="text"
          placeholder="ABC-1D23"
          onChange={(event) => setForm({ ...form, plate: event.currentTarget.value })}
        />
      </label>
      <label htmlFor="year">
        Ano carro:
        <input
          id="year"
          placeholder="2010"
          type="text"
          onChange={(event) => setForm({ ...form, year: event.currentTarget.value })}
          value={form.year}
        />
      </label>
      <button title="filtrar" type="submit">Buscar</button>
    </form>
  );
}
