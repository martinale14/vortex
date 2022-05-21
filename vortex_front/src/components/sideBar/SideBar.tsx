import styles from './SideBar.module.css';
import { IoMdArrowDroprightCircle, IoMdDocument } from 'react-icons/io'
import { FaHome } from 'react-icons/fa'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { MdAdminPanelSettings } from 'react-icons/md'
import Button from '../button/Button';

interface sideProps {
    back?: Boolean;
  }

function SideBar(props: sideProps) {
    return (
        <div className={styles.vortex_side_bar}>
            <section className={styles.vortex_side_bar_section}>
                <div className={styles.vortex_container_img}>
                    <FaHome className={styles.vortex_side_icon}/>
                </div>
                <p>Inicio</p>
            </section>
            <section className={styles.vortex_side_bar_section}>
                <div className={styles.vortex_container_img}>
                    <MdAdminPanelSettings className={styles.vortex_side_icon}/>
                </div>
                <p>Administrar</p>
            </section>
            <section className={styles.vortex_side_bar_section}>
                <div className={styles.vortex_container_img}>
                    <IoMdDocument className={styles.vortex_side_icon}/>
                </div>
                <p>Plantillas</p>
            </section>
            <section className={styles.vortex_side_bar_section}>
                <div className={styles.vortex_container_img}>
                    <IoPersonCircleSharp className={styles.vortex_side_icon}/>
                </div>
                <p>Mi perfil</p>
            </section>
            <div>
                <button type='submit' className={styles.vortex_side_bar_button_sign_off}> <IoMdArrowDroprightCircle className={styles.arrow}/>Cerrar sesión</button>
            </div>
        </div>
      );
}

export default SideBar;