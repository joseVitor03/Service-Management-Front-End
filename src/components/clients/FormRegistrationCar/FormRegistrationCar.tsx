'use client';

import { useState, SetStateAction } from 'react';
import { Car } from '@/types/Services';
import { MdCancel } from 'react-icons/md';
import styles from './FormRegistrationCar.module.css';

export default function FormRegistrationCar({ registerCar, cancel }:
{ registerCar: (formCar: Omit<Car, 'id'>) => Promise<void>,
  cancel: React.Dispatch<SetStateAction<boolean>>
}) {
  const date = new Date().getFullYear();
  const [form, setForm] = useState <Omit<Car, 'id'>>({
    name: '',
    brand: '',
    year: 0,
  });
  return (
    <form className={styles.form}>
      <div className={styles.header}>
        <h4>Cadastrar carro:</h4>
        <MdCancel onClick={() => cancel(false)} className={styles.cancel} />
      </div>
      <input
        onChange={(event) => setForm({
          ...form, name: event.currentTarget.value.toLocaleUpperCase(),
        })}
        type="text"
        placeholder="nome carro"
      />
      <input placeholder="ano carro" onChange={(event) => setForm({ ...form, year: Number(event.currentTarget.value) })} type="number" id="" />
      <select onChange={(event) => setForm({
        ...form,
        brand: event.currentTarget.value,
      })}
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
      <button
        onClick={() => registerCar(form)}
        disabled={form.name.length < 3 || form.year > date || form.brand === ''}
        type="button"
      >
        Cadastrar
      </button>
    </form>
  );
}
