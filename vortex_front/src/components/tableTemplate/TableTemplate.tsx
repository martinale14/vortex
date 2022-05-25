import Button from '../button/Button';
import Input from '../input/Input';
import styles from './TableTemplate.module.css';

interface propsTableTemplate{}

function TableTemplate (props: propsTableTemplate) {
    /* Variables */
    
    return (
        <table className = {styles.vortex_tableTemplate}>
            <p>Consulte y/o seleccione una de las platillas para editar sus respectivo criterios.</p>
            <section className = {styles.vortex_container_templates}>
                {/* Plantilla DoD */}
                <div className = {styles.vortex_card_template}>
                    <header className = {styles.vortex_header_template}>
                        <h1>Plantilla DoD</h1>
                    </header>
                    <p>Información :</p> 
                    <form className = {styles.vortex_information}>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                    </form>
                    <br/><br/>
                    <Button text = 'Guardar plantilla' ></Button>
                    <Button text = 'Añadir nuevo criterio' ></Button>
                </div>
                {/* Plantilla DoR */}
                <div className = {styles.vortex_card_template}>
                    <header className = {styles.vortex_header_template}>
                        <h1>Plantilla DoR</h1>
                    </header>
                    <p>Información :</p> 
                    <form className = {styles.vortex_information}>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                    </form>
                    <br/><br/>
                    <Button text = 'Guardar plantilla' ></Button>
                    <Button text = 'Añadir nuevo criterio' ></Button>
                </div>
                {/* Plantilla DoUI */}
                <div className = {styles.vortex_card_template}>
                    <header className = {styles.vortex_header_template}>
                        <h1>Plantilla DoUI</h1>
                    </header>
                    <p>Información :</p> 
                    <form className = {styles.vortex_information}>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                        <Input type = 'text' label = {''} placeholder = {'Ingrese un criterio'}></Input>
                    </form>
                    <br/><br/>
                    <Button text = 'Guardar plantilla' ></Button>
                    <Button text = 'Añadir nuevo criterio' ></Button>
                </div>
            </section>
        </table>
    );
}

export default TableTemplate;