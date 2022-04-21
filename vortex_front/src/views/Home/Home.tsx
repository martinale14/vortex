import NavBar from '../../components/navBar/NavBar';
import Table from '../../components/table/Table';
import styles from './Home.module.css';

interface propsLogin {}
function Home(props: propsLogin) {
  return (
    <div className={styles.container}>
      <NavBar />
      <Table />
    </div>
  );
}
export default Home;
