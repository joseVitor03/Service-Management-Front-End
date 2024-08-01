'use client';

import { ServiceContext } from '@/app/context/ServiceContext';
import { use } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Pieces } from '@/types/Services';
import styles from './ClientData.module.css';

export default function ClientData() {
  const {
    dataNewServiceInPage,
    setDataNewServiceInPage, setDataNewService, dataNewService,
  } = use(ServiceContext);

  const removePiece = (piece: Pieces) => {
    const resultForPage = dataNewServiceInPage.pieces.filter(({ id }) => piece.id !== id);
    const resultForNewService = dataNewService.pieces.filter(({ pieceId }) => pieceId !== piece.id);
    setDataNewServiceInPage({
      ...dataNewServiceInPage,
      totalService: dataNewServiceInPage.totalService - (Number(piece.priceUnit) * piece.qtdUnit),
      pieces: resultForPage,
    });
    setDataNewService({
      ...dataNewService,
      totalService: dataNewServiceInPage.totalService - (Number(piece.priceUnit) * piece.qtdUnit),
      pieces: resultForNewService,
    });
  };

  const removeLabor = ({ id, labor } : { id:number, labor:number }) => {
    const resultForPage = dataNewServiceInPage.employeeServices
      .filter((employee) => employee.id !== id);
    const resultForNewService = dataNewService.employeeServices
      .filter(({ employeeId }) => employeeId !== id);
    setDataNewServiceInPage({
      ...dataNewServiceInPage,
      totalService: Number(dataNewServiceInPage.totalService
      - labor),
      employeeServices: resultForPage,
    });
    setDataNewService({
      ...dataNewService,
      totalService: Number(dataNewServiceInPage.totalService - labor),
      employeeServices: resultForNewService,
    });
  };

  return (
    <div className={styles.div}>
      <h2>Nota Serviço</h2>
      <section className={styles.containerNote}>
        <header>
          <div className={styles.nameAndDate}>
            <h3>
              Cliente:
              {' '}
              {dataNewServiceInPage.client.name}
            </h3>
            <h3>
              Data:
              {' '}
              {dataNewServiceInPage.date.split('-').reverse().join('/')}
            </h3>
          </div>
          <div className={styles.infoCar}>
            <h4>
              Carro:
              {' '}
              {dataNewServiceInPage.client.car.name}
            </h4>
            <h4>
              Ano:
              {' '}
              {dataNewServiceInPage.client.car.year}
            </h4>
            <h4>
              Cor:
              {' '}
              {dataNewServiceInPage.client.carColor}
            </h4>
            <h4>
              Placa:
              {' '}
              {dataNewServiceInPage.client.plate}
            </h4>
            <h4 className={styles.mechanic}>
              Mecânico responsavel:
              {' '}
              {dataNewServiceInPage.principalEmployee.name}
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
                <th>Remover</th>
              </tr>
            </thead>
            <tbody className={styles.itens}>
              {dataNewServiceInPage.pieces.map((piece) => (
                <tr key={piece.id}>
                  <td>{piece.name}</td>
                  <td>{piece.qtdUnit}</td>
                  <td>{piece.priceUnit}</td>
                  <td>{(Number(piece.priceUnit) * piece.qtdUnit).toFixed(2)}</td>
                  <td>
                    <FaTrashAlt
                      className={styles.trash}
                      onClick={() => removePiece(piece)}
                    />
                  </td>
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
                <th>Remover</th>
              </tr>
            </thead>
            <tbody className={styles.itens}>
              {dataNewServiceInPage.employeeServices.map(({
                name, labor, description, id,
              }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{description === '' ? 'MÃO DE OBRA' : description}</td>
                  <td>{labor.toFixed(2)}</td>
                  <td>
                    <FaTrashAlt
                      className={styles.trash}
                      onClick={() => removeLabor({ labor, id })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.containerPriceFinal}>
          <h3>
            Peças:
            {' '}
            {dataNewServiceInPage.pieces.reduce((acc, curr) => acc + (Number(curr.priceUnit)
                * curr.qtdUnit), 0).toFixed(2)}
          </h3>
          <h3>
            Serviço:
            {' '}
            {dataNewServiceInPage.employeeServices
              .reduce((acc, curr) => acc + (Number(curr.labor)), 0)
              .toFixed(2)}
          </h3>
          <h2>
            Total:
            {' '}
            {dataNewServiceInPage.totalService.toFixed(2)}
          </h2>
        </div>
      </section>
    </div>
  );
}
