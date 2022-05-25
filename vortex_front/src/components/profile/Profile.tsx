import styles from './Profile.module.css';
import backProfile from '../../assets/backCopy.png';
import { useContext, useState } from 'react';
import { UserContext } from '../../utils/contexts';
import profileImg from '../../assets/img_avatar.png';
import Button from '../button/Button';
import ProfileInput from '../profileInput/ProfileInput';
import ProfileService from './ProfileService';
import { toast } from 'react-hot-toast';
import LoginService from '../../views/Login/LoginService';

function Profile() {
  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [updated] = useState(user.updatedAt);
  const created = user.createdAt;

  const updateImage = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = async (e: any) => {
      if (e.target.files.length > 0) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('id', user.id);
        const result: any = await ProfileService.updateImage(formData);
        if (result.status === 200) {
          toast.success(result.data.result);
          const usr = await LoginService.verifySession();
          setUser(usr);
        } else {
          toast.error(result.data.result);
        }

        input.remove();
      }
    };

    input.click();
    document.getElementById('file-input')?.click();
  };

  const updateUser = async (_: any) => {
    const result: any = await ProfileService.updateProfile({
      name,
      phone,
      email,
      id: user.id
    });
    if (result.status === 200) {
      toast.success('Actualización de perfil exitosa');

      const usr = await LoginService.verifySession();
      setUser(usr);
    } else {
      toast.error('Hubo un error actualizando tu perfil');
    }
  };

  return (
    <article className={styles.vortex_main_container_body}>
      <section className={styles.vortex_background_profile}>
        <img src={backProfile} alt='Profile Background' />
      </section>
      <section className={styles.vortex_profile_section}>
        <div className={`${styles.vortex_profile_user} ${styles.vortex_profile_box}`}>
          <div className={styles.vortex_profile_image_container}>
            <div onClick={updateImage}>Pulsa para actualizar</div>
            <img src={user?.pictureUrl || profileImg} alt='User pic' />
          </div>
          <div className={styles.vortex_profile_userinfo}>
            <div className={styles.vortex_profile_username}>
              <p className={styles.vortex_username}>{user?.name}</p>
              <p className={styles.vortex_user_role}>{user?.role}</p>
            </div>
            <div className={styles.vortex_edit_profile}>
              <Button onClick={updateUser} text='Guardar perfil' noArrow />
            </div>
          </div>
        </div>
        <div className={`${styles.vortex_profile_information} ${styles.vortex_profile_box}`}>
          <div className={styles.vortex_profile_input_container}>
            <div className={styles.vortex_profile_main_info}>
              <ProfileInput
                type='text'
                label='Nombre'
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <ProfileInput
                type='text'
                label='Correo'
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <ProfileInput
                type='number'
                label='Teléfono'
                defaultValue={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className={styles.vortex_profile_dates}>
              <ProfileInput readOnly type='text' label='Fecha de creación' date={new Date(created)} />
              <ProfileInput readOnly type='text' label='Fecha de última modificación' date={new Date(updated)} />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

export default Profile;
