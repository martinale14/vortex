import styles from './SideBar.module.css';
import { IoMdDocument } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface sideProps {
  back?: Boolean;
}

function SideBar(_: sideProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const verifyActive = () => {
    const elements = document.getElementsByClassName(styles.vortex_side_bar_section);

    for (let element in elements) {
      console.log(location);
      console.log(element);
    }
  };

  useEffect(() => {
    debugger;
    document.getElementsByClassName(styles.vortex_side_bar_section);
    verifyActive();
  });

  return (
    <div className={styles.vortex_side_bar}>
      <section className={styles.vortex_side_bar_section} onClick={() => navigate('/home')}>
        <div className={styles.vortex_container_img}>
          <FaHome className={styles.vortex_side_icon} />
        </div>
        <p>Inicio</p>
      </section>
      <section className={styles.vortex_side_bar_section} onClick={() => navigate('/home/admin')}>
        <div className={styles.vortex_container_img}>
          <MdAdminPanelSettings className={styles.vortex_side_icon} />
        </div>
        <p>Administrar</p>
      </section>
      <section className={styles.vortex_side_bar_section} onClick={() => navigate('/home/templates')}>
        <div className={styles.vortex_container_img}>
          <IoMdDocument className={styles.vortex_side_icon} />
        </div>
        <p>Plantillas</p>
      </section>
      <section className={styles.vortex_side_bar_section} onClick={() => navigate('/home/profile')}>
        <div className={styles.vortex_container_img}>
          <IoPersonCircleSharp className={styles.vortex_side_icon} />
        </div>
        <p>Mi perfil</p>
      </section>
    </div>
  );
}

export default SideBar;
