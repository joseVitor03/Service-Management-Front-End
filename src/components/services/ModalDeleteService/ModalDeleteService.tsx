'use client';

import styles from './ModalDeleteService.module.css';

export default function ModalDeleteService({ deleteService }: {
  deleteService: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>
}) {
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <div className={styles.containerMessage}>
          <h3>Tem certeza que deseja deletar esse serviço?</h3>
        </div>
        <div className={styles.containerBtn}>
          <button
            onClick={(event) => deleteService(event)}
            id="no"
            type="button"
          >
            Não
          </button>
          <button
            onClick={(event) => deleteService(event)}
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
