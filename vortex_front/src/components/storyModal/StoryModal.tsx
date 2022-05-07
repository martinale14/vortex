import styles from './StoryModal.module.css';
import userStory from '../../assets/userStory.svg';
import line from '../../assets/lineOrange.svg';
/* import trash from '../../assets/trash.svg';
import add from '../../assets/add.svg'; */
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
                    <Input type='text' placeholder='Título' label='Título *' onChange={(e : any) => {}}/>
                    <Input type='text' placeholder='Encargado' label='Empresa' onChange={(e : any) => {}}/>
                    <Input type='text' placeholder='Sprint ##' label='Sprint' onChange={(e : any) => {}}/>
                    <Input type='text' placeholder='Ingrese una descripción' label='Descripción*' onChange={(e : any) => {}}/>
                </div>
                <div className={styles.vortex_button_save}>
                    <Button  text='Guardar' ></Button>
                </div>
            </div>
        </div>
    );
}

export default StoryModal;