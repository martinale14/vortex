import NavBar from '../../components/navBar/NavBar';
import SideBar from '../../components/sideBar/SideBar';
import styles from './Home.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/contexts';
import { useContext, useEffect } from 'react';
import LoginService from '../Login/LoginService';
import Loading from '../../components/loading/Loading';

interface propsLogin {}
function Home(_: propsLogin) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    initialize();
  });

  const initialize = async () => {
    if (user === null) {
      const usr = await LoginService.verifySession();
      if (usr !== undefined) {
        setUser(usr);
      } else {
        navigate('/');
      }
    }
  };

  if (user !== null) {
    return (
      <div className={styles.container}>
        <NavBar />
        <div className={styles.container_body}>
          <section className={styles.vortex_body_home}>
            <SideBar />
          </section>
          <section className={styles.vortex_main_container_body}>
            <p className={styles.vortex_welcome}>
              Bienvenido{' '}
              {user?.name?.split(' ').reduce((prev: string, e: string, i: number) => prev + (i < 2 ? ' ' + e : ''), '')}
            </p>
            <Outlet />
          </section>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}
export default Home;
