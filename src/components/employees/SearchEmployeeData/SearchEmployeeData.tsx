'use client';

import { Employee, ListServiceEmployee, ListServicesProductivityEmployee } from '@/types/Services';
import { useState } from 'react';
import { MdPersonAddAlt1, MdCancel } from 'react-icons/md';
import listServicesByEmployee from '@/utils/employees/listServicesByEmployee';
import { useRouter } from 'next/navigation';
import servicesEmployees from '@/utils/employees/servicesEmployee';
import Swal from 'sweetalert2';
import styles from './SearchEmployeeData.module.css';
import ModalEmployeeProductivity from '../ModalEmployeeProductivity/ModalEmployeeProductivity';
import ModalAddEmployee from '../ModalAddEmployee/ModalAddEmployee';
import ModalRemoveEmployee from '../ModalRemoveEmployee/ModalRemoveEmployee';

export default function SearchEmployeeData({ employees }: { employees: Employee[] }) {
  type SearchServicesEmployeeType = {
    id: number,
    dateInitial: string,
    dateFinal: string
  };

  const router = useRouter();
  const [employeeSelected, setEmployeeSelected] = useState('');
  const [searchServicesEmployee, setSearchServicesEmployee] = useState<SearchServicesEmployeeType>({
    id: 0,
    dateInitial: '',
    dateFinal: '',
  });
  const [modalProductivity, setModalProductivity] = useState(false);
  const [listServices, setListServices] = useState<ListServiceEmployee[]>([]);
  const [servicesByDateActive, setServiceByDateActive] = useState(false);
  const [employeeProductivity,
    setEmployeeProductivity] = useState<ListServicesProductivityEmployee[]>([]);
  const [modalAddEmployee, setModalAddEmployee] = useState(false);
  const [modalRemoveEmployee, setModalRemoveEmployee] = useState(false);

  const employeeSelect = async ({ id, value }: { id: number, value: string }) => {
    if (value !== '') {
      setEmployeeSelected(value);
      setSearchServicesEmployee({ ...searchServicesEmployee, id });
      const result = await listServicesByEmployee(id);
      if (result.message) {
        router.push('/');
      }
      setListServices(result);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setSearchServicesEmployee({
      ...searchServicesEmployee,
      [id]: value,
    });
  };

  const searchServicesByDates = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await servicesEmployees(searchServicesEmployee);
    if (result.message) {
      Swal.fire({
        icon: 'info',
        title: 'nenhum serviço encontrado',
        timer: 2000,
        showConfirmButton: false,
      });
    }
    setModalProductivity(true);
    setEmployeeProductivity(result);
  };

  return (
    <div className={styles.container}>
      { modalProductivity && employeeProductivity.length > 0
      && (
      <ModalEmployeeProductivity
        employeeProductivity={employeeProductivity}
        employee={employeeSelected}
        searchServicesEmployee={searchServicesEmployee}
        setModalProductivity={setModalProductivity}
      />
      )}
      { modalAddEmployee && <ModalAddEmployee setModalAddEmployee={setModalAddEmployee} /> }
      { modalRemoveEmployee && (
      <ModalRemoveEmployee
        setModalRemoveEmployee={setModalRemoveEmployee}
        employee={{ id: searchServicesEmployee.id, name: employeeSelected }}
      />
      )}
      <select onChange={(e) => employeeSelect({
        id: Number(e.currentTarget.options[e.currentTarget.selectedIndex].id),
        value: e.currentTarget.value,
      })}
      >
        <option value="">Selecione</option>
        {employees.map((employee) => (
          <option
            id={`${employee.id}`}
            key={employee.id}
            value={employee.name}
          >
            {employee.name}
          </option>
        ))}
      </select>
      { employeeSelected !== ''
      && (
      <div className={styles.containerEmployee}>
        <h2>{employeeSelected}</h2>
        <div className={styles.btns}>
          <button onClick={() => setModalRemoveEmployee(true)} type="button">Deseja excluir esse funcionário</button>
          <button onClick={() => setServiceByDateActive(true)} type="button">Produtividade do func. em um intervalo de datas</button>
        </div>
          {servicesByDateActive && (
            <form onSubmit={(e) => searchServicesByDates(e)} className={styles.form}>
              <div className={styles.containerCancel}>
                <MdCancel className={styles.cancel} onClick={() => setServiceByDateActive(false)} />
              </div>
              <label htmlFor="dateInitial">
                Data Inicial:
                <input
                  onChange={(e) => handleChange(e)}
                  id="dateInitial"
                  placeholder="ex: 20/05/2020"
                  type="date"
                />
                { searchServicesEmployee.dateInitial.length === 10
                && (new Date(searchServicesEmployee.dateInitial) > new Date())
                && <p>Data inicial não pode ser maior que a data atual</p>}
              </label>
              <label htmlFor="dateFinal">
                Data Final:
                <input
                  onChange={(e) => handleChange(e)}
                  id="dateFinal"
                  placeholder="ex: 20/05/2020"
                  type="date"
                />
                {searchServicesEmployee.dateFinal.length === 10
                && (new Date(searchServicesEmployee
                  .dateFinal) < new Date(searchServicesEmployee.dateInitial))
                && <p>Data final não pode ser menor que a data inicial</p>}
              </label>
              <button
                disabled={searchServicesEmployee.dateInitial.length === 0
                  || searchServicesEmployee.dateFinal.length === 0
                  || (searchServicesEmployee.dateInitial.length === 10
                && (new Date(searchServicesEmployee.dateInitial) > new Date()))
                || (searchServicesEmployee.dateFinal.length === 10
                && (new Date(searchServicesEmployee
                  .dateFinal) < new Date(searchServicesEmployee.dateInitial)))}
                type="submit"
              >
                Buscar
              </button>
            </form>
          )}
          { listServices.length > 0 && (
            <div className={styles.containerTable}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    <th className={styles.client}>Cliente</th>
                    <th>Carro</th>
                    <th>Cor do Veículo</th>
                    <th>Ano</th>
                    <th>Placa</th>
                    <th>Total</th>
                    <th>Serviço Pago</th>
                    <th>Data</th>
                  </tr>
                </thead>
                { listServices.map(({ service }) => (
                  <tr
                    key={service.id}
                    onClick={() => router.push(`/services/${service.id}`)}
                  >
                    <td>{service.client.name}</td>
                    <td>{service.client.car.name}</td>
                    <td>{service.client.carColor}</td>
                    <td>{service.client.car.year}</td>
                    <td>{service.client.plate}</td>
                    <td>{service.totalService}</td>
                    <td>
                      {!service.paymentStatus ? <p className={styles.paymentFalse}>Pendende</p>
                        : <p className={styles.paymentTrue}>Pago</p>}
                    </td>
                    <td>{service.date.split('-').reverse().join('-')}</td>
                  </tr>
                )) }
              </table>
            </div>
          )}
      </div>
      )}
      <MdPersonAddAlt1
        title="cadastrar funcionário"
        onClick={() => setModalAddEmployee(true)}
        className={styles.iconAddEmployee}
      />
    </div>
  );
}
