import { SetStateAction, Dispatch } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faGripLines,
} from '@fortawesome/free-solid-svg-icons';

interface Row {
  id: number;
  category: string;
  requirement: string;
  description: string;
  division: string;
  manager: string;
  importance: number;
  point: number;
}

interface Props {
  row: Row;
  setIsRowModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function TableRow({ row, setIsRowModalOpen }: Props) {
  const onRightClick = (e: any) => {
    e.preventDefault();
    setIsRowModalOpen(true);
  };

  return (
    <div className="table-row" onContextMenu={onRightClick}>
      <span className="table-col content one">{row.id}</span>
      <span className="table-col content one-half">
        <div className="desc-block">{row.category}</div>
      </span>
      <span className="table-col content one-half">{row.requirement}</span>
      <span className="table-col content two">{row.description}</span>
      <span className="table-col content one">
        <div className={`desc-block ${row.division}`}>{row.division}</div>
      </span>
      <span className="table-col content one">{row.manager}</span>
      <span className="table-col content one">
        {row.importance === 1 ? (
          <div className="double-chevron">
            <FontAwesomeIcon icon={faChevronUp} />
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
        ) : row.importance === 2 ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : row.importance === 3 ? (
          <FontAwesomeIcon icon={faGripLines} />
        ) : row.importance === 4 ? (
          <FontAwesomeIcon icon={faChevronDown} />
        ) : row.importance === 5 ? (
          <div className="double-chevron">
            <FontAwesomeIcon icon={faChevronDown} />
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        ) : (
          ''
        )}
      </span>
      <span className="table-col content one">{row.point}</span>
    </div>
  );
}
