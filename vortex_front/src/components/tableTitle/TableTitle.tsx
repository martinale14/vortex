import { IconType } from 'react-icons';
import style from './TableTitle.module.css';

interface TableTitleProps {
  iconType: IconType;
  title: string;
  color?: string;
}

const TableTitle = (props: TableTitleProps) => {
  return (
    <div className={style.titleContainer}>
      <props.iconType size={25} color={props.color ?? '#ff9312'} />
      <p style={{ color: props.color ?? '#ff9312' }}>{props.title}</p>
    </div>
  );
};

export default TableTitle;
