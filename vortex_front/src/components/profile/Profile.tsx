import styles from './Profile.module.css';
import backProfile from '../../assets/backCopy.png';
import { useContext } from 'react';
import { UserContext } from '../../utils/contexts';
import profileImg from '../../assets/img_avatar.png';
import Button from '../button/Button';
import ProfileInput from '../profileInput/ProfileInput';

function Profile() {
  const { user } = useContext(UserContext);

  return (
    <article className={styles.vortex_main_container_body}>
      <section className={styles.vortex_background_profile}>
        <img src={backProfile} alt='Profile Background' />
      </section>
      <section className={styles.vortex_profile_section}>
        <div className={`${styles.vortex_profile_user} ${styles.vortex_profile_box}`}>
          <div className={styles.vortex_profile_image_container}>
            <img src={user?.pictureUrl || profileImg} alt='User pic' />
          </div>
          <div className={styles.vortex_profile_userinfo}>
            <div className={styles.vortex_profile_username}>
              <p className={styles.vortex_username}>{user?.name}</p>
              <p className={styles.vortex_user_role}>{user?.role}</p>
            </div>
            <div className={styles.vortex_edit_profile}>
              <Button text='Editar perfil' noArrow />
            </div>
          </div>
        </div>
        <div className={`${styles.vortex_profile_information} ${styles.vortex_profile_box}`}>
          <div className={styles.vortex_profile_input_container}>
            <div className={styles.vortex_profile_main_info}>
              <ProfileInput label='Nombre' text='Juan Pablo' />
              <ProfileInput label='Correo' text='juanpari1766@vortexbird.com' />
              <ProfileInput label='Teléfono' text='3015428044' />
            </div>
            <div className={styles.vortex_profile_dates}>
              <ProfileInput label='Fecha de creación' text='10/5/2022' />
              <ProfileInput label='Fecha de última modificación' text='15/5/2022' />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

export default Profile;
