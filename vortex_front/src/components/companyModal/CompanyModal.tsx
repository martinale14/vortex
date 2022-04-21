import styles from './companyModal.module.css';
import { IoCloseCircleSharp } from 'react-icons/io5';
import Input from '../input/Input';
import Button from '../button/Button';
import { useContext, useState } from 'react';
import { CREATE_COMPANY, HEADERS } from '../../utils/url_utils';
import { UserContext } from '../../utils/contexts';

interface CompanyModalProps {
  onClose?:any;
  onSave?:any;
}

const CompanyModal = (props: CompanyModalProps) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [direction, setDirection] = useState('');

  const {user} = useContext<any>(UserContext);
  
  return (
    <div className={styles.darkBackground}>
      <div className={styles.modal}>
        <div className={styles.icon} onClick={props.onClose}>
          <IoCloseCircleSharp style={{ width: '100%', height: '100%' }} />
        </div>
        <h2>Nueva empresa</h2>
        <hr />
        <p>Por favor ingrese los siguientes datos para crear una nueva empresa</p>
        <div className={styles.form}>
          <Input type='text' value={name} label='Nombre' placeholder='Nombre o razón Social'  onChange={(e) => {setName(e.target.value)}}></Input>
          <Input type='text' value={email} label='Correo' placeholder='nombre@ejemplo.com'  onChange={(e) => {setEmail(e.target.value)}}></Input>
          <Input type='number' value={phone} label='Teléfono' placeholder='31........'  onChange={(e) => {setPhone(e.target.value)}}></Input>
          <Input type='text' value={direction} label='Dirección' placeholder='Carrera 8 # 35 -26' onChange={(e) => {setDirection(e.target.value)}}></Input>
          
        </div>
        <div className={styles.button}>
          <Button text='Guardar' onClick={ () => {
            fetch(CREATE_COMPANY,
               {
                method:'POST', 
                headers: HEADERS,
                body:JSON.stringify({name, email, phone: phone === '' ? null : phone, direction: direction === '' ? null : direction, createdBy: user.id})})
            .then(res => res.json())
            .then((_) => {
              props.onSave();
              props.onClose();
            })
          }}></Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;