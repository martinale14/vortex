import styles from './SprintModal.module.css';
/* import {sprint} from '../../assets/sprint.svg';
import {calendar} from '../../assets/calendar.svg'; */
import line from '../../assets/lineOrange.svg';
import exit from '../../assets/exit.svg';
import Input from '../input/Input';
import Button from '../button/Button';

interface sprintProps { }

function SprintModal (props: sprintProps){
    return(
        <div className={styles.vortex_background}>
            <div className={styles.vortex_cardSprint}>
                <div className={styles.vortex_cardSprint_header}>
                    <img src={exit} alt="exit" />
                    {/* <img src={sprint} alt="sprints" /> */}
                    <h2>Nuevo sprint</h2>
                </div>
                <img src={line} alt="line"/>
                <div className={styles.vortex_cardSprint_date}>
                    <Input type='date' placeholder='dd/mm/aaaa' label='Fecha de inicio' onChange={(e : any) => {}}/>
                    <Input type='date' placeholder='dd/mm/aaaa' label='Fecha de fin' onChange={(e : any) => {}}/>
                </div>
                <Button text="Guardar"/>
            </div>
        </div>
    );
}

export default SprintModal;