import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useCallback, Dispatch, useRef, useEffect, useState } from 'react';

import './style.scss';
import { ELEMENTPOS, ROW } from 'types/Requirement';

interface Props {
  closeManagerModal: () => void;
  clickElementPos: ELEMENTPOS;
  idx: number;
  store: any;
}

export default function CategoryListModal({
  closeManagerModal,
  clickElementPos,
  idx,
  store,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [managerInput, setManagerInput] = useState('');

  const deleteManager = useCallback(
    (e: any, idx: number) => {
      e.stopPropagation();

      store.pjt.rows.forEach((e: ROW) => {
        if (e.manager === store.pjt.managers[idx]) e.manager = '';
      });
      store.pjt.managers.splice(idx, 1);
      closeManagerModal();
    },
    [store],
  );

  const addNewManager = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        if (store.pjt.managers === undefined) store.pjt.managers = [];
        store.pjt.managers.push(managerInput);
        store.pjt.rows[idx].manager = managerInput;
        closeManagerModal();
        setManagerInput('');
      }
    },
    [store, managerInput],
  );

  const onChangemanagerInput = useCallback(
    (e: any) => {
      setManagerInput(e.target.value);
    },
    [setManagerInput],
  );

  const selectManager = useCallback(
    (manager: string) => {
      store.pjt.rows[idx].manager = manager;
      closeManagerModal();
    },
    [store, idx],
  );

  useEffect(() => {
    modalContainer.current.style.left = `${clickElementPos.x}px`;
    modalContainer.current.style.top = `${clickElementPos.y}px`;
    modalContainer.current.style.width = `${clickElementPos.width}px`;
  }, [clickElementPos]);

  return (
    <div className="category-list-empty" onClick={closeManagerModal}>
      <div
        className="category-list-container"
        onClick={(e) => e.stopPropagation()}
        ref={modalContainer}
      >
        <div className="category-list-overflow">
          <input
            type="text"
            className="category-search-input"
            placeholder="새 담당자 등록"
            onChange={onChangemanagerInput}
            onKeyDown={addNewManager}
            onClick={(e) => e.stopPropagation()}
            value={managerInput}
          />
          {store.pjt.managers &&
            store.pjt.managers.map((e: string, i: number) => {
              return (
                <span
                  className={`category-row ${
                    store.pjt.rows[idx].manager === e && 'select'
                  }`}
                  key={i}
                  onClick={() => selectManager(e)}
                >
                  {e}
                  <FontAwesomeIcon
                    icon={faClose}
                    className="category-delete-button"
                    onClick={(e) => deleteManager(e, i)}
                  />
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}
