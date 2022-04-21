import styles from './dropdown.module.css';
import { IoMdAlert } from 'react-icons/io';

interface propsInput {
  placeholder: string;
  onChange: any;
  label: string;
  validationText?: string | null;
  options :string [];
  values : number[];
}

function Login(props: propsInput) {
  const effectExit = (event: any):any => {
    if (event.target.value.length === 0) {
      event.target.classList.toggle(styles.input_filled, false);
    }
  };

  const effectEnter = (event: any):any => {
    (event.target as HTMLInputElement).classList.toggle(styles.input_filled, true);
  };

  return (
    <div>
      <p className={styles.label}>{props.label}</p>

      <div className={styles.input_container}>
        <select
          defaultValue={0}
          onBlur={effectExit}
          onChange={(event) => {
            props.onChange(event);
          }}
          onClick={effectEnter}
          placeholder={props.placeholder}
          className={styles.input_Login}
        >
          {props.options.map((opt, i) => <option value={props.values[i]} key={'opt_' + i}>{opt}</option>)}
        </select>
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
