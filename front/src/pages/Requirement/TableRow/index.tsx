import { SetStateAction, Dispatch } from 'react';

interface Row {
  id: number;
  category: string;
  requirement: string;
  description: string;
  division: string;
  manager: string;
  importance: string;
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
      <span className="table-col content one">{row.importance}</span>
      <span className="table-col content one">{row.point}</span>
    </div>
  );
}
