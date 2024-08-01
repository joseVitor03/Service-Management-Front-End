'use client';

import styles from './ModalDeleteClient.module.css';

export default function ModalDeleteClient({ deleteClient }: {
  deleteClient: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
}) {
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <div className={styles.containerMessage}>
          <h3>Tem  certeza que deseja deletar esse cliente?</h3>
        </div>
        <div className={styles.containerBtn}>
          <button
            onClick={(event) => deleteClient(event)}
            id="no"
            type="button"
          >
            Não
          </button>
          <button
            onClick={(event) => deleteClient(event)}
            id="yes"
            type="button"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}
