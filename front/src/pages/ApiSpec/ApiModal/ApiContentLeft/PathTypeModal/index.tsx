import { Dispatch, useRef, useEffect, useCallback } from 'react';
import './style.scss';
import { ELEMENTPOS } from 'types/Requirement';
import { QUERY } from 'types/ApiSpec';
import { PATHVARIABLE_TYPE, DATATYPE } from 'constants/index';

interface Props {
  setIsPathTypeOpen: Dispatch<React.SetStateAction<boolean>>;
  clickElementPos: ELEMENTPOS;
  list: QUERY[];
  setList: Dispatch<React.SetStateAction<QUERY[]>>;
  selectIdx: number;
  isPathVar: boolean;
}

export default function PathTypeModal({
  setIsPathTypeOpen,
  clickElementPos,
  list,
  setList,
  selectIdx,
  isPathVar,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    modalContainer.current.style.left = `${clickElementPos.x}px`;
    modalContainer.current.style.top = `${clickElementPos.y}px`;
    modalContainer.current.style.width = `${clickElementPos.width}px`;
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
                    className={`pathtype-modal-row `}
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
                    className={`pathtype-modal-row `}
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
