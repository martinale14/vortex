import styles from './StoryDetail.module.css'
import formatDate from '../../utils/FormatDate'

interface propsStory {
    story: any;
    key: string;
  }

function StoryDetail(props: propsStory){
    const story = props.story.hist;
    const accept: [] = props.story.accs;
    const version = props.story.version;

    return (
        <div className={styles.vortex_story_card}>
          <header className={styles.vortex_story_header}>
            <p>{version.title}</p>
          </header>
          <article className={styles.vortex_story_body}>
            <p className={styles.vortex_story_desc}>{version.description}</p>
            {accept.length > 0 ? <p className={styles.vortex_story_sub}>Criterios de aceptación</p> : null}
            <ul className={styles.vortex_story_acc}>
              {accept.map((acc: any, i) => {
                return <li key={'acc_' + acc.id}>{`${acc.description}`}</li>;
              })}
            </ul>
            <p className={styles.vortex_story_sub}>Estado:</p>
            <p className={styles.vortex_story_res}>{story.status && story.status !== '' ? story.status : 'Sin estado'}</p>
            <p className={styles.vortex_story_sub}>Encargado:</p>
            <p className={styles.vortex_story_res}>{story.responsableName ? story.responsableName : 'No asignado'}</p>
            <p className={styles.vortex_story_sub}>Creación:</p>
            <p className={styles.vortex_story_res}>{formatDate(new Date(story.createdAt))}</p>
            <p className={styles.vortex_story_version}>{`Versión: ${version.number}`}</p>
          </article>
        </div>
    );
}

export default StoryDetail;