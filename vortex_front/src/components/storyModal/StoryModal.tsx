import styles from './StoryModal.module.css';
import userStory from '../../assets/userStory.svg';
import line from '../../assets/lineOrange.svg';
import exit from '../../assets/exit.svg';
import Input from '../input/Input';
import Button from '../button/Button';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../utils/contexts';
import StoryModalService from './StoryModalService';
import { MdDelete } from 'react-icons/md';
import Dropdown from '../dropdown/dropdown';
import { toast } from 'react-hot-toast';

interface storyProps {
  onClose: any;
  onSave: any;
  sprintId?: number;
  project?: number;
  epicParent?: number | null;
}

function StoryModal(props: storyProps) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [acc, setAcc] = useState([{ key: 0, value: '' }]);
  const [devs, setDevs] = useState([]);
  const [inCharge, setInCharge] = useState('');
  const [isEpic, setIsEpic] = useState<boolean>(false);

  const { user } = useContext<{ user: any; setUser: any }>(UserContext);

  const createStory = async () => {
    const criterias: any = [];

    acc.forEach((e: any) => {
      if (e.value.trim() !== '') {
        criterias.push({
          description: e.value,
          type: 'DOUI',
          createdBy: user.id
        });
      }
    });

    const story = {
      history: {
        status: 'Abierto',
        isEpic: isEpic,
        createdBy: user.id,
        projectId: props.project,
        userResponsableId: inCharge !== '' ? inCharge : null,
        epicParentId: props.epicParent,
        sprintId: props.sprintId
      },
      version: {
        title: title,
        description: desc,
        isBaseDoc: false,
        createdBy: user.id
      },
      acc: criterias
    };
    const response = await StoryModalService.createStory(story);
    if (response.status === 200) {
      toast.success('Historia de usuario creada satisfactoriamente');
    } else {
      toast.error('Hubo un error creando la historia de usuario');
    }

    props.onSave();
    props.onClose();
  };

  const retrieveDevs = async () => {
    setDevs((await StoryModalService.retrieveUsers()).filter((e: any) => e.role === 'Desarrollador'));
  };

  useEffect(() => {
    retrieveDevs();
  }, []);

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
          <Dropdown
            className={styles.vortex_input_dropdown}
            placeholder='Encargado'
            onChange={(e: any) => {
              console.log(e.target.value);

              setInCharge(e.target.value);
            }}
            label='Encargado'
            options={['', ...devs.map((e: any) => e.name)]}
            values={['', ...devs.map((e: any) => e.id)]}
          />
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

          {props.epicParent !== null ? null : (
            <div className={styles.check}>
              <input
                value={isEpic.toString()}
                onChange={(_) => {
                  setIsEpic(!isEpic);
                }}
                type='checkbox'
              />
              <label>¿Es una épica?</label>
            </div>
          )}

          <div className={styles.vortex_add_acc_button}>
            <Button
              noArrow={true}
              text='Agregar criterio de aceptación'
              onClick={(_: any) => {
                setAcc([...acc, { key: acc.length <= 0 ? 0 : acc[acc.length - 1].key + 1, value: '' }]);
              }}
            ></Button>
          </div>
          <div className={styles.vortex_acc}>
            {acc.map((e: any, i: number) => (
              <div key={'acc_' + e.key}>
                <Input
                  className={styles.vortex_acc}
                  value={acc[i].value}
                  type='text'
                  placeholder='Descripción'
                  label='Añadir criterio de aceptación*'
                  onchange={(e: any) => {
                    const newAcc = [...acc];
                    newAcc[i].value = e.target.value;
                    setAcc([...newAcc]);
                  }}
                  inputStyle={styles.vortex_input_desc}
                  textArea
                />
                <div
                  className={styles.acc_action_delete}
                  onClick={() => {
                    const newAcc = [...acc];
                    newAcc.splice(i, 1);
                    setAcc([...newAcc]);
                  }}
                >
                  <MdDelete size={40} />
                </div>
              </div>
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
