import ReactLoading from 'react-loading';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <ReactLoading type='spinningBubbles' height='100px' width='100px' color='#008f82' />
    </div>
  );
};

export default Loading;
