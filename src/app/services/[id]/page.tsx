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
import ModalDeleteService from '@/components/services/ModalDeleteService/ModalDeleteService';
import deleteServiceDB from '@/utils/services/deleteServiceDB';
import Swal from 'sweetalert2';
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
    },
    carColor: '',
    plate: '',
    car: {
      id: 0,
      brand: '',
      name: '',
      year: 0,
    },
    principalEmployee: {
      id: 0,
      name: '',
    },
    date: '',
    totalService: '',
    paymentStatus: false,
  },
  itens: [],
  employees: [],
};
export default function Service() {
  const router = useRouter();
  const { id }: { id: string } = useParams();
  const [service, setService] = useState<SimplifyFindServiceType>(INITIAL_STATE_SERVICE_DETAILS);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
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
    setModalUpdate(!modalUpdate);
  };

  const updateStatusService = async () => {
    setModalUpdate(!modalUpdate);
  };

  const deleteService = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = e.currentTarget;
    if (value.id === 'yes') {
      const result = await deleteServiceDB(Number(id));
      if (result !== 200) {
        Swal.fire({
          icon: 'error',
          timer: 2000,
          title: 'Ocorreu um erro!',
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'success',
          timer: 2000,
          title: 'Serviço deletado.',
          showConfirmButton: false,
        });
        router.push('/services');
      }
    }
    setModalDelete(false);
  };

  useEffect(() => {
    const load = async () => {
      const data = await loadServiceDetails(id);
      setService(data);
    };
    load();
  }, [id]);

  return (

    <main className={styles.main}>
      <Header />
      {modalUpdate
      && (
        <div className={styles.containerModal}>
          <ModalUpdatePaymentStatusService confirmUpdate={confirmUpdate} />
        </div>
      ) }
      { modalDelete && <ModalDeleteService deleteService={deleteService} />}
      <div className={styles.containerBtn}>
        <button
          id="btnDelete"
          onClick={() => setModalDelete(true)}
          className={styles.btnClient}
          type="button"
        >
          Deletar Serviço
        </button>
        <button
          id="btnClientDetails"
          type="button"
          className={styles.btnClient}
          onClick={() => router.push(`/clients/${service.basicServiceData.client.id}`)}
        >
          Outros Serviços do(a)
          {' '}
          {service.basicServiceData.client.name}
        </button>
        <button
          id="btnUpdate"
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
                {service.basicServiceData.car.name}
              </h4>
              <h4>
                Ano:
                {' '}
                {service.basicServiceData.car.year}
              </h4>
              <h4>
                Cor:
                {' '}
                {service.basicServiceData.carColor}
              </h4>
              <h4>
                Placa:
                {' '}
                {service.basicServiceData.plate}
              </h4>
              <h4 className={styles.mechanic}>
                Mecânico responsavel:
                {' '}
                {service.basicServiceData.principalEmployee.name}
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
                {service.itens.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.qtdUnit}</td>
                    <td>{item.priceUnit}</td>
                    <td>{(Number(item.priceUnit) * item.qtdUnit).toFixed(2)}</td>
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
                  <tr key={employee !== null ? employee.id : service.basicServiceData.id}>
                    <td>{employee !== null && employee.name}</td>
                    <td>{description}</td>
                    <td>{labor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.containerPriceFinal}>
            <h3>
              Itens:
              {' '}
              {service.itens.reduce((acc, curr) => acc + (Number(curr.priceUnit)
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
