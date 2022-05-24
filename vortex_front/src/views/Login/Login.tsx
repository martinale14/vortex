import styles from './Login.module.css';
import backgrounLogin from '../../assets/Ellipse.svg';
import logo from '../../assets/logo.svg';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { ChangeEvent, useState, useContext } from 'react';
import ValidationManager from '../../utils/validationManager';
import { MouseEvent } from 'react';
import LoginService from './LoginService';
import { UserContext } from '../../utils/contexts';
import { useNavigate } from 'react-router-dom';
import { Token } from '../../utils/auth';
import { useEffect } from 'react';
import LoginSecondaryButton from '../../components/loginSecondaryButton/LoginSecondaryButton';

interface propsLogin {}

function Login(_: propsLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValidationText, setEmailValidationText] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialize = async () => {
    const usr = await LoginService.verifySession();
    if (usr !== undefined) {
      setUser(usr);
      navigate('/home');
    }
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEmailValidationText(ValidationManager.validateEmail(email));

    if (email !== '' && password !== '') {
      if (ValidationManager.validateGroup([emailValidationText])) {
        const data = await LoginService.login({ email, password });

        if (data.response?.status === 401) {
          setMessage(data.response.data.result);
        }

        if (data.status === 200) {
          setUser(data.data.user);
          Token.authToken = data.data.token;
          Token.refreshToken = data.data.refreshToken;

          localStorage.setItem('authToken', Token.authToken);
          localStorage.setItem('refreshToken', Token.refreshToken);

          navigate('/home');
        }
      }
    }
  };

  const handleClickRecover = () => {
    const section = document.getElementById('login_main_section');
    section?.classList.toggle(styles.secondSection, false);
    section?.classList.toggle(styles.thirdthSection, true);
  };

  return (
    <div className={styles.background_login}>
      <img className={styles.backgroundImage_Login} src={backgrounLogin} alt='Vortex_Bird_Effect' />
      <div className={styles.card_Login}>
        <img className={styles.Logo_login} src={logo} alt='Vortex_Bird_Logo' />
        <div id='login_main_section' className={styles.mainSection}>
          <div>
            <form className={styles.cardInformation_login}>
              <Input
                name='email'
                id='email_input_login'
                value={email}
                autocomplete='email'
                label='Correo'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                  setEmailValidationText(ValidationManager.validateEmail(event.target.value));
                }}
                type='text'
                placeholder='Ingrese el correo'
                validationText={emailValidationText}
                className={styles.loginInput}
              />
              <Input
                autocomplete='current-password'
                name='current-password'
                id='current-password_login'
                value={password}
                label='Contraseña'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
                type='password'
                placeholder='Ingrese la contraseña'
                className={styles.loginInput}
              />
              <Button type='submit' text='Iniciar sesión' onClick={handleClick} />
              <button
                className={styles.raisedButton}
                onClick={(e) => {
                  e.preventDefault();

                  const section = document.getElementById('login_main_section');
                  section?.classList.toggle(styles.secondSection, true);
                  section?.classList.toggle(styles.thirdthSection, false);
                }}
              >
                ¿Olvidó su contraseña?
              </button>
              <p className={styles.message}>{message}</p>
            </form>
            <div className={styles.cardInformation_login}>
              <Input
                value={email}
                label='Correo'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                  setEmailValidationText(ValidationManager.validateEmail(event.target.value));
                }}
                type='text'
                placeholder='Ingrese el correo'
                validationText={emailValidationText}
                className={styles.loginInput}
              />

              <Button text='Recuperar' onClick={handleClickRecover} />

              <LoginSecondaryButton
                onClick={(e: any) => {
                  e.preventDefault();

                  const section = document.getElementById('login_main_section');
                  section?.classList.toggle(styles.secondSection, false);
                  section?.classList.toggle(styles.thirdthSection, false);
                }}
                text='Volver'
              />
              <p className={styles.message}>{message}</p>
            </div>
            <div className={styles.cardInformation_login}>
              <p className={styles.recoverText}>
                Un correo fue enviado a {email} por favor revisa tu bandeja de entrada
              </p>

              <LoginSecondaryButton
                onClick={(e: any) => {
                  e.preventDefault();

                  const section = document.getElementById('login_main_section');
                  section?.classList.toggle(styles.secondSection, false);
                  section?.classList.toggle(styles.thirdthSection, false);
                }}
                text='Iniciar Sesión'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
