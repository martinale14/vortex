import { FocusEvent, ChangeEventHandler } from 'react';
import styles from './Input.module.css';
import { IoMdAlert } from 'react-icons/io';

interface propsInput {
  type: string;
  placeholder: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onchange?: ChangeEventHandler<HTMLTextAreaElement>;
  label: string;
  validationText?: string | null;
  className?: any;
  inputStyle?: any;
  textArea?: Boolean;
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

  const effectExitArea = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length === 0) {
      event.target.classList.toggle(styles.input_filled, false);
    }
  };

  const effectEnterArea = (event: FocusEvent<HTMLTextAreaElement>) => {
    (event.target as HTMLTextAreaElement).classList.toggle(styles.input_filled, true);
  };

  return (
    <div className={props.className}>
      <p className={styles.label}>{props.label}</p>

      <div className={styles.input_container}>
        {
          !props.textArea ? 
            <input
              onFocus={effectEnter}
              value={props.value}
              onBlur={effectExit}
              onChange={props.onChange}
              type={props.type}
              placeholder={props.placeholder}
              className={`${styles.input_Login} ${props.inputStyle}`}
            />
            :
            <textarea
              onFocus={effectEnterArea}
              value={props.value}
              onBlur={effectExitArea}
              onChange={props.onchange}
              placeholder={props.placeholder}
              className={`${styles.input_Login} ${props.inputStyle}`}
            />
        }
        
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
    </div>
  );
}

export default Login;
