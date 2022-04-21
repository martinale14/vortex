import styles from './Table.module.css'
import { AiFillPlusCircle } from 'react-icons/ai'

interface propsTable {}

function Table(props: propsTable) {
    return (
        <table className={styles.vortex_table}>
            <tr className={styles.vortex_table_head}>
                <th>
                    <div className={styles.vortex_table_head_container}>
                        <p>Empresas</p>
                        <button className={styles.vortex_add_button}>
                            <AiFillPlusCircle className={styles.vortex_add_icon}/>
                        </button>
                    </div>
                </th>
                <th>
                    <div className={styles.vortex_table_head_container}>
                        <p>Proyectos</p>
                        <button className={styles.vortex_add_button}>
                            <AiFillPlusCircle className={styles.vortex_add_icon}/>
                        </button>
                    </div>
                </th>
                <th>
                    <div className={styles.vortex_table_head_container}>
                        <p>Sprints</p>
                        <button className={styles.vortex_add_button}>
                            <AiFillPlusCircle className={styles.vortex_add_icon}/>
                        </button>
                    </div>
                </th>
                <th>
                    <div className={styles.vortex_table_head_container}>
                        <p>Historias de usuario</p>
                        <button className={styles.vortex_add_button}>
                            <AiFillPlusCircle className={styles.vortex_add_icon}/>
                        </button>
                    </div>
                </th>
            </tr>
            <tr className={styles.vortex_table_body}>
                <td className={styles.vortex_table_body_one}>
                    <div>
                        <p>Loui</p>
                    </div>
                    <div>
                        <p>Loui</p>
                    </div>
                    <div>
                        <p>Sigamos</p>
                    </div>
                </td>
                <td className={styles.vortex_table_body_one}>
                    <div>
                        <p>ConcertApp</p>
                    </div>
                    <div>
                        <p>ConcertPWA</p>
                    </div>
                    <div>
                        <p>Sistema de compras</p>
                    </div>
                    <div>
                        <p>Admin Nómina</p>
                    </div>
                </td>
                <td>
                    <p>holaaa</p>
                    <p>holaaa</p>
                    <p>holaaa</p>
                    <p>holaaa</p>
                </td>
                <td>
                    <p>holaaa</p>
                    <p>holaaa</p>
                    <p>holaaa</p>
                    <p>holaaa</p>
                </td>
            </tr>
        </table>
    )
}

export default Table;