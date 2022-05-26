import styles from './UserModal.module.css';
import Input from '../input/Input';
import Button from '../button/Button';
import Dropdown from '../dropdown/dropdown';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import UserModalServices from './UserModalServices';
import toast from 'react-hot-toast';

interface UserModalProps{
    onClose?: any;
    onSave?: any;
}

const UserModal = (props: UserModalProps) => {
    //Variables
    const [nameUser, setNameUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [phoneUser, setPhoneUser] = useState('');
    const [roleUser, setRoleUser] = useState(0);

    const [nameValidation, setNameValidation] = useState<string | null>(null);
    const [emailValidation, setEmailValidation] = useState<string | null>(null);
    const [roleValidation, setRoleValidation] = useState<string | null>(null);

    const createUser = async () => {
        const dataUser = {name: nameUser, email: emailUser, phone: phoneUser, role: roleUser, password: 'vortex123', pictureUrl:null}
        UserModalServices.createUser(dataUser);
    };

    return (
        <div className={styles.vortex_darkBackground}>
            <div className={styles.vortex_modal}>
                <div className={styles.vortex_icon} onClick={props.onClose}>
                    <IoCloseCircleSharp style={{ width: '100%', height: '100%' }} ></IoCloseCircleSharp>
                </div>
                <h2>Nuevo usuario</h2>
                <hr/>
                <p>Por favor ingrese los siguientes datos para crear un nuevo usuario</p>
                <div className={styles.vortex_form}>
                    <Input type='text' label='Nombre *' placeholder='Nombre completo' value={nameUser} 
                        onChange={(e) => {
                            setNameUser(e.target.value);
                            e.target.value === '' ? setNameValidation('Campo obligatorio') : setNameValidation(null)
                        }}
                        validationText={nameValidation}
                    />
                    <Input type='text' label='Correo *' placeholder='nombre@ejemplo.com' value={emailUser} 
                        onChange={(e) => {
                            setEmailUser(e.target.value);
                            e.target.value === '' ? setEmailValidation('Campo obligatorio') : setEmailValidation(null)
                        }}
                        validationText={emailValidation}
                    />
                    <Input type='number' label='Teléfono' placeholder='31........' value={phoneUser} 
                        onChange={(e) => {
                            setPhoneUser(e.target.value);
                        }}
                    />
                    <Dropdown 
                        options = {['Rol','Administrador','Analista', 'Gerente', 'Desarrollador']}
                        values = {[0,1,2,3,4]}
                        label = 'Rol *'
                        placeholder = 'Seleccione un rol'
                        onChange = {(e:any) => {
                            setRoleUser(e.target.value);
                            e.target.value === '0' ? setRoleValidation('Campo obligatorio') : setRoleValidation(null)
                        }}
                        validationText={roleValidation}
                    />
                </div>
                <div className={styles.vortex_button}>
                    <Button text='Guardar'
                        onClick={async () => {
                            if(nameUser.trim() === '' || emailUser.trim() === '' || roleUser === 0){
                                toast.error('Por favor llena los campos obligatorios');
                                return
                            }
                            await createUser();
                            props.onSave();
                            props.onClose();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserModal;