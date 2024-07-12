import Header from '@/components/Header/Header';
import SearchClientByNameAndPlate from '@/components/services/SearchClientByNameAndPlate/SearchClientByNameAndPlate';
import ClientDataCSC from '@/components/services/ClientDataCSC/ClientDataCSC';
import PieceService from '@/components/services/PieceService/PieceService';
import styles from './page.module.css';

export default function newService() {
  return (
    <main>
      <Header />
      <section className={styles.containerSearchClient}>
        <SearchClientByNameAndPlate />
      </section>
      <section className={styles.containerDataClient}>
        <ClientDataCSC />
      </section>
      <section className={styles.containerPieces}>
        <PieceService />
      </section>
    </main>
  );
}
