import { isVisible } from '@testing-library/user-event/dist/utils';
import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import TableAdministration from '../tableAdministration/TableAdministration';
import TableAdministrationService from '../tableAdministration/TableAdministrationServices';
import UserModal from '../userModal/UserModal';
import styles from './TableUsers.module.css';

interface PropsTableUsers {
    onClose?: any;
}

function TableUsers(props: PropsTableUsers) {

    //Variables
    const [addUser, setAddUser] = useState(false);
    var [isVisible, setIsVisible] = useState(false);

    const modalSave = () => {
        TableAdministrationService.fetchUsers();
        props.onClose();
    }

    return (
        <div className={styles.vortex_container}>
            <div className={styles.container_administrationUser}>
                <p className={styles.vortex_welcome}>Administrar usuarios</p>
                <div className={styles.vortex_button_add_new_user} onClick={() => { setAddUser(true) }}>
                    <AiFillPlusCircle
                        className={styles.vortex_add_icon}
                    ></AiFillPlusCircle>
                    <p>Nuevo usuario</p>
                </div>
            </div>
            <TableAdministration users={addUser} />
            {addUser &&
                <UserModal
                    onSave={() => { modalSave() }}
                    onClose={() => { setAddUser(false) }}
                />
            }
        </div>
    );
}

export default TableUsers;