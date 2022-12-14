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
  list: QUERY[];
  setList: Dispatch<React.SetStateAction<QUERY[]>>;
}

export default function PathTypeModal({
  setIsPathTypeOpen,
  clickElementPos,
  selectIdx,
  isPathVar,
  store,
  list,
  setList,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    modalContainer.current.style.left = `${clickElementPos.x}px`;
    modalContainer.current.style.top = `${clickElementPos.y}px`;
  }, [clickElementPos]);

  const onPathTypeClick = useCallback(
    (e: any, type: string) => {
      const copyArr = [...list];
      copyArr[selectIdx].type = type;
      setList(copyArr);

      setIsPathTypeOpen(false);
    },
    [list],
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
                      list[selectIdx].type === type && 'select'
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
                      list[selectIdx].type === type && 'select'
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
