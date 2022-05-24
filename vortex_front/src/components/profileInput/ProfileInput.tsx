import { ChangeEventHandler } from 'react';
import styles from './ProfileInput.module.css'
import formatDate from '../../utils/FormatDate'

interface propsProfileInput{
    type: string;
    label: string;
    date?: Date;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    defaultValue?: string;
    readOnly?: boolean;
}

function ProfileInput(props: propsProfileInput){

    return(
        <div className={styles.vortex_profile_input}>
            <p>{props.label}</p>
            <input type={props.type} readOnly={props.readOnly} defaultValue={props.defaultValue || formatDate(props.date)} onChange={props.onChange}/>
        </div>
    )
}

export default ProfileInput;