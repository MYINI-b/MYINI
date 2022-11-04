import { useCallback, Dispatch, useRef, useEffect } from 'react';

import { DIVISION_LIST } from 'constants/index';
import './style.scss';
import { ELEMENTPOS, ROW } from 'types/Requirement';

interface Props {
  setIsDivisionOpen: Dispatch<React.SetStateAction<boolean>>;
  clickElementPos: ELEMENTPOS;
  idx: number;
  store: any;
}

export default function DivisionModal({
  setIsDivisionOpen,
  clickElementPos,
  idx,
  store,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  const selectdivision = useCallback(
    (division: string) => {
      store.pjt.rows[idx].division = division;
      setIsDivisionOpen(false);
    },
    [store, idx],
  );

  useEffect(() => {
    modalContainer.current.style.left = `${clickElementPos.x}px`;
    modalContainer.current.style.top = `${clickElementPos.y}px`;
    modalContainer.current.style.width = `${clickElementPos.width}px`;
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
