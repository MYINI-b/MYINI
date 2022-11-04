import {
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import './style.scss';
import { MOUSEPOS } from 'types/ApiSpec';

interface Props {
  setIsRowModalOpen: Dispatch<SetStateAction<boolean>>;
  clickMousePos: MOUSEPOS;
  idx: number;
  store: any;
}

export default function RowModal({
  setIsRowModalOpen,
  clickMousePos,
  idx,
  store,
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
    store.pjt.rows.push({
      category: '',
      requirement: '',
      description: '',
      division: '',
      manager: '',
      importance: 3,
      point: 0,
    });
    setIsRowModalOpen(false);
  }, [store]);

  const deleteRow = useCallback(() => {
    store.pjt.rows.splice(idx, 1);
    setIsRowModalOpen(false);
  }, [store, idx]);

  const duplicateRow = useCallback(() => {
    const copyRow = { ...store.pjt.rows[idx] };
    store.pjt.rows.splice(idx, 0, copyRow);
    setIsRowModalOpen(false);
  }, [store, idx]);

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
