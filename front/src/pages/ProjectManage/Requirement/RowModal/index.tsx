import {
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import './style.scss';
import { MOUSEPOS } from 'types/ApiSpec';
import { ROW } from 'types/Requirement';

interface Props {
  setIsRowModalOpen: Dispatch<SetStateAction<boolean>>;
  clickMousePos: MOUSEPOS;
  rows: ROW[];
  setRows: Dispatch<React.SetStateAction<ROW[]>>;
  idx: number;
}

export default function RowModal({
  setIsRowModalOpen,
  clickMousePos,
  rows,
  setRows,
  idx,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    modalContainer.current.style.left = `${clickMousePos.x}px`;
    modalContainer.current.style.top = `${clickMousePos.y}px`;
  }, [clickMousePos]);

  const closeModal = () => {
    setIsRowModalOpen(false);
  };

  const addRow = useCallback(() => {
    const copyRows = [...rows];
    copyRows.push({
      id: 1,
      category: '',
      requirement: '',
      description: '',
      division: '',
      manager: '',
      importance: 3,
      point: 0,
    });
    setRows(copyRows);
    setIsRowModalOpen(false);
  }, [rows, idx]);

  const deleteRow = useCallback(() => {
    const copyRows = [...rows];
    copyRows.splice(idx, 1);
    setRows(copyRows);
    setIsRowModalOpen(false);
  }, [rows, idx]);

  const duplicateRow = useCallback(() => {
    const copyRows = [...rows];
    const copyRow = { ...copyRows[idx] };
    copyRows.splice(idx, 0, copyRow);
    setRows(copyRows);
    setIsRowModalOpen(false);
  }, [rows, idx]);

  return (
    <div
      className="rowmodal-container"
      onClick={closeModal}
      role="article"
      onKeyDown={() => {}}
    >
      <div
        className="rowmodal-content-container"
        ref={modalContainer}
        onClick={(e: any) => e.stopPropagation()}
        role="article"
        onKeyDown={() => {}}
      >
        <p className="rowmodal-menu" onClick={deleteRow}>
          행 삭제
        </p>
        <p className="rowmodal-menu" onClick={addRow}>
          행 추가
        </p>
        <p className="rowmodal-menu" onClick={duplicateRow}>
          복제하기
        </p>
      </div>
    </div>
  );
}
