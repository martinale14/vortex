import NavBar from '../../components/navBar/NavBar';
import SideBar from '../../components/sideBar/SideBar';
import styles from './Home.module.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/contexts';
import { useContext, useEffect } from 'react';
import LoginService from '../Login/LoginService';
import Loading from '../../components/loading/Loading';

interface propsLogin {}
function Home(_: propsLogin) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

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

  const defineTitle = () => {
    switch (location.pathname) {
      case '/home/admin':
        return <p className={styles.vortex_welcome}>Administrar usuarios</p>;
      default:
        return (
          <p className={styles.vortex_welcome}>
            Bienvenido{' '}
            {user?.name?.split(' ').reduce((prev: string, e: string, i: number) => prev + (i < 2 ? ' ' + e : ''), '')}
          </p>
        );
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
          {location.pathname === '/home/profile' ? (
            <Outlet />
          ) : (
            <section className={styles.vortex_main_container_body}>
              {defineTitle()}
              <Outlet />
            </section>
          )}
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}
export default Home;
