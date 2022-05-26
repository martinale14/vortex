import styles from './projectModal.module.css';
import { IoCloseCircleSharp } from 'react-icons/io5';
import Input from '../input/Input';
import Button from '../button/Button';
import {useState, useContext} from 'react';
import { UserContext } from '../../utils/contexts';
import ProjectModalService from './projectModalService'
import toast from 'react-hot-toast';

interface ProjectModalProps {
  onClose?:any;
  onSave?:any;
  companyId:number;
}

const ProjectModal = (props: ProjectModalProps) => {
  const [name, setName] = useState(''); 
  const [estimatedTime, setEstimatedTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const companyId = props.companyId;

  const [nameValidation, setNameValidation] = useState<string | null>(null);
  const [timeValidation, setTimeValidation] = useState<string | null>(null);
  const [dateValidation, setDateValidation] = useState<string | null>(null);

  const {user} = useContext<{user : any, setUser:any}>(UserContext);

  return (
    <div className={styles.darkBackground}>
      <div className={styles.modal}>
        <div className={styles.icon} onClick={props.onClose}>
          <IoCloseCircleSharp style={{ width: '100%', height: '100%' }} />
        </div>
        <h2>Nuevo Proyecto</h2>
        <hr />
        <p>Por favor ingrese los siguientes datos para crear un proyecto</p>
        <div className={styles.form}>
          <Input type='text' label='Proyecto' placeholder='Nombre del proyecto' value={name} 
            onChange={(e) => {
              setName(e.target.value);
              e.target.value.trim() === '' ? setNameValidation('Campo obligatorio') : setNameValidation(null)
            }}
            validationText={nameValidation}
          />
          <Input type='number' label='Tiempo estimado (Semanas)' placeholder='00' value={estimatedTime} 
            onChange={(e) => {
              setEstimatedTime(e.target.value);
              e.target.value.trim() === '' ? setTimeValidation('Campo obligatorio') : setTimeValidation(null)
            }}
            validationText={timeValidation}
          />
          <Input type='date' label='Fecha de inicio' placeholder='dd/mm/aaaa' value={startDate} 
            onChange={(e) => {
              setStartDate(e.target.value)
              e.target.value === '' ? setDateValidation('Campo obligatorio') : setDateValidation(null)
            }}
            validationText={dateValidation}
          />
        </div>
        <div className={styles.button}>
          <Button text='Guardar' onClick={ async () => {
            if(name.trim() === '' || estimatedTime === '' || startDate === ''){
              toast.error('Por favor llena los campos obligatorios');
              return;
            }
            await ProjectModalService.createProject({name, estimatedTime, startDate, createdBy: user.id, companyId});
            props.onSave(companyId);
            props.onClose();
          }}></Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;