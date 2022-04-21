import { FocusEvent, ChangeEventHandler } from 'react';
import styles from './Input.module.css';
import { IoMdAlert } from 'react-icons/io';

interface propsInput {
  type: string;
  placeholder: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  validationText?: string | null;
}

function Login(props: propsInput) {
  const effectExit = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      event.target.classList.toggle(styles.input_filled, false);
    }
  };

  const effectEnter = (event: FocusEvent<HTMLInputElement>) => {
    (event.target as HTMLInputElement).classList.toggle(styles.input_filled, true);
  };

  return (
    <>
      <p className={styles.label}>{props.label}</p>

      <div className={styles.input_container}>
        <input
          onFocus={effectEnter}
          value={props.value}
          onBlur={effectExit}
          onChange={props.onChange}
          type={props.type}
          placeholder={props.placeholder}
          className={styles.input_Login}
        />
        <div className={styles.input_background}></div>
      </div>

      {props.validationText !== null && props.validationText !== undefined ? (
        <div className={styles.validation_text}>
          <IoMdAlert />
          <p>{props.validationText}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Login;
