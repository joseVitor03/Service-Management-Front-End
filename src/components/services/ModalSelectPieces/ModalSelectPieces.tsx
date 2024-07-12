'use client';

import { MdCancel } from 'react-icons/md';
import { SetStateAction, use, useState } from 'react';
import { Pieces } from '@/types/Services';
import { ServiceContext } from '@/app/context/ServiceContext';
import styles from './ModalSelectPieces.module.css';

type ModalSelectPiecesTypes = {
  pieces: { id: number, name: string }[],
  setModal: React.Dispatch<SetStateAction<boolean>>,
  setPieceServicePage: React.Dispatch<SetStateAction<Pieces[]>>,
  pieceServicePage: Pieces[]
};
export default function ModalSelectPieces({
  pieces, setModal, setPieceServicePage,
  pieceServicePage,
}: ModalSelectPiecesTypes) {
  const { dataNewService, setDataNewService } = use(ServiceContext);
  const [selectedPiece, setSelectedPiece] = useState<Pieces>({
    id: 0, name: '', qtdUnit: 0, priceUnit: '',
  });
  const selectPiece = (piece: { id: number, name: string }) => {
    setSelectedPiece({ ...selectedPiece, id: piece.id, name: piece.name });
  };

  const addPieceInService = () => {
    setPieceServicePage([...pieceServicePage, selectedPiece]);
    setDataNewService({
      ...dataNewService,
      pieces: [...dataNewService.pieces, {
        qtdUnit: selectedPiece.qtdUnit,
        pieceId: selectedPiece.id,
        priceUnit: Number(selectedPiece.priceUnit),
      }],
    });
    setModal(false);
  };

  return (
    <div className={styles.cardModal}>
      <MdCancel onClick={() => setModal(false)} className={styles.cancel} />
      <div className={styles.cardsPieces}>
        {pieces.map((piece) => (
          <div
            onClick={() => selectPiece(piece)}
            className={styles.cardPiece}
            key={piece.id}
          >
            <h4>{piece.name}</h4>
            { selectedPiece.id === piece.id && (
              <>
                <div className={styles.containerPriceAndQtd}>
                  <label htmlFor="qtdUnit">
                    qtdUnit:
                    <input
                      onChange={(e) => setSelectedPiece(
                        { ...selectedPiece, qtdUnit: Number(e.currentTarget.value) },
                      )}
                      placeholder="2"
                      type="number"
                      id="qtdUnit"
                    />
                  </label>
                  <label htmlFor="priceUnit">
                    Preço Unit:
                    <input
                      onChange={(e) => setSelectedPiece(
                        { ...selectedPiece, priceUnit: e.currentTarget.value },
                      )}
                      placeholder="200.50"
                      type="number"
                      id="priceUnit"
                    />
                  </label>
                </div>
                <div className={styles.containerBtn}>
                  <button
                    onClick={addPieceInService}
                    disabled={
                    selectedPiece.priceUnit === '' || selectedPiece.qtdUnit === 0
                  }
                    type="button"
                  >
                    Adicionar Peça
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
