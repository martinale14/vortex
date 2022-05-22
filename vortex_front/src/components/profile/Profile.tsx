import styles from './Profile.module.css';
import backProfile from '../../assets/backCopy.png';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/contexts';
import profileImg from '../../assets/img_avatar.png';
import Button from '../button/Button';
import ProfileInput from '../profileInput/ProfileInput';

function Profile() {
  const { user } = useContext(UserContext);

  const [phone, setPhone] = useState(user.phone);
  const [updated, setUpdated] = useState(user.updatedAt);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const created = user.createdAt;

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
              <ProfileInput readOnly type='text' label='Nombre' text={name}/>
              <ProfileInput readOnly type='text' label='Correo' text={email}/>
              <ProfileInput type='number' label='Teléfono' defaultValue={phone} onChange={(e) => {setPhone(e.target.value)}}/>
            </div>
            <div className={styles.vortex_profile_dates}>
              <ProfileInput readOnly type='text' label='Fecha de creación' text={created} />
              <ProfileInput readOnly type='text' label='Fecha de última modificación' text='15/5/2022' />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

export default Profile;
