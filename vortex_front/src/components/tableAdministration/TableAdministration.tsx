import styles from './TableAdministration.module.css';
import { useEffect, useState } from 'react';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { MdFace } from 'react-icons/md';
import { HiMail } from 'react-icons/hi';
import { FaUserTie } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
//import TablerAdministrationService from './TableAdministrationService';

interface propsTableAdmin {

}

function TableAdministration(_: propsTableAdmin) {
    /**Lógica */
    const [user, setUsers] = useState(false);


    return (
        <table className={styles.vortex_tableAdministration}>
            <thead>
                <tr className={styles.vortex_table_headAdmin}>
                    <th className={styles.vortex_th_action} >
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
                    <td className={styles.vortex_table_bodyAdminTwo}>
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <button className={styles.vortex_add_buttonDelete} onClick={() => setUsers(true)}>
                                <MdDelete className={styles.vortex_add_icon}></MdDelete>
                            </button>
                            <p>Editar</p>
                        </div>
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <button className={styles.vortex_add_buttonDelete} onClick={() => setUsers(true)}>
                                <MdDelete className={styles.vortex_add_icon}></MdDelete>
                            </button>
                            <p>Editar</p>
                        </div>
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <button className={styles.vortex_add_buttonDelete} onClick={() => setUsers(true)}>
                                <MdDelete className={styles.vortex_add_icon}></MdDelete>
                            </button>
                            <p>Editar</p>
                        </div>
                    </td>
                    <td className={styles.vortex_table_bodyAdminTwo}>
                        {/* logica de nombre */}
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <p>Maria Alejandra Rodriguez Potes</p>
                        </div>
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <p>Andres Fernando Bustamante Arias</p>
                        </div>
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <p>Jairo Hernán Gaviria Fernandez</p>
                        </div>
                    </td>
                    <td className={styles.vortex_table_bodyAdminTwo}>
                        {/* logica de correo */}
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <p>maria_aleja@hotmail.com</p>
                        </div>
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <p>fernadez.ing@gmail.com</p>
                        </div>
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <p>jhg@hotmail.com</p>
                        </div>
                    </td>
                    <td className={styles.vortex_table_bodyAdminTwo}>
                        {/* logica de rol */}
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <p>Analista de desarrollo</p>
                        </div>
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <p>Gerente</p>
                        </div>
                        <div className={styles.vortex_table_bodyAdmin_info}>
                            <p>Desarrollador</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );

}

export default TableAdministration;