import styles from './projectModal.module.css';
import { IoCloseCircleSharp } from 'react-icons/io5';
import Input from '../input/Input';
import Button from '../button/Button';

interface ProjectModalProps {
  idCompany?: string;
}

const ProjectModal = (_: ProjectModalProps) => {
  return (
    <div className={styles.darkBackground}>
      <div className={styles.modal}>
        <div className={styles.icon}>
          <IoCloseCircleSharp style={{ width: '100%', height: '100%' }} />
        </div>
        <h2>Nuevo Proyecto</h2>
        <hr />
        <p>Por favor ingrese los siguientes datos para crear un proyecto</p>
        <div className={styles.form}>
          <Input type='text' label='Proyecto' placeholder='Nombre del proyecto' onChange={() => {}}></Input>
          <Input type='number' label='Tiempo estimado (Semanas):' placeholder='00' onChange={() => {}}></Input>
          <Input type='text' label='Empresa' placeholder='Empresa o razón social' onChange={() => {}}></Input>
          <Input type='date' label='Proyecto' placeholder='dd/mm/aaaa' onChange={() => {}}></Input>
        </div>
        <div className={styles.button}>
          <Button text='Guardar'></Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
