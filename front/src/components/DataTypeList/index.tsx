import {
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import { DATATYPE } from 'constants/';

interface MousePos {
  x: number;
  y: number;
}
interface ATTRIBUTE {
  name: string;
  type: string;
  isList: boolean;
  attr?: Array<ATTRIBUTE>;
}

interface ATTRIBUTE_PLUS extends ATTRIBUTE {
  idx: number;
}

interface Props {
  setIsDatatypeListOpen: Dispatch<SetStateAction<boolean>>;
  mousePos: MousePos;
  objDataType: any[];
  selectInfo: ATTRIBUTE_PLUS;
  newObjAttribute: ATTRIBUTE[];
  setNewObjAttribute: Dispatch<React.SetStateAction<ATTRIBUTE[]>>;
}

export default function DataTypeList({
  setIsDatatypeListOpen,
  mousePos,
  objDataType,
  selectInfo,
  newObjAttribute,
  setNewObjAttribute,
}: Props) {
  const [isListCheck, setIsListCheck] = useState(selectInfo.isList);
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    modalContainer.current.style.left = `${mousePos.x}px`;
    modalContainer.current.style.top = `${mousePos.y}px`;
  }, [mousePos]);

  const closeModal = () => {
    setIsDatatypeListOpen(false);
  };

  const selectDataType = useCallback(
    (idx: number, isNormal: boolean) => {
      const copyArr = [...newObjAttribute];

      copyArr[selectInfo.idx].type = isNormal
        ? DATATYPE[idx]
        : objDataType[idx].name;
      copyArr[selectInfo.idx].isList = isListCheck;
      if (!isNormal) copyArr[selectInfo.idx].attr = objDataType[idx].attr;
      else copyArr[selectInfo.idx].attr = [];
      setNewObjAttribute(copyArr);
      console.log(copyArr);
      closeModal();
    },
    [isListCheck],
  );

  const changeListCheck = useCallback(() => {
    const copyArr = [...newObjAttribute];
    copyArr[selectInfo.idx].isList = !isListCheck;
    setIsListCheck((prev) => !prev);
    setNewObjAttribute(copyArr);
  }, [newObjAttribute]);

  return (
    <div className="dtlist-container" onClick={closeModal}>
      <div
        className="dtlist-content-container"
        ref={modalContainer}
        onClick={(e: any) => e.stopPropagation()}
      >
        <div className="dtlist-button-container">
          <span
            className={`checkbox-span ${isListCheck}`}
            onClick={changeListCheck}
          >
            {isListCheck && <FontAwesomeIcon icon={faCheck} />}
          </span>
          <label onClick={changeListCheck}>&nbsp;List</label>
        </div>
        {DATATYPE.map((dt, i) => (
          <p
            className={`dtlist-menu ${dt === selectInfo.type ? 'select' : ''}`}
            key={i}
            onClick={() => selectDataType(i, true)}
          >
            {dt}
          </p>
        ))}
        {objDataType.map((dt, i) => (
          <p
            className={`dtlist-menu ${
              dt.name === selectInfo.type ? 'select' : ''
            }`}
            key={i}
            onClick={() => selectDataType(i, false)}
          >
            {dt.name}
          </p>
        ))}
      </div>
    </div>
  );
}
