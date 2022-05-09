import NavBar from '../../components/navBar/NavBar';
import MenuBar from '../../components/menuBar/MenuBar';
import Table from '../../components/table/Table';
import styles from './Home.module.css';

interface propsLogin {}
function Home(props: propsLogin) {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.container_body}>
      <Table />
        <div className={styles.vortex_body_home}>
          <MenuBar />
        </div>
      </div>
    </div>
  );
}
export default Home;
