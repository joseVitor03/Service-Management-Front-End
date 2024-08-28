'use client';

import { MdOutlineMedicalServices } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import styles from './BtnAddService.module.css';

export default function BtnAddService() {
  const router = useRouter();
  const [cliked, setClicked] = useState(false);
  const changePage = () => {
    setClicked(true);
    setTimeout(() => {
      router.push('/services/newService');
      setClicked(false);
    }, 1500);
  };
  return (
    <div>
      {cliked
        ? (
          <Oval
            visible
            height="80"
            width="80"
            color="#e23314"
            secondaryColor="#d35f4a"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )
        : <MdOutlineMedicalServices id="addService" title="cadastrar serviço" onClick={changePage} className={styles.addService} />}
    </div>
  );
}
