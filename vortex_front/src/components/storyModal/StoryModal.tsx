import styles from './StoryModal.module.css';
import userStory from '../../assets/userStory.svg';
import line from '../../assets/lineOrange.svg';
import exit from '../../assets/exit.svg';
import Input from '../input/Input';
import Button from '../button/Button';
import { CREATE_SPRINT, HEADERS } from '../../utils/url_utils';
import { useState, useContext } from 'react';
import { UserContext } from '../../utils/contexts';

interface storyProps {
  onClose: any;
  onSave: any;
}

function StoryModal(props: storyProps) {
  const [title, setTitle] = useState('');
  const [accDesc, setAccDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [companyId, setCompanyId] = useState(0);

  const { user } = useContext<{ user: any; setUser: any }>(UserContext);
  console.log(title, desc, startDate, companyId, setStartDate);

  return (
    <div className={styles.vortex_background}>
      <div className={styles.vortex_cardStory}>
        <div className={styles.vortex_cardStory_header}>
          <img src={exit} className={styles.vortex_imgExit} alt='User Story' onClick={props.onClose} />
          <img src={userStory} className={styles.vortex_imgStory} alt='Delete' />
          <h2>Nueva historia de usuario</h2>
        </div>
        <img src={line} className={styles.vortex_imgLine} alt='line' />
        <div className={styles.vortex_cardStory_body}>
          <Input
            className={styles.vortex_input_left}
            type='text'
            placeholder='Título'
            label='Título *'
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />
          <Input
            className={styles.vortex_input_left}
            type='text'
            placeholder='Empresa'
            label='Empresa'
            onChange={(e: any) => {
              setCompanyId(e.target.value);
            }}
          />
          <Input
            className={styles.vortex_input_left}
            type='text'
            placeholder='Sprint ##'
            label='Sprint'
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />
          <Input
            className={styles.vortex_input_right}
            type='text'
            placeholder='Ingrese una descripción'
            label='Descripción*'
            onChange={(e: any) => {
              setDesc(e.target.value);
            }}
            inputStyle={styles.vortex_input_desc}
            textArea
          />
          <div className={styles.vortex_acc}>
            <Input
              className={styles.vortex_input_right}
              type='text'
              placeholder='Descripción'
              label='Añadir criterio de aceptación*'
              onChange={(e: any) => {
                setAccDesc(e.target.value);
              }}
              inputStyle={styles.vortex_input_desc}
              textArea
            />
          </div>
        </div>

        <div className={styles.vortex_button_save}>
          <Button
            text='Guardar'
            onClick={() => {
              fetch(CREATE_SPRINT, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                  status: 'open',
                  isEpic: false,
                  createdBy: user.id,
                  projectId: 2,
                  userResponsableId: null,
                  epicParentId: null,
                  sprintId: null,
                  version: {
                    createdBy: user.id
                  },
                  acc: [
                    {
                      description: accDesc,
                      type: 'DOUI',
                      createdBy: user.id
                    }
                  ]
                })
              })
                .then((res) => res.json())
                .then((_) => {
                  props.onSave();
                  props.onClose();
                });
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default StoryModal;
