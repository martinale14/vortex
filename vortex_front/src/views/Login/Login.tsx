import styles from './Login.module.css';
import backgrounLogin from '../../assets/Background.svg';
import logo from '../../assets/Logo.svg';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

interface propsLogin {}
function Login(props: propsLogin) {
  return (
    <div className={styles.background_login}>
      <img className={styles.backgroundImage_Login} src={backgrounLogin} alt='Vortex_Bird_Effect' />
      <div className={styles.card_Login}>
        <img className={styles.Logo_login} src={logo} alt='Vortex_Bird_Logo' />
        <div className={styles.cardInformation_login}>
          <p>Correo</p>
          <Input type='text' placeholder='Ingrese el correo' />
          <p>Contraseña</p>
          <Input type='password' placeholder='Ingrese la contraseña' />
          <Button />
          <a href='/'>¿Olvidó su contraseña?</a>
        </div>
      </div>
    </div>
  );
}
export default Login;
