import styles from './Button.module.css';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { MouseEventHandler } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

interface PropsButton {
  back?: Boolean; //Optional value to change button style
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined; //Button function
  noArrow?: any;
  add?: any;
  disabled?: boolean;
}

/**
 *
 * @description Button to use in the application
 * @param {PropsButton} props props to use in the button component
 * @returns Button component
 */
function Button(props: PropsButton) {
  return (
    <button
      type={props.type ?? 'button'}
      className={`${styles.button_vortex} ${
        props.disabled ? styles.button_vortex_disabled 
          : props.back ? styles.button_vortex_back_fill 
            : styles.button_vortex_next_fill
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.add && <AiFillPlusCircle size={20} className={styles.plusCircle}/>}
      {props.text}
      {props.noArrow ? null : <IoMdArrowDroprightCircle className={styles.arrow} />}
    </button>
  );
}

export default Button;
