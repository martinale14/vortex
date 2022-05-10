import styles from './SprintModal.module.css';
import line from '../../assets/lineOrange.svg';
import exit from '../../assets/exit.svg';
import sprint from '../../assets/sprint.svg';
import Input from '../input/Input';
import Button from '../button/Button';

interface sprintProps {
  onClose?: any;
}

function SprintModal(props: sprintProps) {
  return (
    <div className={styles.vortex_background}>
      <div className={styles.vortex_cardSprint}>
        <div className={styles.vortex_cardSprint_header}>
          <img src={exit} className={styles.vortex_imgExit} alt='exit' onClick={props.onClose} />
          <img src={sprint} className={styles.vortex_imgSprint} alt='sprints' />
          <h2>Nuevo sprint</h2>
        </div>
        <img src={line} className={styles.vortex_imgLine} alt='line' />
        <p className={styles.vortex_text}>Por favor ingrese los siguientes datos para crear un nuevo sprint:</p>
        <div className={styles.vortex_cardSprint_date}>
          <Input type='date' placeholder='dd/mm/aaaa' label='Fecha de inicio' onChange={(e: any) => {}} />
          <Input type='date' placeholder='dd/mm/aaaa' label='Fecha de fin' onChange={(e: any) => {}} />
        </div>
        <div className={styles.vortex_button_save}>
          <Button text={'Guardar'} />
        </div>
      </div>
    </div>
  );
}

export default SprintModal;
