import NavBar from '../../components/navBar/NavBar';
import Table from '../../components/table/Table';

interface propsLogin {}
function Login(props: propsLogin) {
  return (
    <div>
      <NavBar />
      <Table />
    </div>
  );
}
export default Login;
