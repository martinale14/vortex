import styles from './projectModal.module.css';
import { IoCloseCircleSharp } from 'react-icons/io5';
import Input from '../input/Input';
import Button from '../button/Button';
import {useState, useContext} from 'react';
import { UserContext } from '../../utils/contexts';
import ProjectModalService from './projectModalService'

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
          <Input type='text' label='Proyecto' placeholder='Nombre del proyecto' value={name} onChange={(e) => {setName(e.target.value)}}></Input>
          <Input type='number' label='Tiempo estimado (Semanas)' placeholder='00' value={estimatedTime} onChange={(e) => {setEstimatedTime(e.target.value)}}></Input>
          <Input type='date' label='Fecha de inicio' placeholder='dd/mm/aaaa' value={startDate} onChange={(e) => {setStartDate(e.target.value)}}></Input>
        </div>
        <div className={styles.button}>
          <Button text='Guardar' onClick={ async () => {
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