import styles from './Login.module.css';
import backgrounLogin from '../../assets/Background.svg';
import logo from '../../assets/logo.svg';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { ChangeEvent, useState } from 'react';
import ValidationManager from '../../utils/validationManager';
import { MouseEvent } from 'react';
import LoginService from './LoginService';

interface propsLogin {}

function Login(_: propsLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValidationText, setEmailValidationText] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async (_?: MouseEvent<HTMLButtonElement>) => {
    setEmailValidationText(ValidationManager.validateEmail(email));

    if (email !== '' && password !== '') {
      if (ValidationManager.validateGroup([emailValidationText])) {
        const data = await LoginService.login({ email, password });
        const decoded = await data.json();

        if (data.status === 401) {
          setMessage(decoded.result);
        }

        if (data.status === 200) {
          console.log(decoded);

          setMessage('Sesión iniciada correctamente');
        }
      }
    }
  };

  return (
    <div className={styles.background_login}>
      <img className={styles.backgroundImage_Login} src={backgrounLogin} alt='Vortex_Bird_Effect' />
      <div className={styles.card_Login}>
        <img className={styles.Logo_login} src={logo} alt='Vortex_Bird_Logo' />
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
          />
          <Input
            value={password}
            label='Contraseña'
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            type='password'
            placeholder='Ingrese la contraseña'
          />
          <Button text='Iniciar sesión' onClick={handleClick} />
          {/* <a href='/'>¿Olvidó su contraseña?</a> */}
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </div>
  );
}
export default Login;
