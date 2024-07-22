'use client';

import { ListServicesProductivityEmployee } from '@/types/Services';
import { useReactToPrint } from 'react-to-print';
import { useRef, SetStateAction } from 'react';
import { MdCancel } from 'react-icons/md';
import styles from './ModalEmployeeProductivity.module.css';

type SearchServicesEmployeeType = {
  id: number,
  dateInitial: string,
  dateFinal: string
};

export default function ModalEmployeeProductivity({
  employeeProductivity, employee, searchServicesEmployee,
  setModalProductivity,
} :
{ employeeProductivity: ListServicesProductivityEmployee[],
  employee: string,
  searchServicesEmployee: SearchServicesEmployeeType,
  setModalProductivity: React.Dispatch<SetStateAction<boolean>>

}) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={styles.containerModal}>
      <div className={styles.card}>
        <div className={styles.headerBtns}>
          <button type="button" onClick={handlePrint}>Imprimir</button>
          <MdCancel onClick={() => setModalProductivity(false)} className={styles.cancel} />
        </div>
        <div ref={componentRef} className={styles.note}>
          <header className={styles.header}>
            <h2>
              Funcionário:
              {' '}
              {employee}
            </h2>
            <h4>
              Data:
              {' '}
              {searchServicesEmployee.dateInitial.split('-').reverse().join('/')}
              {' '}
              -
              {' '}
              {searchServicesEmployee.dateFinal.split('-').reverse().join('/')}
            </h4>
          </header>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.client}>Cliente</th>
                <th>Carro</th>
                <th>Cor do Veículo</th>
                <th>Ano</th>
                <th>Placa</th>
                <th>Serviço</th>
                <th>Data</th>
              </tr>
            </thead>
            {employeeProductivity.map((service) => (
              <tr key={service.service.id}>
                <td>{service.service.client.name}</td>
                <td>{service.service.client.car.name}</td>
                <td>{service.service.client.carColor}</td>
                <td>{service.service.client.car.year}</td>
                <td>{service.service.client.plate}</td>
                <td>{service.labor}</td>
                <td>{service.service.date.split('-').reverse().join('/')}</td>
              </tr>
            ))}
          </table>
          <section className={styles.total}>
            <h3>
              Total dos Serviços:
              {' '}
              {employeeProductivity.reduce((acc, curr) => acc + (Number(curr.labor)), 0)
                .toFixed(2)}
            </h3>
          </section>
        </div>
      </div>
    </div>
  );
}
