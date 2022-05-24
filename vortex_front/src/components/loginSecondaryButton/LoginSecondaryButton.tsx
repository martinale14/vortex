import { MdArrowLeft } from 'react-icons/md';
import style from './LoginSecondaryButton.module.css';

interface LoginSecondaryButtonProps {
  onClick?: any;
  text: String;
}

const LoginSecondaryButton = (props: LoginSecondaryButtonProps) => {
  return (
    <div className={style.button_design} onClick={props.onClick}>
      <div className={style.buton_icon}>
        <MdArrowLeft size={'120%'} />
      </div>
      <p>{props.text}</p>
      <div className={style.emptyspace}></div>
    </div>
  );
};

export default LoginSecondaryButton;
