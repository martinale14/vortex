import NavBar from '../../components/navBar/NavBar';
import SideBar from '../../components/sideBar/SideBar';
import Table from '../../components/table/Table';
import Profile from '../../components/profile/Profile';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/contexts';
import { useContext, useEffect } from 'react';
import TableAdministration from '../../components/tableAdministration/TableAdministration';
//Icons
import { AiFillPlusCircle } from 'react-icons/ai';

interface propsLogin { }
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
          <section className={styles.vortex_main_container_administration}>
            <p className={styles.vortex_welcome}>Administrar usuarios {/* {user?.name?.split(' ').reduce((prev: string, e: string, i: number) => prev + (i < 2 ? ' ' + e : ''), '')} */}</p>
            <section className={styles.vortex_main_container_administration_two}>
              <AiFillPlusCircle ></AiFillPlusCircle>
              <p>Nuevo usuario</p>
            </section>
          </section>
          <Table />
          {/* NOTA... De forma temporal, se comenta el componente <Table> para visualizar el nuevo componente <TableAdministration> de la misma forma con todos aquellos comentados en esta view... */}
          {/* <TableAdministration /> */}
        </section>
        {/* Section -container_administration-, para agregar button de nuevo usuario... */}
        {/* <Profile/> */}
      </div>
    </div>
  );
}
export default Home;
