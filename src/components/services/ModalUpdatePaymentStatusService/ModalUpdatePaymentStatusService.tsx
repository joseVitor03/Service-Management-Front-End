import styles from './ModalUpdatePaymentStatusService.module.css';

type ConfirmUpdateProps = {
  confirmUpdate: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};
export default function ModalUpdatePaymentStatusService({ confirmUpdate }: ConfirmUpdateProps) {
  return (
    <div className={styles.main}>
      <div className={styles.containerMessage}>
        <h3>Tem certeza que deseja atualizar o status de pagamento?</h3>
      </div>
      <div className={styles.containerBtn}>
        <button
          onClick={(event) => confirmUpdate(event)}
          id="no"
          type="button"
        >
          Não
        </button>
        <button
          onClick={(event) => confirmUpdate(event)}
          id="yes"
          type="button"
        >
          Sim
        </button>
      </div>
    </div>
  );
}
