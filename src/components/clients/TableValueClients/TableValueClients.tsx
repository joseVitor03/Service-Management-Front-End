'use client';

import { ClientContext } from '@/app/context/ClientsContext';
import { Client } from '@/types/Services';
import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './TableValueClients.module.css';

export default function TableValueClients({ data }: { data: Client[] }) {
  const { populateListClient, clients } = use(ClientContext);
  const router = useRouter();

  useEffect(() => {
    const load = () => {
      populateListClient(data);
    };
    load();
  }, []);

  return (
    <tbody className={styles.dataService}>
      {clients.length > 0 && clients.map((client: Client) => (
        <tr key={client.id} onClick={() => router.push(`/clients/${client.id}`)}>
          <td>{client.name}</td>
          <td>{client.car.name}</td>
          <td>{client.carColor}</td>
          <td>{client.car.year}</td>
          <td>{client.plate}</td>
        </tr>
      ))}
    </tbody>
  );
}
