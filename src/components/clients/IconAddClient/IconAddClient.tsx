'use client';

import { useRouter } from 'next/navigation';
import { PiUserCirclePlusFill } from 'react-icons/pi';
import { Oval } from 'react-loader-spinner';
import { useState } from 'react';
import styles from './IconAddClient.module.css';

export default function IconAddClient() {
  const router = useRouter();
  const [cliked, setClicked] = useState(false);
  const changePage = () => {
    setClicked(true);
    setTimeout(() => {
      router.push('/clients/newClient');
      setClicked(false);
    }, 1500);
  };
  return (
    <div>
      {cliked ? (
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
      ) : (
        <PiUserCirclePlusFill
          title="cadastrar cliente"
          className={styles.icon}
          onClick={changePage}
        />
      )}
    </div>
  );
}
