import styles from './SideBar.module.css';
import { IoMdDocument } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../button/Button';

interface sideProps {
  back?: Boolean;
}

function SideBar(_: sideProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const verifyActive = () => {
    const elements = document.getElementsByClassName(styles.vortex_side_bar_section);

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (location.pathname === element.id.split(':')[1]) {
        element.classList.toggle(styles.active, true);
      } else {
        element.classList.toggle(styles.active, false);
      }
    }
  };
  
  useEffect(() => {
    document.getElementsByClassName(styles.vortex_side_bar_section);
    verifyActive();
  });

  return (
    <div className={styles.vortex_side_bar}>
      <section id='to:/home' className={styles.vortex_side_bar_section} onClick={() => navigate('/home')}>
        <div className={styles.vortex_container_img}>
          <FaHome className={styles.vortex_side_icon} />
        </div>
        <p>Inicio</p>
      </section>
      <section id='to:/home/admin' className={styles.vortex_side_bar_section} onClick={() => navigate('/home/admin')}>
        <div className={styles.vortex_container_img}>
          <MdAdminPanelSettings className={styles.vortex_side_icon} />
        </div>
        <p>Administrar</p>
      </section>
      <section
        id='to:/home/templates'
        className={styles.vortex_side_bar_section}
        onClick={() => navigate('/home/templates')}
      >
        <div className={styles.vortex_container_img}>
          <IoMdDocument className={styles.vortex_side_icon} />
        </div>
        <p>Plantillas</p>
      </section>
      <section
        id='to:/home/profile'
        className={styles.vortex_side_bar_section}
        onClick={() => navigate('/home/profile')}
      >
        <div className={styles.vortex_container_img}>
          <IoPersonCircleSharp className={styles.vortex_side_icon} />
        </div>
        <p>Mi perfil</p>
      </section>
      <div className={styles.vortex_sign_out}>
        <Button text='Cerrar sesión' back noArrow/>
      </div>
    </div>
  );
}

export default SideBar;
