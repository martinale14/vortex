import styles from './ProfileInput.module.css'

interface propsProfileInput{
    label: string;
    text: string;
}

function ProfileInput(props: propsProfileInput){
    return(
        <div className={styles.vortex_profile_input}>
            <p>{props.label}</p>
            <input type="text" value={props.text}/>
        </div>
    )
}

export default ProfileInput;