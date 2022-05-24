import { useState, useRef } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
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
    const [user, SetUser] = useState<number>(0);

    const modalSave = () => {
        TableAdministrationService.fetchUsers();
        setAddUser(false);
    }

    const tableAdmin = useRef<UpdateUsers>(null);

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
            <TableAdministration users={addUser} ref={tableAdmin} />
            {addUser &&
                <UserModal
                    onSave={() => { modalSave() }}
                    onClose={() => { 
                        setAddUser(false);
                        tableAdmin.current?.updateUsers();
                    }}
                />
            }
        </div>
    );
}

export default TableUsers;