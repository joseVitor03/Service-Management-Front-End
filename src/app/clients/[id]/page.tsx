'use client';

import { Client, DataClientAndService } from '@/types/Services';
import loadServicesByClient from '@/utils/clients/loadServicesByClient';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FormUpdateClient from '@/components/clients/FormUpdateClient/FormUpdateClient';
import { MdCancel } from 'react-icons/md';
import updateDataClientDB from '@/utils/clients/updateDataClientDB';
import Swal from 'sweetalert2';
import Header from '@/components/Header/Header';
import styles from './page.module.css';

export default function ClientData() {
  const router = useRouter();
  const [formUpdateClient, setFormUpdateClient] = useState(false);
  const [data, setData] = useState<DataClientAndService>({
    services: [],
    dataClient: {
      id: 0,
      name: '',
      phone: '',
      plate: '',
      carColor: '',
      car: {
        id: 0, name: '', brand: '', year: 0,
      },
    },
  });
  const { id } = useParams();

  const updateDataClient = async ({ client, event }:
  { client: Client, event: React.FormEvent<HTMLFormElement> }) => {
    event.preventDefault();
    await updateDataClientDB(client);
    Swal.fire({
      icon: 'success',
      title: 'Dados atualizados com successo!',
      timer: 2000,
    });
    setFormUpdateClient(false);
    setData({ ...data, dataClient: client });
  };

  useEffect(() => {
    const load = async () => {
      const result = await loadServicesByClient(id as string);
      setData({ dataClient: result.dataClient, services: result.services });
    };
    load();
  }, []);
  console.log(data);

  return (
    <main className={styles.main}>
      <Header />
      <h1>Dados do Cliente:</h1>
      <section className={styles.containerData}>
        <p>
          Nome:
          {' '}
          {data.dataClient.name}
        </p>
        <p>
          Carro:
          {' '}
          {data.dataClient.car.name}
        </p>
        <p>
          Marca:
          {' '}
          {data.dataClient.car.brand}
        </p>
        <p>
          Ano:
          {' '}
          {data.dataClient.car.year}
        </p>
        <p>
          Cor carro:
          {' '}
          {data.dataClient.carColor}
        </p>
        <p>
          Placa:
          {' '}
          {data.dataClient.plate}
        </p>
        <p>
          Celular:
          {' '}
          {data.dataClient.phone}
        </p>
        <button onClick={() => setFormUpdateClient(true)} type="button">Alterar dados</button>
        {formUpdateClient
        && (
          <div className={styles.containerUpdate}>
            <FormUpdateClient client={data.dataClient} updateDataClient={updateDataClient} />
            <MdCancel onClick={() => setFormUpdateClient(false)} className={styles.cancel} />
          </div>
        )}
      </section>
      <section className={styles.containerServices}>
        <h2>Serviços:</h2>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Serviço Pago</th>
              <th>Total Serviço</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody className={styles.dataService}>
            {data.services.length > 0 && data.services.map((service) => (
              <tr key={service.id} onClick={() => router.push(`/services/${service.id}`)}>
                <td>{service.paymentStatus ? <p>Pago</p> : <p>Pendente</p>}</td>
                <td>{service.totalService}</td>
                <td>{service.date.split('-').reverse().join('/')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
