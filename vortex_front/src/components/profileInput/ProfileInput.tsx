import { ChangeEventHandler } from 'react';
import styles from './ProfileInput.module.css'

interface propsProfileInput{
    type: string;
    label: string;
    text?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    defaultValue?: string;
    readOnly?: boolean;
}

function ProfileInput(props: propsProfileInput){
    return(
        <div className={styles.vortex_profile_input}>
            <p>{props.label}</p>
            <input type={props.type} readOnly={props.readOnly} defaultValue={props.defaultValue} value={props.text} onChange={props.onChange}/>
        </div>
    )
}

export default ProfileInput;