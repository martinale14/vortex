import styles from './SprintModal.module.css';
import line from '../../assets/lineOrange.svg';
import exit from '../../assets/exit.svg';
import sprint from '../../assets/sprint.svg';
import Input from '../input/Input';
import Button from '../button/Button';
import { useContext, useState } from 'react';
import { UserContext } from '../../utils/contexts';
import SprintModalService from './SprintModalService';

interface sprintProps {
  onClose?: any;
  onSave?: any;
  projectId: number;
}

const SprintModal = (props: sprintProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [startValidation, setStartValidation] = useState<string | null>(null);
  const [endValidation, setEndValidation] = useState<string | null>(null);

  const { user } = useContext<{ user: any; setUser: any }>(UserContext);

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
          <Input
            type='date'
            placeholder='dd/mm/aaaa'
            label='Fecha de inicio'
            onChange={(e: any) => {
              setStartDate(e.target.value);
              e.target.value === '' ? setStartValidation('Campo obligatorio') : setStartValidation(null)
            }}
            validationText={startValidation}
          />
          <Input
            type='date'
            placeholder='dd/mm/aaaa'
            label='Fecha de fin'
            onChange={(e: any) => {
              setEndDate(e.target.value);
              e.target.value === '' ? setEndValidation('Campo obligatorio') : setEndValidation(null)
            }}
            validationText={endValidation}
          />
        </div>
        <div className={styles.vortex_button_save}>
          <Button
            text={'Guardar'}
            onClick={async () => {
              await SprintModalService.createSprint({
                startDate,
                endDate,
                status: 'Abierto',
                createdBy: user.id,
                projectId: props.projectId
              });
              props.onSave(props.projectId);
              props.onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SprintModal;
