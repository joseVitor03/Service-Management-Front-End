'use client';

import loadEmployees from '@/utils/employees/loadEmployees';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { ServiceContext } from '@/app/context/ServiceContext';
import styles from './EmployeeService.module.css';

export default function EmployeeService() {
  type EmployeeInPageType = {
    id: number,
    name: string,
    description: string,
    labor: number
  };
  const router = useRouter();
  const {
    dataNewService, setDataNewService,
    dataNewServiceInPage, setDataNewServiceInPage, setListEmployees,
    listEmployees,
  } = use(ServiceContext);
  const [employeeService, setEmployeeService] = useState<EmployeeInPageType>({
    id: 0,
    name: '',
    labor: 0,
    description: '',
  });

  useEffect(() => {
    const load = async () => {
      const result = await loadEmployees();
      if (result.message) {
        router.push('/');
      }
      setListEmployees(result);
    };
    load();
  }, []);

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget.options[e.currentTarget.selectedIndex];
    console.log(id, value);
    setEmployeeService({ ...employeeService, id: Number(id), name: value });
  };

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    if (id === 'labor') {
      setEmployeeService({ ...employeeService, [id]: Number(value) });
    } else {
      setEmployeeService({ ...employeeService, [id]: value });
    }
  };

  const handleAddEmployee = () => {
    const total = dataNewServiceInPage.totalService
      + Number(employeeService.labor);
    setDataNewServiceInPage({
      ...dataNewServiceInPage,
      totalService: total,
      employeeServices: [
        ...dataNewServiceInPage.employeeServices, employeeService,
      ],
    });
    setDataNewService({
      ...dataNewService,
      totalService: total,
      employeeServices: [
        ...dataNewService.employeeServices, {
          employeeId: employeeService.id,
          labor: Number(employeeService.labor),
          description: employeeService.description === '' ? null : employeeService.description,
        },
      ],
    });
  };

  console.log(dataNewService);

  return (
    <div className={styles.card}>
      <h3>Funcionario(s) no serviço:</h3>
      <select
        onChange={(e) => handleChangeSelect(e)}
        name=""
      >
        <option id={`${0}`} value="">SELECIONE</option>
        {listEmployees.map((employee) => (
          <option
            id={`${employee.id}`}
            key={employee.id}
            value={employee.name}
          >
            {employee.name}
          </option>
        ))}
      </select>
      <label htmlFor="description">
        Tipo de serviço:
        <input
          onChange={(e) => handleChangeInputs(e)}
          value={employeeService.description.toLocaleUpperCase()}
          id="description"
          type="text"
        />
        { !employeeService.description
         && <p>*Caso não especifique nehum tipo, será: MÃO DE OBRA</p>}
      </label>
      <label htmlFor="labor">
        Valor do serviço:
        <input
          onChange={(e) => handleChangeInputs(e)}
          type="number"
          id="labor"
        />
      </label>
      <button
        disabled={employeeService.id === 0 || employeeService.labor === 0}
        type="button"
        onClick={handleAddEmployee}
      >
        Adicionar serviço
      </button>
    </div>
  );
}
