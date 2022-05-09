import styles from './MenuBar.module.css';
import home from '../../assets/home.svg';
import template from '../../assets/template.svg';
import administrator from '../../assets/administrator.svg';
import user from '../../assets/user.svg';

interface MenuProps {
  back?: Boolean;
}

function MenuBar(props: MenuProps) {
  return (
    <div className={styles.vortex_menuBar}>
      <div className={styles.vortex_container_img}>
        <img src={home} alt='Home' />
        <img src={administrator} alt='Administrator' />
        <img src={template} alt='Templates' />
        <img src={user} alt='User' />
        </div>
        <div className={styles.vortex_text}>
          <p>Inicio</p>
          <p>Administrar</p>
          <p>Plantillas</p>
          <p>Mi perfil</p>
        </div>
    </div>
  );
}

export default MenuBar;
