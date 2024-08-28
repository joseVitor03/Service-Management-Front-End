'use client';

import { ServiceContext } from '@/app/context/ServiceContext';
import { useContext } from 'react';
import styles from './btnServicePaid.module.css';

export default function BtnServicePaid() {
  const { paidServices, setPaidServices } = useContext(ServiceContext);
  return (
    <button
      id="btnPaidAndUnpaid"
      className={paidServices ? styles.btnPaid : styles.btnUnpaid}
      onClick={() => setPaidServices(!paidServices)}
      type="button"
      title={paidServices ? 'trocar para serviços pendentes' : 'trocar para serviços pagos'}
    >
      { paidServices ? 'Serviços Pendentes' : 'Serviços Pagos' }
    </button>
  );
}
