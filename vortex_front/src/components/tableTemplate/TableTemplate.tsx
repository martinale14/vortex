import { useEffect, useState } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import styles from './TableTemplate.module.css';
import { TableTemplateService } from './TableTemplateServices';
import { toast } from 'react-hot-toast';

interface propsTableTemplate {}

function TableTemplate(_: propsTableTemplate) {
  const [DOUI, setDOUI] = useState<any>([]);
  const [DOR, setDOR] = useState<any>([]);
  const [DOD, setDOD] = useState<any>([]);

  const [newDOUI, setNewDOUI] = useState<any>('');
  const [newDOR, setNewDOR] = useState<any>('');
  const [newDOD, setNewDOD] = useState<any>('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const result = await TableTemplateService.getAllTemplates();
    const douiTemp: any = [];
    const dorTemp: any = [];
    const dodTemp: any = [];
    result.data.result.forEach((e: any) => {
      switch (e.type) {
        case 'DOUI':
          douiTemp.push(e);
          break;

        case 'DOR':
          dorTemp.push(e);
          break;

        case 'DOD':
          dodTemp.push(e);
          break;
      }
    });

    setDOUI(douiTemp);
    setDOR(dorTemp);
    setDOD(dodTemp);
  };

  const saveTemplate = async (description: string, type: string) => {
    await TableTemplateService.createTemplate(description, type);
    await fetchTemplates();
    toast.success('Criterio ' + type + ' creado correctamente');
  };

  return (
    <div className={styles.vortex_tableTemplate}>
      <p>Consulte y/o seleccione una de las platillas para editar sus respectivo criterios.</p>
      <section className={styles.vortex_container_templates}>
        {/* Plantilla DoD */}
        <div className={styles.vortex_card_template}>
          <header className={styles.vortex_header_template}>
            <h1>Plantilla DoD</h1>
          </header>
          <p>Información :</p>
          <ul>
            {DOD.map((e: any, i: number) => {
              return <li key={'DOD_' + i}>{e.description}</li>;
            })}
          </ul>
          <div className={styles.button_spacer} />
          <form className={styles.vortex_information}>
            <Input
              id='newDOD'
              type='text'
              value={newDOD}
              onChange={(val) => {
                setNewDOD(val.target.value);
              }}
              label={''}
              placeholder={'Ingrese un criterio'}
            ></Input>
          </form>
          <br />
          <br />
          <div className={styles.buttons_actions}>
            {/* <Button text='Guardar plantilla' noArrow={true}></Button> */}
            <Button
              onClick={() => {
                saveTemplate(newDOD, 'DOD');
                setNewDOD('');
              }}
              text='Agregar Criterio'
              noArrow={true}
            ></Button>
          </div>
        </div>
        {/* Plantilla DoR */}
        <div className={styles.vortex_card_template}>
          <header className={styles.vortex_header_template}>
            <h1>Plantilla DoR</h1>
          </header>
          <p>Información :</p>
          <ul>
            {DOR.map((e: any, i: number) => {
              return <li key={'DOR_' + i}>{e.description}</li>;
            })}
          </ul>
          <div className={styles.button_spacer} />
          <form className={styles.vortex_information}>
            <Input
              id='newDOR'
              type='text'
              value={newDOR}
              onChange={(val) => {
                setNewDOR(val.target.value);
              }}
              label={''}
              placeholder={'Ingrese un criterio'}
            ></Input>
          </form>
          <br />
          <br />
          <div className={styles.buttons_actions}>
            {/* <Button text='Guardar plantilla' noArrow={true}></Button> */}
            <Button
              onClick={() => {
                saveTemplate(newDOR, 'DOR');
                setNewDOR('');
              }}
              text='Agregar Criterio'
              noArrow={true}
            ></Button>
          </div>
        </div>
        {/* Plantilla DoUI */}
        <div className={styles.vortex_card_template}>
          <header className={styles.vortex_header_template}>
            <h1>Plantilla DoUI</h1>
          </header>
          <p>Información :</p>
          <ul>
            {DOUI.map((e: any, i: number) => {
              return <li key={'DOUI_' + i}>{e.description}</li>;
            })}
          </ul>
          <div className={styles.button_spacer} />
          <form className={styles.vortex_information}>
            <Input
              id='newDOUI'
              type='text'
              value={newDOUI}
              onChange={(val) => {
                setNewDOUI(val.target.value);
              }}
              label={''}
              placeholder={'Ingrese un criterio'}
            ></Input>
          </form>
          <br />
          <br />
          <div className={styles.buttons_actions}>
            {/* <Button text='Guardar plantilla' noArrow={true}></Button> */}
            <Button
              onClick={() => {
                saveTemplate(newDOUI, 'DOUI');
                setNewDOUI('');
                document.getElementById('newDOUI')?.blur();
              }}
              text='Agregar Criterio'
              noArrow={true}
            ></Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TableTemplate;
