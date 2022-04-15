import styles from './Button.module.css';

interface propsButton {}
function Login(props: propsButton) {
  return <button className={styles.button_vortex}>Iniciar sesión</button>;
}
export default Login;
