import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useCallback, Dispatch, useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './style.scss';
import { ELEMENTPOS, ROW } from 'types/Requirement';
import { USER } from 'types/Setting';
import { deleteApi } from 'api';

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
  const { pid } = useParams();

  const deleteManager = useCallback(
    async (e: any, i: number, user: USER) => {
      e.stopPropagation();

      const { data }: any = await deleteApi(
        `/projects/${pid}/members/${user.id}`,
      );
      console.log(data);

      store.pjt.rows.forEach((row: ROW) => {
        if (row.manager === user.name) row.manager = '';
      });
      store.pjt.members.splice(i, 1);
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
          {store.pjt.members &&
            store.pjt.members.map((user: USER, i: number) => {
              return (
                <span
                  className={`category-row ${
                    store.pjt.rows[idx].manager === user.name && 'select'
                  }`}
                  key={i}
                  onClick={() => selectManager(user.name)}
                >
                  {user.name}
                  <FontAwesomeIcon
                    icon={faClose}
                    className="category-delete-button"
                    onClick={(e) => deleteManager(e, i, user)}
                  />
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}
