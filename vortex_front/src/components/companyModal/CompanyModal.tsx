import styles from './companyModal.module.css';
import { IoCloseCircleSharp } from 'react-icons/io5';
import Input from '../input/Input';
import Button from '../button/Button';
import { useContext, useState } from 'react';
import { UserContext } from '../../utils/contexts';
import CompanyModalService from './CompanyModalService';
import { toast } from 'react-hot-toast';

interface CompanyModalProps {
  onClose?:any;
  onSave?:any;
}

const CompanyModal = (props: CompanyModalProps) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [nameValidation, setNameValidation] = useState<string | null>(null);
  const [emailValidation, setEmailValidation] = useState<string | null>(null);
  const [addressValidation, setAddressValidation] = useState<string | null>(null);

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
          <Input type='text' value={name} label='Nombre' placeholder='Nombre o razón Social'  
            onChange={(e) => {
              setName(e.target.value);
              e.target.value.trim() === '' ? setNameValidation('Campo obligatorio') : setNameValidation(null)
            }} 
            validationText={nameValidation}
          />
          <Input type='text' value={email} label='Correo' placeholder='nombre@ejemplo.com'  
            onChange={(e) => {
              setEmail(e.target.value);
              e.target.value.trim() === '' ? setEmailValidation('Campo obligatorio') : setEmailValidation(null)
            }}
            validationText={emailValidation}  
          />
          <Input type='number' value={phone} label='Teléfono' placeholder='31........'  
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Input type='text' value={address} label='Dirección' placeholder='Carrera 8 # 35 -26' 
            onChange={(e) => {
              setAddress(e.target.value);
              e.target.value.trim() === '' ? setAddressValidation('Campo obligatorio') : setAddressValidation(null)
            }}
            validationText={addressValidation}
          />
          
        </div>
        <div className={styles.button}>
          <Button text='Guardar' onClick={ async () => {
            if(name.trim() === '' || email.trim() === '' || address.trim() === ''){
              toast.error('Por favor llena los campos obligatorios');
              return;
            }
            await CompanyModalService.createCompany({name, email, phone, direction: address, createdBy: user.id});
            props.onSave();
            props.onClose();
          }}></Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;