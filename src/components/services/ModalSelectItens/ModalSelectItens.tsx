'use client';

import { MdCancel } from 'react-icons/md';
import { SetStateAction, use, useState } from 'react';
import { Itens } from '@/types/Services';
import { ServiceContext } from '@/app/context/ServiceContext';
import styles from './ModalSelectItens.module.css';

type ModalSelectItensTypes = {
  itens: { id: number, name: string }[],
  setModal: React.Dispatch<SetStateAction<boolean>>,
};
export default function ModalSelectPieces({
  itens, setModal,
}: ModalSelectItensTypes) {
  const {
    dataNewService, setDataNewService,
    setDataNewServiceInPage, dataNewServiceInPage,
  } = use(ServiceContext);
  const [selectedItem, setSelectedItem] = useState<Itens>({
    id: 0, name: '', qtdUnit: 0, priceUnit: '',
  });

  const selectItem = (item: { id: number, name: string }) => {
    setSelectedItem({ ...selectedItem, id: item.id, name: item.name });
  };

  const addItemInService = () => {
    const total = dataNewServiceInPage.totalService
      + Number(selectedItem.priceUnit) * selectedItem.qtdUnit;

    setDataNewServiceInPage({
      ...dataNewServiceInPage,
      totalService: total,
      itens: [...dataNewServiceInPage.itens, selectedItem],
    });
    setDataNewService({
      ...dataNewService,
      totalService: total,
      itens: [...dataNewService.itens, {
        qtdUnit: selectedItem.qtdUnit,
        itemId: selectedItem.id,
        priceUnit: Number(selectedItem.priceUnit),
      }],
    });
    setModal(false);
  };

  return (
    <div className={styles.cardModal}>
      <MdCancel onClick={() => setModal(false)} className={styles.cancel} />
      <div className={styles.cardsItens}>
        {itens.map((item) => (
          <div
            onClick={() => selectItem(item)}
            className={styles.cardItem}
            key={item.id}
          >
            <h4>{item.name}</h4>
            { selectedItem.id === item.id && (
              <>
                <div className={styles.containerPriceAndQtd}>
                  <label htmlFor="qtdUnit">
                    qtdUnit:
                    <input
                      onChange={(e) => setSelectedItem(
                        { ...selectedItem, qtdUnit: Number(e.currentTarget.value) },
                      )}
                      placeholder="2"
                      type="number"
                      id="qtdUnit"
                    />
                  </label>
                  <label htmlFor="priceUnit">
                    Preço Unit:
                    <input
                      onChange={(e) => setSelectedItem(
                        { ...selectedItem, priceUnit: e.currentTarget.value },
                      )}
                      placeholder="200.50"
                      type="number"
                      id="priceUnit"
                    />
                  </label>
                </div>
                <div className={styles.containerBtn}>
                  <button
                    id="btnAddItem"
                    onClick={addItemInService}
                    disabled={
                    selectedItem.priceUnit === '' || selectedItem.qtdUnit === 0
                  }
                    type="button"
                  >
                    Adicionar Item
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
