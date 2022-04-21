import styles from './Input.module.css';

interface propsInput {
  type: string;
  placeholder: string;
  value? : string;
  onChange: any;
  label? : string;
}

function Login(props: propsInput) {
    return <input value={props.value} onChange={props.onChange} type={props.type} placeholder={props.placeholder} className={styles.input_Login} />;
}

export default Login;
