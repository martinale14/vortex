import styles from './NavBar.module.css';
import logoWhite from '../../assets/logoWhite.svg'

interface NavProps {
  back? : Boolean //Optional value
}

/**
 * 
 * @description Button to use in the application
 * @param props props to use in the button component
 * @returns Button component
 */
function NavBar(props: NavProps) {
    return (
        <nav className={styles.vortex_navbar}>
        
            <img src={logoWhite} alt="Ana's Logo" />
        
        </nav>);
}

export default NavBar;