import { useCallback, Dispatch, useRef, useEffect } from 'react';

import { DIVISION_LIST } from 'constants/index';
import './style.scss';
import { ELEMENTPOS, ROW } from 'types/Requirement';
import { putApi } from 'api';

interface Props {
  setIsDivisionOpen: Dispatch<React.SetStateAction<boolean>>;
  clickElementPos: ELEMENTPOS;
  idx: number;
  store: any;
  rowId: number;
}

export default function DivisionModal({
  setIsDivisionOpen,
  clickElementPos,
  idx,
  store,
  rowId,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  const selectdivision = useCallback(
    async (division: string) => {
      const body = {
        requirementPart: division,
      };
      const { data }: any = await putApi(
        `/requirementdocs/requirements/${rowId}/parts`,
        body,
      );
      store.pjt.rows[idx].division = division;
      setIsDivisionOpen(false);
    },
    [store, idx, rowId],
  );

  useEffect(() => {
    modalContainer.current.style.left = `${clickElementPos.x}px`;
    modalContainer.current.style.top = `${clickElementPos.y}px`;
    modalContainer.current.style.width = `${clickElementPos.width}px`;
    if (clickElementPos.y + 80 >= window.innerHeight - 30) {
      modalContainer.current.style.top = `${clickElementPos.y - 80}px`;
    }
  }, [clickElementPos]);

  return (
    <div
      className="division-list-empty"
      onClick={() => setIsDivisionOpen(false)}
    >
      <div
        className="division-list-container"
        onClick={(e) => e.stopPropagation()}
        ref={modalContainer}
      >
        <div className="division-list-overflow">
          {DIVISION_LIST.map((e: string, i: number) => {
            return (
              <span
                className={`division-row ${
                  store.pjt.rows[idx].division === e && 'select'
                }`}
                key={i}
                onClick={() => selectdivision(e)}
              >
                {e}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
