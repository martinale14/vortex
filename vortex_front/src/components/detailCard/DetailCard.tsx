import { IoMdArrowDropright } from 'react-icons/io';
import styles from './DetailCard.module.css'

interface detailsProps{
    onClick: any;
    title: string;
}

function DetailCard(props: detailsProps){
    return(
        <div className={styles.vortex_sprint_card} onClick={props.onClick}>
            <header className={styles.vortex_sprint_header}>
                <p>{props.title}</p>
                <IoMdArrowDropright className={styles.arrow}/>
            </header>
            <article className={styles.vortex_sprint_body}>
                <p className={styles.vortex_sprint_date}>{`Inicio: `}</p>
                <p className={styles.vortex_sprint_date}>{`Fin: `}</p>
            </article>
        </div>
    );
}

export default DetailCard;