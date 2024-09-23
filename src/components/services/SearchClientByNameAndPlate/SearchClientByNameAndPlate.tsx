'use client';

import { Client } from '@/types/Services';
import loadClientByNameAndPlate from '@/utils/clients/loadClientByNameAndPlate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { MdCancel } from 'react-icons/md';
import ModalSelectClient from '../ModalSelectClient/ModalSelectClient';
import styles from './SelectClientByNameAndPlate.module.css';

export default function SearchClientByNameAndPlate() {
  const REGEXPLATE = /^[a-zA-Z]{3}-[0-9][A-Za-z0-9][0-9]{2}$/g;
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [modal, setModal] = useState(false);
  const [clientChange, setClientChange] = useState(true);
  const [searchClient, setSearchClient] = useState<{ name: string, plate: string }>({ name: '', plate: '' });

  const loadClients = async () => {
    const result = await loadClientByNameAndPlate(searchClient);

    setClients(result);
    if (result.length > 0) {
      setModal(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: result.message,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  return (
    <div>
      {modal && (
      <div className={styles.containerModal}>
        <ModalSelectClient
          setModal={setModal}
          setClientChange={setClientChange}
          clients={clients}
        />
      </div>
      )}
      {
        clientChange
          ? (
            <div className={styles.containerSearch}>
              <div className={styles.header}>
                <h3>Buscar cliente</h3>
                <MdCancel onClick={() => setClientChange(false)} className={styles.cancel} />
              </div>
              <label htmlFor="name">
                Nome cliente:
                <input
                  onChange={(e) => setSearchClient({
                    ...searchClient,
                    name: e.currentTarget.value,
                  })}
                  type="text"
                  value={searchClient.name}
                  id="name"
                  placeholder="maria"
                />
              </label>
              <label htmlFor="plate">
                Placa:
                <input
                  onChange={(e) => setSearchClient({
                    ...searchClient,
                    plate: e.currentTarget.value,
                  })}
                  type="text"
                  value={searchClient.plate}
                  id="plate"
                  placeholder="ABC-1D23"
                />
              </label>
              <button
                id="searchClient"
                onClick={loadClients}
                disabled={(searchClient.name.length === 0
        && searchClient.plate.length === 0) || (searchClient.plate.length > 0
          && !searchClient.plate.match(REGEXPLATE))}
                type="button"
              >
                Buscar cliente
              </button>
              <h5>
                Caso o cliente não seja cadastrado clique
                {' '}
                <span className={styles.span} onClick={() => router.push('/clients/newClient')}>
                  aqui.
                </span>
              </h5>
            </div>
          )
          : (
            <button
              className={styles.btnShowSearchClient}
              onClick={() => setClientChange(!clientChange)}
              type="button"
            >
              Selecionar cliente
            </button>
          )
        }

    </div>
  );
}
