import styles from './TableAdministration.module.css';
import { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { MdDelete, MdFace } from 'react-icons/md';
import { HiMail } from 'react-icons/hi';
import { FaUserEdit, FaUserTie } from 'react-icons/fa';
import TableAdministrationService from './TableAdministrationServices';
import UserModal from '../userModal/UserModal';

interface propsTableAdmin {
  users: any;
}

const TableAdministration = forwardRef((props: propsTableAdmin, ref) => {
  /**Lógica */
  const [users, setUsers] = useState<any[]>([]);
  const [addUser, setAddUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [addUser]);

  useImperativeHandle(ref, () => ({
    updateUsers() {
      fetchUsers();
    }
  }));

  const fetchUsers = async () => {
    const data = await TableAdministrationService.fetchUsers();
    setUsers(data);
  };

  return (
    <table className={styles.vortex_tableAdministration}>
      <thead>
        <tr className={styles.vortex_table_headAdmin}>
          <th className={styles.vortex_th_action}>
            <div className={styles.vortex_tableAdmin_head_container}>
              <HiOutlineCursorClick className={styles.vortex_add_icon}></HiOutlineCursorClick>
              <p>Acción</p>
            </div>
          </th>
          <th className={styles.vortex_th}>
            <div className={styles.vortex_tableAdmin_head_container}>
              <MdFace className={styles.vortex_add_icon}></MdFace>
              <p>Nombre</p>
            </div>
          </th>
          <th className={styles.vortex_th}>
            <div className={styles.vortex_tableAdmin_head_container}>
              <HiMail className={styles.vortex_add_icon}></HiMail>
              <p>Correo</p>
            </div>
          </th>
          <th className={styles.vortex_th}>
            <div className={styles.vortex_tableAdmin_head_container}>
              <FaUserTie className={styles.vortex_add_icon}></FaUserTie>
              <p>Rol</p>
            </div>
          </th>
          <th className={styles.vortex_th_action}>
            <div className={styles.vortex_tableAdmin_head_container}>
              <MdFace className={styles.vortex_add_icon}></MdFace>
              <p>Eliminar usuario</p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.vortex_table_bodyAdmin}>
          <td className={styles.vortex_table_bodyAdminTwo}>
            {
              /* logica para editar usuario */
              users.map((_, i) => {
                return (
                  <div key={'user_' + i} className={styles.vortex_table_bodyAdmin_info_actions}>
                    <button
                      className={styles.vortex_add_buttonDelete}
                      onClick={() => {
                        setAddUser(true);
                      }}
                    >
                      <FaUserEdit className={styles.vortex_add_icon}></FaUserEdit>
                    </button>
                  </div>
                );
              })
            }
            {addUser && (
              <UserModal
                onSave={() => {
                  TableAdministrationService.fetchUsers();
                }}
                onClose={() => {
                  setAddUser(false);
                }}
              />
            )}
          </td>
          <td className={styles.vortex_table_bodyAdminTwo}>
            {
              /* logica de nombre */
              users.map((user, i) => {
                return (
                  <div key={'user2_' + i} className={styles.vortex_table_bodyAdmin_info}>
                    <p>{user.name}</p>
                  </div>
                );
              })
            }
          </td>
          <td className={styles.vortex_table_bodyAdminTwo}>
            {
              /* logica de correo */
              users.map((user, i) => {
                return (
                  <div key={'user3_' + i} className={styles.vortex_table_bodyAdmin_info}>
                    <p>{user.email}</p>
                  </div>
                );
              })
            }
          </td>
          <td className={styles.vortex_table_bodyAdminTwo}>
            {
              /* logica de rol */
              users.map((user, i) => {
                return (
                  <div key={'user4_' + i} className={styles.vortex_table_bodyAdmin_info}>
                    <p>{user.role}</p>
                  </div>
                );
              })
            }
          </td>
          <td className={styles.vortex_table_bodyAdminTwo}>
            {
              /* logica para desactivar/eliminar usario */
              users.map((_, i) => {
                return (
                  <div key={'user5_' + i} className={styles.vortex_table_bodyAdmin_info_actions_delete}>
                    <button className={styles.vortex_add_buttonDelete} onClick={() => {}}>
                      <MdDelete className={styles.vortex_add_icon}></MdDelete>
                    </button>
                  </div>
                );
              })
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
});

export default TableAdministration;
