'use client';

import { Pieces } from '@/types/Services';
import findPiecesDB from '@/utils/services/findPiecesDB';
import { use, useState } from 'react';
import { ServiceContext } from '@/app/context/ServiceContext';
import Swal from 'sweetalert2';
import ModalSelectPieces from '../ModalSelectPieces/ModalSelectPieces';
import styles from './PieceService.module.css';

export default function PieceService() {
  const { dataNewService } = use(ServiceContext);
  const [pieces, setPieces] = useState<Pieces[]>([]);
  const [pieceName, setPieceName] = useState('');
  const [modal, setModal] = useState(false);
  const [piecesServicePage, setPieceServicePage] = useState<Pieces[]>([]);

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
  console.log(piecesServicePage);
  console.log(dataNewService);

  return (
    <>
      <h3>Peças do serviço</h3>
      { modal && (
      <div className={styles.containerModal}>
        <ModalSelectPieces
          pieceServicePage={piecesServicePage}
          setPieceServicePage={setPieceServicePage}
          setModal={setModal}
          pieces={pieces}
        />
      </div>
      ) }
      <form onSubmit={(e) => searchPieces(e)}>
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
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.item}>Itens</th>
            <th>Quantidade</th>
            <th>P.Unidade</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className={styles.itens}>
          {piecesServicePage.map((piece) => (
            <tr key={piece.id}>
              <td>{piece.name}</td>
              <td>{piece.qtdUnit}</td>
              <td>{piece.priceUnit}</td>
              <td>{(Number(piece.priceUnit) * piece.qtdUnit).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
