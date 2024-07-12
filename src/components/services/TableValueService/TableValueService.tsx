'use client';

import { PropsService } from '@/types/PropsServices';
import { use, useEffect } from 'react';
import { ServiceContext } from '@/app/context/ServiceContext';
import { useRouter } from 'next/navigation';
import styles from './tableValueService.module.css';

export default function TableValueService({ data }: PropsService) {
  const { populateService, services, paidServices } = use(ServiceContext);
  const router = useRouter();
  useEffect(() => {
    const load = async () => {
      populateService(data);
    };
    load();
  }, []);
  console.log(services);

  return (
    <tbody className={styles.dataService}>
      { !paidServices ? services.map(({
        id, client, totalService, paymentStatus, date,
      }) => (
        (!paymentStatus
          && (
            <tr
              key={id}
              onClick={() => router.push(`/services/${id}`)}
            >
              <td>{client.name}</td>
              <td>{client.car.name}</td>
              <td>{client.carColor}</td>
              <td>{client.car.year}</td>
              <td>{client.plate}</td>
              <td>{totalService}</td>
              <td>
                <p className={styles.paymentFalse}>Pendende</p>
              </td>
              <td>{date.split('-').reverse().join('-')}</td>
            </tr>
          )))) : services.map(({
        id, client, totalService, paymentStatus, date,
      }) => (
        (paymentStatus
          && (
            <tr
              key={id}
              onClick={() => router.push(`/services/${id}`)}
            >
              <td>{client.name}</td>
              <td>{client.car.name}</td>
              <td>{client.carColor}</td>
              <td>{client.car.year}</td>
              <td>{client.plate}</td>
              <td>{totalService}</td>
              <td>
                <p className={styles.paymentTrue}>Pago</p>
              </td>
              <td>{date.split('-').reverse().join('-')}</td>
            </tr>
          ))))}
    </tbody>
  );
}
