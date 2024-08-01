'use client';

import { INITIAL_STATE_NEW_SERVICE, INITIAL_STATE_NEW_SERVICE_IN_PAGE, ServiceContext } from '@/app/context/ServiceContext';
import { use } from 'react';
import registerServiceDB from '@/utils/services/registerServiceDB';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import styles from './BtnRegisterService.module.css';

export default function BtnRegisterService() {
  const { dataNewService, setDataNewService, setDataNewServiceInPage } = use(ServiceContext);
  const router = useRouter();

  const registerService = async () => {
    const result = await registerServiceDB(dataNewService);

    if (result !== 201) {
      Swal.fire({
        icon: 'warning',
        title: 'Algo deu errado!',
        text: 'Tente Novamente',
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Serviço Cadastrado.',
        timer: 2000,
        showConfirmButton: false,
      });
    }
    setDataNewService(INITIAL_STATE_NEW_SERVICE);
    setDataNewServiceInPage(INITIAL_STATE_NEW_SERVICE_IN_PAGE);
    router.push('/services');
  };
  return (
    <button
      onClick={registerService}
      disabled={dataNewService.clientId === 0
        || (dataNewService.employeeServices.length === 0 && dataNewService.pieces.length === 0)}
      className={styles.btn}
      type="button"
    >
      Finalizar Nota
    </button>
  );
}
