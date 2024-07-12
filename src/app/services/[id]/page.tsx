'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  useEffect, useState, useRef,

} from 'react';
import loadServiceDetails from '@/utils/services/loadServiceDetails';
import {
  SimplifyFindServiceType,
} from '@/types/Services';
import { useReactToPrint } from 'react-to-print';
import ModalUpdatePaymentStatusService from '@/components/services/ModalUpdatePaymentStatusService/ModalUpdatePaymentStatusService';
import updatePaymentStatusService from '@/utils/services/updatePaymentStatusServiceDB';
import Header from '@/components/Header/Header';
import styles from './page.module.css';

const INITIAL_STATE_SERVICE_DETAILS = {
  basicServiceData: {
    id: 0,
    client: {
      id: 0,
      name: '',
      phone: '',
      carColor: '',
      plate: '',
      car: {
        id: 0,
        brand: '',
        name: '',
        year: 0,
      },
    },
    date: '',
    totalService: '',
    paymentStatus: false,
  },
  pieces: [],
  employees: [],
};
export default function Service() {
  const router = useRouter();
  const { id }: { id: string } = useParams();
  const [service, setService] = useState<SimplifyFindServiceType>(INITIAL_STATE_SERVICE_DETAILS);
  const [modal, setModal] = useState(false);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const confirmUpdate = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.currentTarget.id === 'yes') {
      const result = await updatePaymentStatusService({
        paymentStatus:
      service.basicServiceData.paymentStatus,
        id: service.basicServiceData.id,
      });
      if (result.status === 200) {
        setService({
          ...service,
          basicServiceData: {
            ...service.basicServiceData,
            paymentStatus: !service.basicServiceData.paymentStatus,
          },
        });
      }
    }
    setModal(!modal);
  };

  const updateStatusService = async () => {
    setModal(!modal);
  };

  useEffect(() => {
    const load = async () => {
      const data = await loadServiceDetails(id);
      setService(data);
    };
    load();
  }, []);

  return (

    <main className={styles.main}>
      <Header />
      {modal
      && (
        <div className={styles.containerModal}>
          <ModalUpdatePaymentStatusService confirmUpdate={confirmUpdate} />
        </div>
      ) }
      <div className={styles.containerBtn}>
        <button
          type="button"
          className={styles.btnClient}
          onClick={() => router.push(`/clients/${service.basicServiceData.client.id}`)}
        >
          Outros Serviços do(a)
          {' '}
          {service.basicServiceData.client.name}
        </button>
        <button
          className={service.basicServiceData.paymentStatus ? styles.btnStatusTrue
            : styles.btnStatusFalse}
          onClick={updateStatusService}
          type="button"
        >
          {service.basicServiceData.paymentStatus
            ? <p>Pago</p> : <p>Pendente</p> }
        </button>
        <button className={styles.btnPrintOut} type="button" onClick={handlePrint}>Imprimir</button>
      </div>
      <div className={styles.div} ref={componentRef}>
        <h2>Nota Serviço</h2>
        <section className={styles.containerNote}>
          <header>
            <div className={styles.nameAndDate}>
              <h3>
                Cliente:
                {' '}
                {service.basicServiceData.client.name}
              </h3>
              <h3>
                Data:
                {' '}
                {service.basicServiceData.date.split('-').reverse().join('/')}
              </h3>
            </div>
            <div className={styles.infoCar}>
              <h4>
                Carro:
                {' '}
                {service.basicServiceData.client.car.name}
              </h4>
              <h4>
                Ano:
                {' '}
                {service.basicServiceData.client.car.year}
              </h4>
              <h4>
                Cor:
                {' '}
                {service.basicServiceData.client.carColor}
              </h4>
              <h4>
                Placa:
                {' '}
                {service.basicServiceData.client.plate}
              </h4>
            </div>
          </header>
          <div className={styles.tableIntens}>
            <table>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.item}>Itens</th>
                  <th>Quantidade</th>
                  <th>P.Unidade</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className={styles.itens}>
                {service.pieces.map((piece) => (
                  <tr key={piece.id}>
                    <td>{piece.name}</td>
                    <td>{piece.qtdUnit}</td>
                    <td>{piece.priceUnit}</td>
                    <td>{(Number(piece.priceUnit) * piece.qtdUnit).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.tableService}>
            <table>
              <thead className={styles.thead}>
                <tr>
                  <th>Mecânico</th>
                  <th>Tipo Serviço</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className={styles.itens}>
                {service.employees.map(({ employee, labor, description }) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{description}</td>
                    <td>{labor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.containerPriceFinal}>
            <h3>
              Peças:
              {' '}
              {service.pieces.reduce((acc, curr) => acc + (Number(curr.priceUnit)
                * curr.qtdUnit), 0).toFixed(2)}
            </h3>
            <h3>
              Serviço:
              {' '}
              {service.employees.reduce((acc, curr) => acc + (Number(curr.labor)), 0)
                .toFixed(2)}
            </h3>
            <h2>
              Total:
              {' '}
              {service.basicServiceData.totalService}
            </h2>
          </div>
        </section>
      </div>
    </main>
  );
}
