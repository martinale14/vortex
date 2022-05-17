import NavBar from '../../components/navBar/NavBar';
import SideBar from '../../components/sideBar/SideBar';
import Table from '../../components/table/Table';
import Profile from '../../components/profile/Profile';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/contexts';
import { useContext, useEffect } from 'react';

interface propsLogin {}
function Home(_: propsLogin) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  });

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.container_body}>
        <section className={styles.vortex_body_home}>
          <SideBar />
        </section>
        <section className={styles.vortex_main_container_body}>
          <p className={styles.vortex_welcome}>Bienvenido {user?.name?.split(' ').reduce((prev: string, e: string, i: number) => prev + (i < 2 ? ' ' + e : ''), '')}</p>
          <Table />
        </section>
        {/* <Profile/> */}
      </div>
    </div>
  );
}
export default Home;
