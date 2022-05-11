import styles from './SprintModal.module.css';
import line from '../../assets/lineOrange.svg';
import exit from '../../assets/exit.svg';
import sprint from '../../assets/sprint.svg';
import Input from '../input/Input';
import Button from '../button/Button';
import axios from '../../utils/axios_config';
import { HEADERS, CREATE_SPRINT } from '../../utils/url_utils';
import { useContext, useState } from 'react';
import { UserContext } from '../../utils/contexts';

interface sprintProps {
  onClose?: any;
  projectId?: number;
}

const SprintModal = (props: sprintProps) => {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const {user} = useContext<{user : any, setUser:any}>(UserContext);

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
          <Input type='date' placeholder='dd/mm/aaaa' label='Fecha de inicio' onChange={(e: any) => {setStartDate(e.target.value)}} />
          <Input type='date' placeholder='dd/mm/aaaa' label='Fecha de fin' onChange={(e: any) => {setEndDate(e.target.value)}} />
        </div>
        <div className={styles.vortex_button_save}>
          <Button text={'Guardar'} onClick={() => {
            fetch(CREATE_SPRINT, {
              method:'POST', 
              headers: HEADERS,
              body:JSON.stringify({startDate, endDate, status: 'Abierto', createdBy: user.id, projectId: props.projectId})
            })
              .then(() => {props.onClose()})
          }}/>
        </div>
      </div>
    </div>
  );
}

export default SprintModal;
