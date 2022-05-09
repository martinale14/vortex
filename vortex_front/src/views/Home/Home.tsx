import NavBar from '../../components/navBar/NavBar';
import SideBar from '../../components/sideBar/SideBar';
import Table from '../../components/table/Table';
import styles from './Home.module.css';

interface propsLogin {}
function Home(props: propsLogin) {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.container_body}>
        <section className={styles.vortex_body_home}>
          <SideBar />
        </section>
        <section className={styles.vortex_main_container_body}>
          <p className={styles.vortex_welcome}>Bienvenido prro</p>
          <Table />
        </section>
      </div>
    </div>
  );
}
export default Home;
