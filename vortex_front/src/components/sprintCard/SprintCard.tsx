import styles from './SprintCard.module.css'
import { IoMdArrowDropright } from 'react-icons/io'
import formatDate from '../../utils/FormatDate'

interface propsSprint {
    sprint: Sprint;
    onClick: any;
    key: string;
    index: string;
}

interface Sprint {
    startDate: Date;
    endDate: Date;
    status: string;
}

function SprintCard(props: propsSprint) {
    const sprint = props.sprint;
    return (
        <div className={styles.vortex_sprint_card} onClick={props.onClick}>
            <header className={styles.vortex_sprint_header}>
                <p>Sprint # {props.index}</p>
                <IoMdArrowDropright className={styles.arrow}/>
            </header>
            <article className={styles.vortex_sprint_body}>
                <p className={styles.vortex_sprint_date}>{`Inicio: ${formatDate(new Date(sprint.startDate))}`}</p>
                <p className={styles.vortex_sprint_date}>{`Fin: ${formatDate(new Date(sprint.endDate))}`}</p>
                <p className={styles.vortex_sprint_status}>{`Estado: ${sprint.status}`}</p>
            </article>
        </div>
    )
}

export default SprintCard;