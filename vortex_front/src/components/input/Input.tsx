import styles from './Input.module.css';

interface propsInput {
  type: string;
  placeholder: string;
}
function Login(props: propsInput) {
  return <input type={props.type} placeholder={props.placeholder} className={styles.input_Login} />;
}
export default Login;
