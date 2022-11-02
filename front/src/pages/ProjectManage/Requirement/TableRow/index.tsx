import { useState, Dispatch } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faGripLines,
} from '@fortawesome/free-solid-svg-icons';
import { ROW } from 'types/Requirement';
import { MOUSEPOS } from 'types/ApiSpec';
import RowModal from '../RowModal';

interface Props {
  row: ROW;
  setRows: Dispatch<React.SetStateAction<ROW[]>>;
}

export default function TableRow({ row, setRows }: Props) {
  const [isRowModalOpen, setIsRowModalOpen] = useState(false);
  const [clickMousePos, setClickMousePos] = useState<MOUSEPOS>({ x: 0, y: 0 });

  const onRightClick = (e: any) => {
    e.preventDefault();
    setClickMousePos({ x: e.clientX, y: e.clientY });
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

      {isRowModalOpen && (
        <RowModal
          setIsRowModalOpen={setIsRowModalOpen}
          clickMousePos={clickMousePos}
        />
      )}
    </div>
  );
}
