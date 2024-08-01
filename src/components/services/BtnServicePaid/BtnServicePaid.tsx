'use client';

import { ServiceContext } from '@/app/context/ServiceContext';
import { use } from 'react';
import styles from './btnServicePaid.module.css';

export default function BtnServicePaid() {
  const { paidServices, setPaidServices } = use(ServiceContext);
  return (
    <button
      className={paidServices ? styles.btnPaid : styles.btnUnpaid}
      onClick={() => setPaidServices(!paidServices)}
      type="button"
      title={paidServices ? 'trocar para serviços pendentes' : 'trocar para serviços pagos'}
    >
      Serviços Pagos
    </button>
  );
}
