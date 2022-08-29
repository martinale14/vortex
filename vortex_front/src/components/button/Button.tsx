import styles from './Button.module.css';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { MouseEventHandler } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import ReactLoading from 'react-loading';

interface PropsButton {
  back?: Boolean; //Optional value to change button style
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined; //Button function
  noArrow?: any;
  add?: any;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
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
        props.disabled
          ? styles.button_vortex_disabled
          : props.back
          ? styles.button_vortex_back_fill
          : styles.button_vortex_next_fill
      } ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.add && <AiFillPlusCircle size={20} className={styles.plusCircle} />}
      {(props.isLoading ?? false) ? <ReactLoading height='30px' width='30px' type='spinningBubbles' color='#008f82' />
 : props.text}
      {props.noArrow ? null : <IoMdArrowDroprightCircle className={styles.arrow} />}
    </button>
  );
}

export default Button;
