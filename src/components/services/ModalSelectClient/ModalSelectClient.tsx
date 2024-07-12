'use client';

import { SetStateAction, use } from 'react';
import { Client } from '@/types/Services';
import { ServiceContext } from '@/app/context/ServiceContext';
import { MdCancel } from 'react-icons/md';
import styles from './ModalSelectClient.module.css';

export default function ModalSelectClient({ clients, setModal, setClientChange }:
{ clients: Client[], setModal: React.Dispatch<SetStateAction<boolean>>,
  setClientChange: React.Dispatch<SetStateAction<boolean>> }) {
  const { dataNewService, setDataNewService } = use(ServiceContext);

  const selectClient = (client: Client) => {
    setDataNewService({ ...dataNewService, client });
    setModal(false);
    setClientChange(false);
  };
  return (
    <div className={styles.cardModal}>
      <MdCancel className={styles.cancel} onClick={() => setModal(false)} />
      <div className={styles.cardsClients}>
        {clients.map((client) => (
          <div
            className={styles.cardClient}
            key={client.id}
            onClick={() => selectClient(client)}
          >
            <h3>{client.name}</h3>
            <h4>
              {client.car.name}
              {' '}
              -
              {' '}
              {client.carColor}
            </h4>
            <h5>{client.plate}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
