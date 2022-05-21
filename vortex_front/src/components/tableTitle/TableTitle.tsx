import { IconType } from 'react-icons';
import style from './TableTitle.module.css';

interface TableTitleProps {
  iconType: IconType;
  title: string;
  color?: string;
  onClick?: any;
}

const TableTitle = (props: TableTitleProps) => {
  return (
    <div onClick={props.onClick} className={style.titleContainer}>
      <props.iconType size={25} color={props.color ?? '#ff9312'} />
      <p style={{ color: props.color ?? '#ff9312' }}>{props.title}</p>
    </div>
  );
};

export default TableTitle;
