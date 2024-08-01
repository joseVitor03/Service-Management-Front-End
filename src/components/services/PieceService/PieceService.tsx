'use client';

import { Pieces } from '@/types/Services';
import findPiecesDB from '@/utils/services/findPiecesDB';
import { use, useState } from 'react';
import { ServiceContext } from '@/app/context/ServiceContext';
import Swal from 'sweetalert2';
import ModalSelectPieces from '../ModalSelectPieces/ModalSelectPieces';
import styles from './PieceService.module.css';

export default function PieceService() {
  const {
    dataNewService, setDataNewService,
    dataNewServiceInPage, setDataNewServiceInPage,
  } = use(ServiceContext);
  const [pieces, setPieces] = useState<Pieces[]>([]);
  const [pieceName, setPieceName] = useState('');
  const [modal, setModal] = useState(false);

  const searchPieces = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await findPiecesDB(pieceName);
    if (result.length > 0) {
      setPieces(result);
      setModal(true);
    } else {
      Swal.fire({
        icon: 'info',
        title: 'nenhum item encontrado.',
      });
    }
  };

  return (
    <>
      <h3 className={styles.h3}>Peças do serviço:</h3>
      { modal && (
      <div className={styles.containerModal}>
        <ModalSelectPieces
          setModal={setModal}
          pieces={pieces}
        />
      </div>
      ) }
      <form className={styles.form} onSubmit={(e) => searchPieces(e)}>
        <label htmlFor="piece">
          Nome Peça:
          <input
            value={pieceName}
            onChange={(e) => setPieceName(e.currentTarget.value.toLocaleUpperCase())}
            type="text"
            placeholder="filtro ar"
          />
        </label>
        <button disabled={pieceName.length < 3} type="submit">
          Buscar
        </button>
      </form>
    </>
  );
}
