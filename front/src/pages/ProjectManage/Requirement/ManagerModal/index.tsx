import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useCallback, Dispatch, useRef, useEffect, useState } from 'react';

import './style.scss';
import { ELEMENTPOS, ROW } from 'types/Requirement';

interface Props {
  managers: string[];
  setManagers: Dispatch<React.SetStateAction<string[]>>;
  closeManagerModal: () => void;
  clickElementPos: ELEMENTPOS;
  rows: ROW[];
  setRows: Dispatch<React.SetStateAction<ROW[]>>;
  idx: number;
}

export default function CategoryListModal({
  managers,
  setManagers,
  closeManagerModal,
  clickElementPos,
  rows,
  setRows,
  idx,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [managerInput, setManagerInput] = useState('');

  const deleteManager = useCallback(
    (e: any, idx: number) => {
      e.stopPropagation();
      const copyManagers = [...managers];
      const copyRows = [...rows];
      copyRows.forEach((e) => {
        if (e.manager === copyManagers[idx]) e.manager = '';
      });
      copyManagers.splice(idx, 1);
      setManagers(copyManagers);
      setRows(copyRows);
    },
    [managers, setManagers, rows],
  );

  const addNewCategory = (e: any) => {
    if (e.key === 'Enter') {
      setManagers([...managers, managerInput]);
      setManagerInput('');
      e.target.value = '';
    }
  };

  const onChangemanagerInput = useCallback(
    (e: any) => {
      setManagerInput(e.target.value);
    },
    [setManagerInput],
  );

  const selectManager = useCallback(
    (manager: string) => {
      const copyRows = [...rows];
      copyRows[idx].manager = manager;
      setRows(copyRows);
      closeManagerModal();
    },
    [rows, idx],
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
            onKeyDown={addNewCategory}
            onClick={(e) => e.stopPropagation()}
          />
          {managers.map((e, i) => {
            return (
              <span
                className={`category-row ${
                  rows[idx].manager === e && 'select'
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
