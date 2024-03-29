import Button from '../button/Button';
import styles from './StoryCard.module.css';
interface propsStory {
  story: any;
  key: string;
  onClick?: any;
}

function StoryCard(props: propsStory) {
  const story = props.story.hist;
  const accept: [] = props.story.accs;
  const version = props.story.version;

  return (
    <div className={styles.vortex_story_card}>
      <header className={styles.vortex_story_header}>
        <p>{version.title}</p>
        {story.isEpic ? <p>Épica</p> : null}
      </header>
      <article className={styles.vortex_story_body}>
        <p className={styles.vortex_story_desc}>{version.description}</p>
        {accept.length > 0 ? <p className={styles.vortex_story_sub}>Criterios de aceptación</p> : null}
        <ul className={styles.vortex_story_acc}>
          {accept.map((acc: any, i) => {
            return <li key={'acc_' + acc.id}>{`${acc.description}`}</li>;
          })}
        </ul>
        <p className={styles.vortex_story_sub}>Encargado:</p>
        <p className={styles.vortex_story_res}>{story.responsableName ? story.responsableName : 'No asignado'}</p>
        <div className={styles.end}>
          {story.isEpic ? <Button onClick={props.onClick} noArrow={true} text='Crear hija' /> : null}
          <p className={styles.vortex_story_version}>{`Versión: ${version.number}`}</p>
        </div>
      </article>
    </div>
  );
}

export default StoryCard;
