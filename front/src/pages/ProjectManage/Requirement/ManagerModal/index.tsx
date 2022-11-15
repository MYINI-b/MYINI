import { useCallback, Dispatch, useRef, useEffect } from 'react';

import './style.scss';
import { ELEMENTPOS, ROW } from 'types/Requirement';
import { USER } from 'types/Setting';
import { putApi } from 'api';

interface Props {
  closeManagerModal: () => void;
  clickElementPos: ELEMENTPOS;
  idx: number;
  store: any;
  rowId: number;
}

export default function CategoryListModal({
  closeManagerModal,
  clickElementPos,
  idx,
  store,
  rowId,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  const selectManager = useCallback(
    async (manager: USER) => {
      const body = {
        memberName: manager,
      };
      const { data }: any = await putApi(
        `/requirementdocs/requirements/${rowId}/members`,
        body,
      );

      store.pjt.rows[idx].manager = manager;
      closeManagerModal();
    },
    [store, idx],
  );

  useEffect(() => {
    modalContainer.current.style.left = `${clickElementPos.x}px`;
    modalContainer.current.style.top = `${clickElementPos.y}px`;
    modalContainer.current.style.width = `${clickElementPos.width}px`;
    console.log(store.pjt.jiraMembers);
  }, [clickElementPos]);

  return (
    <div className="category-list-empty" onClick={closeManagerModal}>
      <div
        className="category-list-container"
        onClick={(e) => e.stopPropagation()}
        ref={modalContainer}
      >
        <div className="category-list-overflow">
          {store.pjt.jiraMembers &&
            store.pjt.jiraMembers.map((user: USER, i: number) => {
              return (
                <span
                  className={`category-row ${
                    store.pjt.rows[idx].manager === user.name && 'select'
                  }`}
                  key={i}
                  onClick={() => selectManager(user)}
                >
                  {user.name}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}
