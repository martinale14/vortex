import styles from './Home.module.css';
import backgrounLogin from '../../assets/Background.svg';
import logo from '../../assets/logo.svg';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import NavBar from '../../components/navBar/NavBar'
import Table from '../../components/table/Table'

interface propsLogin {}
function Login(props: propsLogin) {
  return (
    <div>
      <NavBar />
      <Table/>
    </div>
  );
}
export default Login;
