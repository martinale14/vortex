import styles from './UserModal.module.css';
import Input from '../input/Input';
import Button from '../button/Button';
import Dropdown from '../dropdown/dropdown';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import UserModalServices from './UserModalServices';

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
                    <Input type='text' label='Nombre *' placeholder='Nombre completo' value={nameUser} onChange={(e) => {setNameUser(e.target.value)}}></Input>
                    <Input type='text' label='Correo *' placeholder='nombre@ejemplo.com' value={emailUser} onChange={(e) => {setEmailUser(e.target.value)}}></Input>
                    <Input type='number' label='Teléfono *' placeholder='31........' value={phoneUser} onChange={(e) => {setPhoneUser(e.target.value)}}></Input>
                    <Dropdown 
                    options = {['Rol','Administrador','Analista', 'Gerente', 'Desarrollador']}
                    values = {[0,1,2,3,4]}
                    label = 'Rol *'
                    placeholder = 'Seleccione un rol'
                    onChange = {(event:any) => {setRoleUser(event.target.value)}}/>
                </div>
                <div className={styles.vortex_button}>
                    <Button text='Guardar'
                        onClick={async () => {
                            await createUser();
                            props.onSave();
                            props.onClose();
                    }}></Button>
                </div>
            </div>
        </div>
    );
}

export default UserModal;