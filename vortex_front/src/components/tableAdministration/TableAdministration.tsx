import styles from './TableAdministration.module.css';
import { useEffect, useState } from 'react';
import {HiOutlineCursorClick} from 'react-icons/hi';
import {MdFace} from 'react-icons/md';
import {HiMail} from 'react-icons/hi';
import {FaUserTie} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
//import TablerAdministrationService from './TableAdministrationService';

interface propsTableAdmin{

}

function TableAdministration(_: propsTableAdmin) {
    /**Lógica */
    const [user, setUsers] = useState(false);


 return (
    <table className={styles.vortex_tableAdministration}>
        <thead>
            <tr className={styles.vortex_table_headAdmin}>
                <th className={styles.vortex_th}>
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
            </tr>
        </thead>
        <tbody>
            <tr className={styles.vortex_table_bodyAdmin}>
                <td className={styles.vortex_table_bodyAdminOne}>
                    {/* logica de acción */
                        <button className={styles.vortex_add_buttonDelete} onClick={() => setUsers(true)}> 
                            <MdDelete className={styles.vortex_add_icon}></MdDelete>
                        </button>
                    }
                </td>
                <td className={styles.vortex_table_bodyAdminOne}>
                    {/* logica de nombre */}
                </td>
                <td className={styles.vortex_table_bodyAdminOne}>
                    {/* logica de correo */}
                </td>
                <td className={styles.vortex_table_bodyAdminOne}>
                    {/* logica de rol */}
                </td>
            </tr>
        </tbody>
    </table>
 );

}

export default TableAdministration;