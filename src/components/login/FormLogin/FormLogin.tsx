'use client';

import { useState } from 'react';
import { FormLoginType } from '@/types/FormLoginType';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import setCokkie from '@/utils/setCookies';
import login from '@/utils/login/login';
import styles from '../../../app/page.module.css';
import Loading from '../Loading/Loading';

export default function FormLogin() {
  const [form, setForm] = useState<FormLoginType>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const REGEXEMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const REGEXPASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#]).*$/;

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.email.match(REGEXEMAIL) && form.password.match(REGEXPASSWORD)) {
      setIsLoading(true);
      try {
        const response = await login({ email: form.email, password: form.password });

        if (response.token) {
          await setCokkie(response.token);
          router.push('/services');
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Email ou senha incorreta',
            timer: 3000,
          });
        }
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'problema na requisição',
          timer: 3000,
        });
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'email ou senha com formato incorreto.',
        timer: 3000,
      });
    }
    setIsLoading(false);
  };
  return (
    <div>
      {isLoading ? <Loading />
        : (
          <form
            onSubmit={(e) => handleForm(e)}
            className={styles.formLogin}
          >
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>
            <label htmlFor="password">
              Senha:
              <input
                type="password"
                placeholder="Sua senha"
                id="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </label>
            { !form.password.match(/(?=.*[A-Z]).*$/g)
       && <div className={styles.messagesPassword}>* Precisa de uma letra maiúscula</div> }
            { !form.password.match(/(?=.*[a-z]).*$/g)
      && <div className={styles.messagesPassword}>* Precisa de uma letra minuscula</div> }
            { !form.password.match(/(?=.*[$*&@#]).*$/g)
       && <div className={styles.messagesPassword}>* Precisa de um caractere especial</div> }
            { !form.password.match(/^(?=.*\d).*$/g)
       && <div className={styles.messagesPassword}>* Precisa de um dígito</div> }
            { form.password.length < 8
       && <div className={styles.messagesPassword}>* Precisa ter ao menos 8 caracteres</div> }
            <button
              type="submit"
              disabled={!form.email.match(REGEXEMAIL)
          || !form.password.match(REGEXPASSWORD)}
            >
              Login
            </button>
          </form>
        )}
    </div>
  );
}
