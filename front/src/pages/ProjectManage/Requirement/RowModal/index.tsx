import {
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import './style.scss';
import { MOUSEPOS } from 'types/ApiSpec';
import { deleteApi, postApi } from 'api';

interface Props {
  setIsRowModalOpen: Dispatch<SetStateAction<boolean>>;
  clickMousePos: MOUSEPOS;
  idx: number;
  store: any;
  pid: string;
}

export default function RowModal({
  setIsRowModalOpen,
  clickMousePos,
  idx,
  store,
  pid,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    modalContainer.current.style.left = `${clickMousePos.x}px`;
    modalContainer.current.style.top = `${clickMousePos.y}px`;
  }, [clickMousePos]);

  const closeModal = () => {
    setIsRowModalOpen(false);
  };

  const addRow = useCallback(async () => {
    await postApi(`/requirementdocs/${pid}/requirements`);
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

  const deleteRow = useCallback(async () => {
    await deleteApi(`/requirementdocs/requirements/${store.pjt.rows[idx].id}`);
    store.pjt.rows.splice(idx, 1);
    setIsRowModalOpen(false);
  }, [store, idx]);

  const duplicateRow = useCallback(() => {
    // const copyRow = { ...store.pjt.rows[idx] };
    // const newObj = {
    //   category: copyRow.category,
    //   requirement: copyRow.requirement,
    //   description: copyRow.description,
    //   division: copyRow.division,
    //   manager: copyRow.manager,
    //   importance: copyRow.importance,
    //   point: copyRow.point,
    // };
    // store.pjt.rows.push(newObj);

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
