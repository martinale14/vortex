import styles from './Button.module.css';
import nextIcon from '../../assets/next.svg'

interface PropsButton {
  next? : Boolean //Optional value
}
function Login(props: PropsButton) {
  return (
    <button className={`${styles.button_vortex} ${props.next === false ? styles.button_vortex_back_fill : styles.button_vortex_next_fill}`}>
      
      Iniciar sesión

      {/* trying to use span as an svg (It didn't work) */}
      {/* <span className={styles.button_vortex_icon}></span> */}
    
    </button>);
}

export default Login;