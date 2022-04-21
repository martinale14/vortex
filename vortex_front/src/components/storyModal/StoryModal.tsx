import styles from './StoryModal.module.css';
import userStory from '../../assets/userStory.svg';
import line from '../../assets/lineOrange.svg';
import exit from '../../assets/exit.svg';
import Input from '../input/Input';
import Button from '../button/Button';

interface storyProps { }

function StoryModal(props: storyProps) {
    return (
        <div className={styles.vortex_background}>
            <div className={styles.vortex_cardStory}>
                <div className={styles.vortex_cardStory_header}>
                    <img src={exit} className={styles.vortex_imgExit} alt="User Story" />
                    <img src={userStory} className={styles.vortex_imgStory} alt="Delete" />
                    <h2>Nueva historia de usuario</h2>
                </div>
                <img src={line} className={styles.vortex_imgLine} alt="line"/>
                <div className={styles.vortex_cardStory_body}>
                    <Input className={styles.vortex_input_left} type='text' placeholder='Título' label='Título *' onChange={(e : any) => {}}/>
                    <Input className={styles.vortex_input_left} type='text' placeholder='Encargado' label='Empresa' onChange={(e : any) => {}}/>
                    <Input className={styles.vortex_input_left} type='text' placeholder='Sprint ##' label='Sprint' onChange={(e : any) => {}}/>
                    <Input 
                        className={styles.vortex_input_right} 
                        type='text' 
                        placeholder='Ingrese una descripción' 
                        label='Descripción*' 
                        onChange={(e : any) => {}}
                        inputStyle={styles.vortex_input_desc}
                        textArea
                    />
                    <div className={styles.vortex_acc} >
                        <Input 
                            className={styles.vortex_input_right} 
                            type='text' 
                            placeholder='Descripción' 
                            label='Añadir criterio de aceptación*' 
                            onChange={(e : any) => {}}
                            inputStyle={styles.vortex_input_desc}
                            textArea
                        />
                    </div>
                </div>
                <div className={styles.vortex_button_save}>
                    <Button text='Guardar'></Button>
                </div>
            </div>
        </div>
    );
}

export default StoryModal;