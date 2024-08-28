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
import ModalDeleteClient from '@/components/clients/ModalDeleteClient/ModalDeleteClient';
import deleteClientDB from '@/utils/clients/deleteClientDB';
import styles from './page.module.css';

export default function ClientData() {
  const router = useRouter();
  const [formUpdateClient, setFormUpdateClient] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
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

  const deleteClient = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const client = e.currentTarget;
    if (client.id === 'yes') {
      const result = await deleteClientDB(data.dataClient.id);
      if (result !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Ocorreu um erro!',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'success',
          timer: 2000,
          title: 'Cliente excluído',
          showConfirmButton: false,
        });
        router.push('/services');
      }
    }
    setModalDelete(false);
  };

  const updateDataClient = async ({ client, event }:
  { client: Client, event: React.FormEvent<HTMLFormElement> }) => {
    event.preventDefault();
    const result = await updateDataClientDB(client);
    if (result !== 200) {
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro!',
        timer: 2000,
      });
      router.push('/');
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Dados atualizados com successo!',
        timer: 2000,
      });
    }
    setFormUpdateClient(false);
    setData({ ...data, dataClient: client });
  };

  useEffect(() => {
    const load = async () => {
      const result = await loadServicesByClient(id as string);
      if (result.services.message || result.dataClient.message) {
        router.push('/');
      } else {
        setData({ dataClient: result.dataClient, services: result.services });
      }
    };
    load();
  }, [id]);

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.title}>
        <h1 className={styles.p}>Dados do Cliente:</h1>
        <button id="btnDelete" onClick={() => setModalDelete(true)} type="button">Deletar cliente</button>
      </div>
      { modalDelete && <ModalDeleteClient deleteClient={deleteClient} /> }
      <section id="containerData" className={styles.containerData}>
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
