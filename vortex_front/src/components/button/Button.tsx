import styles from './Button.module.css';
import { IoMdArrowDroprightCircle } from 'react-icons/io'

interface PropsButton {
  back? : Boolean; //Optional value to change button style
  click? : any; //Button function 
}

/**
 * 
 * @description Button to use in the application
 * @param props props to use in the button component
 * @returns Button component
 */
function Login(props: PropsButton) {
  return (
    <button className={`${styles.button_vortex} ${props.back ? styles.button_vortex_back_fill : styles.button_vortex_next_fill}`}
      onClick={props.click}
    >
      
      Iniciar sesión

      <IoMdArrowDroprightCircle className={styles.arrow}/>
    
    </button>);
}

export default Login;