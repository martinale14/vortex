import styles from './NavBar.module.css';
import logoWhite from '../../assets/logoWhite.svg';
import profileImg from '../../assets/img_avatar.png';
import { useContext } from 'react';
import { UserContext } from '../../utils/contexts';

interface NavProps {
  back?: Boolean; //Optional value
}

/**
 *
 * @description Button to use in the application
 * @param props props to use in the button component
 * @returns Button component
 */
function NavBar(props: NavProps) {
  const { user } = useContext(UserContext);

  return (
    <nav className={styles.vortex_navbar}>
      <img src={logoWhite} alt="Ana's Logo" />
      <section className={styles.vortex_nav_profile}>
        <img className={styles.vortex_nav_profile_img} src={profileImg} alt='Profile' />
      </section>
      <p className={styles.vortex_nav_name}>
        {user?.name?.split(' ').reduce((prev: string, e: string, i: number) => prev + (i < 2 ? ' ' + e : ''), '')}
      </p>
    </nav>
  );
}

export default NavBar;
