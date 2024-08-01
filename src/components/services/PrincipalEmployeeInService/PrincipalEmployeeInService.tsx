'use client';

import { ServiceContext } from '@/app/context/ServiceContext';
import { use } from 'react';
import styles from './PrincipalEmployeeInService.module.css';

export default function PrincipalEmployeeInService() {
  const {
    listEmployees, dataNewService,
    dataNewServiceInPage, setDataNewService, setDataNewServiceInPage,
  } = use(ServiceContext);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.currentTarget.options[e.currentTarget.selectedIndex];
    console.log(id, value);
    setDataNewServiceInPage({
      ...dataNewServiceInPage,
      principalEmployee: {
        id: Number(id), name: value,
      },
    });
    setDataNewService({ ...dataNewService, principalEmployeeId: Number(id) });
  };

  return (
    <div className={styles.container}>
      <h3>Funcionário responsável:</h3>
      <select
        className={dataNewService.principalEmployeeId !== 0 ? styles.selected : styles.notSelected}
        onChange={(e) => handleChange(e)}
      >
        <option value="">SELECIONE</option>
        {listEmployees.map((employee) => (
          <option
            key={employee.id}
            id={`${employee.id}`}
            value={employee.name}
          >
            {employee.name}
          </option>
        ))}
      </select>
    </div>
  );
}
