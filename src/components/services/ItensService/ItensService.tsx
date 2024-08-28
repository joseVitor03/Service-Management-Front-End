'use client';

import { Itens } from '@/types/Services';
import findItensDB from '@/utils/services/findItensDB';
import { useState } from 'react';
import Swal from 'sweetalert2';
import ModalSelectItens from '../ModalSelectItens/ModalSelectItens';
import styles from './ItensService.module.css';

export default function ItensService() {
  const [itens, setItens] = useState<Itens[]>([]);
  const [pieceName, setPieceName] = useState('');
  const [modal, setModal] = useState(false);

  const searchItens = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await findItensDB(pieceName);
    if (result.length > 0) {
      setItens(result);
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
      <h3 className={styles.h3}>Itens do serviço:</h3>
      { modal && (
      <div className={styles.containerModal}>
        <ModalSelectItens
          setModal={setModal}
          itens={itens}
        />
      </div>
      ) }
      <form className={styles.form} onSubmit={(e) => searchItens(e)}>
        <label htmlFor="piece">
          Nome Item:
          <input
            id="item"
            value={pieceName}
            onChange={(e) => setPieceName(e.currentTarget.value.toLocaleUpperCase())}
            type="text"
            placeholder="filtro ar"
          />
        </label>
        <button id="searchItem" disabled={pieceName.length < 3} type="submit">
          Buscar item
        </button>
      </form>
    </>
  );
}
