/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useContext, useEffect } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/contexts';
import TableAdministration from '../tableAdministration/TableAdministration';
import TableAdministrationService from '../tableAdministration/TableAdministrationServices';
import UserModal from '../userModal/UserModal';
import styles from './TableUsers.module.css';

interface UpdateUsers {
  updateUsers(): void;
}

function TableUsers() {
  //Variables
  const [addUser, setAddUser] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const modalSave = () => {
    TableAdministrationService.fetchUsers();
    setAddUser(false);
  };

  useEffect(() => {
    if (user.role !== 'Administrador') navigate('/home');
  }, []);

  const tableAdmin = useRef<UpdateUsers>(null);

  return (
    <div className={styles.vortex_container}>
      <div className={styles.container_administrationUser}>
        <p className={styles.vortex_welcome}>Administrar usuarios</p>
        <div
          className={styles.vortex_button_add_new_user}
          onClick={() => {
            setAddUser(true);
          }}
        >
          <AiFillPlusCircle className={styles.vortex_add_icon}></AiFillPlusCircle>
          <p>Nuevo usuario</p>
        </div>
      </div>
      <TableAdministration users={addUser} ref={tableAdmin} />
      {addUser && (
        <UserModal
          onSave={() => {
            modalSave();
          }}
          onClose={() => {
            setAddUser(false);
            tableAdmin.current?.updateUsers();
          }}
        />
      )}
    </div>
  );
}

export default TableUsers;
