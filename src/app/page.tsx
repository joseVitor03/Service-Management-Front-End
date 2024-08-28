import Image from 'next/image';
import styles from './page.module.css';
import carLogin from '../images/wallpapersden.com_porsche-red_1920x1080.jpg';
import logo from '../images/2kYwIJSloMyjwys9ZDgl5lBpSKf.svg';
import FormLogin from '../components/login/FormLogin/FormLogin';

export default function Login() {
  return (
    <main className={styles.main}>
      <section className={styles.containerImage}>
        <Image className={styles.carImage} src={carLogin} alt="imagem carro" />
      </section>
      <section className={styles.containerForm}>
        <div className={styles.containerLogo}>
          <Image src={logo} className={styles.logo} alt="logo" />
        </div>
        <FormLogin />
      </section>
    </main>
  );
}
