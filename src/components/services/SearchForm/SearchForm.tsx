'use client';

import { use, useState } from 'react';
import { ServiceContext } from '@/app/context/ServiceContext';
import { FilterDataType } from '@/types/ServiceContext';
import { IoRefreshCircleSharp } from 'react-icons/io5';
import styles from './searchForm.module.css';

export default function SearchForm() {
  const INITIAL_FILTER_FORM = {
    carName: '',
    clientName: '',
    year: '',
    plate: '',
    dateInitial: '',
    dateFinal: '',
  };
  const {
    refreshServices, services, setServices, paidServices,
  } = use(ServiceContext);
  const [filterForm, setFilterForm] = useState<FilterDataType>(INITIAL_FILTER_FORM);

  const filterServices = (filterData: FilterDataType) => {
    if (filterData.dateInitial.length === 10 && filterData.dateFinal.length === 10) {
      const result = services.filter((service) => (
        service.client.name.toLocaleLowerCase().includes(filterData.clientName)
        && service.client.car.name.toLowerCase().includes(filterData.carName)
        && service.client.plate.toLocaleUpperCase().includes(filterForm.plate.toLocaleUpperCase())
        && String(service.client.car.year).includes(filterData.year)
        && service.date >= filterData.dateInitial) && service.date <= filterData.dateFinal
      && service.paymentStatus === paidServices);

      setServices(result);
    } else {
      const result = services.filter((service) => (
        service.client.name.toLocaleLowerCase().includes(filterData.clientName)
        && service.client.car.name.toLowerCase().includes(filterData.carName)
        && service.client.plate.toLocaleUpperCase().includes(filterForm.plate.toLocaleUpperCase())
        && String(service.client.car.year).includes(filterData.year))
        && service.paymentStatus === paidServices);
      setServices(result);
    }
  };

  const refreshHandleBtn = () => {
    refreshServices();
    setFilterForm(INITIAL_FILTER_FORM);
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.inline}>

        <label htmlFor="client">
          Nome do cliente:
          <input
            id="client"
            value={filterForm.clientName}
            onChange={(value) => setFilterForm({
              ...filterForm,
              clientName: value.currentTarget.value,
            })}
            placeholder="Maria"
            type="text"
          />
        </label>
        <IoRefreshCircleSharp
          className={styles.refreshBtn}
          title="Reinicinar filtragem"
          onClick={refreshHandleBtn}
          type="button"
        />
      </div>

      <label htmlFor="car">
        Nome carro:
        <input
          id="car"
          onChange={(value) => setFilterForm({
            ...filterForm,
            carName: value.currentTarget.value,
          })}
          value={filterForm.carName}
          placeholder="Palio"
          type="text"
        />
      </label>
      <label htmlFor="plate">
        Placa:
        <input
          id="plate"
          type="text"
          placeholder="ABC-1D23"
          onChange={(event) => setFilterForm({ ...filterForm, plate: event.currentTarget.value })}
        />
      </label>
      <label htmlFor="year">
        Ano carro:
        <input
          id="year"
          onChange={(value) => setFilterForm({
            ...filterForm,
            year: value.currentTarget.value,
          })}
          value={filterForm.year}
          placeholder="2007"
          type="text"
        />
      </label>
      <h3>Busca por intervalo de datas</h3>
      <div className={styles.containerDates}>
        <label htmlFor="dateInitial">
          Data inicial:
          <input
            onChange={(value) => setFilterForm({
              ...filterForm,
              dateInitial: value.currentTarget.value,
            })}
            value={filterForm.dateInitial}
            id="dateInitial"
            type="date"
          />
        </label>
        <label htmlFor="dateFinal">
          Data Final:
          <input
            onChange={(value) => setFilterForm({
              ...filterForm,
              dateFinal: value.currentTarget.value,
            })}
            value={filterForm.dateFinal}
            id="dateFinal"
            type="date"
          />
        </label>
      </div>
      <button
        className={styles.filterBtn}
        onClick={() => filterServices(filterForm)}
        type="button"
      >
        Buscar
      </button>
    </div>
  );
}
