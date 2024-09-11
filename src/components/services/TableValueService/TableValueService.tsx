'use client';

import { PropsService } from '@/types/PropsServices';
import { useContext, useEffect } from 'react';
import { ServiceContext } from '@/app/context/ServiceContext';
import { useRouter } from 'next/navigation';
import styles from './tableValueService.module.css';

export default function TableValueService({ data }: PropsService) {
  const { populateService, services, paidServices } = useContext(ServiceContext);
  const router = useRouter();
  useEffect(() => {
    const load = async () => {
      populateService(data);
    };
    load();
  }, []);

  return (
    <tbody className={styles.dataService}>
      { !paidServices ? services.map(({
        id, client, totalService, paymentStatus, date, car, plate, carColor,
      }) => (
        (!paymentStatus
          && (
            <tr
              key={id}
              onClick={() => router.push(`/services/${id}`)}
            >
              <td>{!client.name ? '' : client.name}</td>
              <td>{car.name}</td>
              <td>{carColor}</td>
              <td>{car.year}</td>
              <td>{plate}</td>
              <td>{totalService}</td>
              <td>
                <p className={styles.paymentFalse}>Pendende</p>
              </td>
              <td>{date.split('-').reverse().join('-')}</td>
            </tr>
          )))) : services.map(({
        id, client, totalService, paymentStatus, date, car, carColor, plate,
      }) => (
        (paymentStatus
          && (
            <tr
              key={id}
              onClick={() => router.push(`/services/${id}`)}
            >
              <td>{client.name}</td>
              <td>{car.name}</td>
              <td>{carColor}</td>
              <td>{car.year}</td>
              <td>{plate}</td>
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
