import styles from './StoryModal.module.css';
import userStory from '../../assets/userStory.svg';
import line from '../../assets/lineOrange.svg';
import exit from '../../assets/exit.svg';
import Input from '../input/Input';
import Button from '../button/Button';
import { useState, useContext } from 'react';
import { UserContext } from '../../utils/contexts';
import StoryModalService from './StoryModalService';

interface storyProps {
  onClose: any;
  onSave: any;
  sprintId?: number;
  company?: number;
}

function StoryModal(props: storyProps) {
  const [title, setTitle] = useState('');
  const [accDesc, setAccDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [acc, setAcc] = useState(['']);

  const { user } = useContext<{ user: any; setUser: any }>(UserContext);

  const createStory = () => {
    const story = {
      history: {
        status: 'Abierto',
        isEpic: false,
        createdBy: user.id,
        projectId: props.company,
        userResponsableId: null,
        epicParentId: null,
        sprintId: props.sprintId
      },
      version: {
        title: title,
        description: desc,
        isBaseDoc: false,
        createdBy: user.id
      },
      acc: [
        {
          description: accDesc,
          type: 'DOUI',
          createdBy: user.id
        }
      ]
    };
    StoryModalService.createStory(story);
    props.onSave();
    props.onClose();
  };

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
            className={styles.vortex_input_story}
            type='text'
            placeholder='Título'
            label='Título *'
            value={title}
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          />
          {/* <Dropdown 
           options={['Empresa o razón social', ...props.companies.map(comp => comp.name)]} 
           values={[0, ...props.companies.map(comp => comp.id)]} 
           label='Empresa' placeholder='Empresa o razón social' 
           onChange={(event:any) => {
             setCompanyId(event.target.value);
          }}></Dropdown> */}
          {/* <Input
            className={styles.vortex_input_story}
            type='text'
            placeholder='Sprint ##'
            label='Sprint'
            onChange={(e: any) => {
              setTitle(e.target.value);
            }}
          /> */}
          <Input
            className={styles.vortex_textarea_acc}
            type='text'
            placeholder='Ingrese una descripción'
            label='Descripción*'
            defaultValue={desc}
            onchange={(e: any) => {
              setDesc(e.target.value);
            }}
            inputStyle={`${styles.vortex_input_desc} ${styles.vortex_input_textArea}`}
            textArea
          />
          <button
            onClick={(_: any) => {
              setAcc([...acc, '']);
            }}
          >
            Agregar Criterio de Aceptación
          </button>
          <div className={styles.vortex_acc}>
            {acc.map((_: any) => (
              <Input
                className={styles.vortex_acc}
                type='text'
                placeholder='Descripción'
                label='Añadir criterio de aceptación*'
                defaultValue={accDesc}
                onchange={(e: any) => {
                  setAccDesc(e.target.value);
                }}
                inputStyle={styles.vortex_input_desc}
                textArea
              />
            ))}
          </div>
          <div className={styles.vortex_button_save}>
            <Button
              text='Guardar'
              onClick={() => {
                createStory();
              }}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryModal;
