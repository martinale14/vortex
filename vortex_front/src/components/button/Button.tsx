import styles from './Button.module.css';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { MouseEventHandler } from 'react';

interface PropsButton {
  back?: Boolean; //Optional value to change button style
  onClick?: MouseEventHandler<HTMLButtonElement>; //Button function
}

/**
 *
 * @description Button to use in the application
 * @param props props to use in the button component
 * @returns Button component
 */
function Login(props: PropsButton) {
  return (
    <button
      className={`${styles.button_vortex} ${
        props.back ? styles.button_vortex_back_fill : styles.button_vortex_next_fill
      }`}
      onClick={props.onClick}
    >
      Iniciar sesión
      <IoMdArrowDroprightCircle className={styles.arrow} />
    </button>
  );
}

export default Login;
