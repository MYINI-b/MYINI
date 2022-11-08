import { Dispatch, useRef, useEffect, useCallback } from 'react';
import './style.scss';
import { ELEMENTPOS } from 'types/Requirement';
import { QUERY } from 'types/ApiSpec';
import { PATHVARIABLE_TYPE, DATATYPE } from 'constants/index';

interface Props {
  setIsPathTypeOpen: Dispatch<React.SetStateAction<boolean>>;
  clickElementPos: ELEMENTPOS;
  selectIdx: number;
  isPathVar: boolean;
  store: any;
}

export default function PathTypeModal({
  setIsPathTypeOpen,
  clickElementPos,
  selectIdx,
  isPathVar,
  store,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    modalContainer.current.style.left = `${clickElementPos.x}px`;
    modalContainer.current.style.top = `${clickElementPos.y}px`;
  }, [clickElementPos]);

  const onPathTypeClick = useCallback(
    (e: any, type: string) => {
      if (isPathVar) {
        store.pjt.currentAPI.pathVarList[selectIdx].type = type;
      } else {
        store.pjt.currentAPI.queryList[selectIdx].type = type;
      }

      setIsPathTypeOpen(false);
    },
    [store],
  );

  return (
    <div
      className="pathtype-modal-empty"
      onClick={() => setIsPathTypeOpen(false)}
    >
      <div
        className="pathtype-modal-container"
        onClick={(e) => e.stopPropagation()}
        ref={modalContainer}
      >
        <ul className="pathtype-modal-overflow">
          {isPathVar
            ? PATHVARIABLE_TYPE.map((type, i) => {
                return (
                  <li
                    className={`pathtype-modal-row ${
                      store.pjt.currentAPI.pathVarList[selectIdx].type ===
                        type && 'select'
                    }`}
                    key={i}
                    onClick={(e) => onPathTypeClick(e, type)}
                  >
                    {type}
                  </li>
                );
              })
            : DATATYPE.map((type, i) => {
                return (
                  <li
                    className={`pathtype-modal-row ${
                      store.pjt.currentAPI.queryList[selectIdx].type === type &&
                      'select'
                    }`}
                    key={i}
                    onClick={(e) => onPathTypeClick(e, type)}
                  >
                    {type}
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}
