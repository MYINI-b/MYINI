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
import { useParams } from 'react-router-dom';
import { DTO_RESPONSE } from 'types/ApiSpec';
import { getApi } from 'api';

interface MousePos {
  x: number;
  y: number;
}

interface Props {
  setIsDatatypeListOpen: Dispatch<SetStateAction<boolean>>;
  mousePos: MousePos;
  selectIdx: number;
  isAll: boolean;
  attribute: DTO_RESPONSE[];
  setAttribute: Dispatch<React.SetStateAction<DTO_RESPONSE[]>>;
}

export default function DataTypeList({
  setIsDatatypeListOpen,
  mousePos,
  selectIdx,
  isAll,
  attribute,
  setAttribute,
}: Props) {
  const { pid } = useParams();
  const [types, setTypes] = useState<any[]>([]);
  const [isListCheck, setIsListCheck] = useState(
    attribute[selectIdx].dtoIsList,
  );
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    modalContainer.current.style.left = `${mousePos.x}px`;
    modalContainer.current.style.top = `${mousePos.y}px`;
  }, [mousePos]);

  const closeModal = () => {
    setIsDatatypeListOpen(false);
  };

  const selectDataType = useCallback(
    (type: any) => {
      const copyArr = [...attribute];
      if (type.dtoId && type.dtoId >= 0) {
        copyArr[selectIdx].dtoPrimitiveTypeId = -1;
        copyArr[selectIdx].dtoPrimitiveTypeName = '';
        copyArr[selectIdx].dtoClassTypeId = type.dtoId;
        copyArr[selectIdx].dtoClassTypeName = type.dtoName;
      } else {
        copyArr[selectIdx].dtoClassTypeId = -1;
        copyArr[selectIdx].dtoClassTypeName = '';
        copyArr[selectIdx].dtoPrimitiveTypeId = type.primitiveId;
        copyArr[selectIdx].dtoPrimitiveTypeName = type.primitiveName;
      }
      copyArr[selectIdx].dtoIsList = isListCheck;
      setAttribute(copyArr);
      closeModal();
    },
    [isListCheck, attribute],
  );

  const changeListCheck = useCallback(() => {
    const copyArr = [...attribute];
    copyArr[selectIdx].dtoIsList = !isListCheck;
    setIsListCheck((prev) => !prev);
    setAttribute(copyArr);
  }, [attribute, isListCheck]);

  useEffect(() => {
    const getTypes = async () => {
      const primitiveResp: any = await getApi(`/apidocs/primitive`);
      const dtoResp: any = await getApi(`/apidocs/${pid}/dtotype`);
      const totalArr = [...primitiveResp.data];
      if (isAll) setTypes(totalArr.concat([...dtoResp.data]));
      else setTypes(totalArr);
    };

    getTypes();
  }, []);

  return (
    <div className="dtlist-container" onClick={closeModal}>
      <div
        className="dtlist-content-container"
        ref={modalContainer}
        onClick={(e: any) => e.stopPropagation()}
      >
        {' '}
        {types.length > 0 && (
          <>
            <div className="dtlist-button-container">
              <span
                className={`checkbox-span ${isListCheck}`}
                onClick={changeListCheck}
              >
                {isListCheck && <FontAwesomeIcon icon={faCheck} />}
              </span>
              <label onClick={changeListCheck}>&nbsp;List</label>
            </div>
            {types.map((type: any, i: number) => (
              <p
                className={`dtlist-menu ${
                  (type.primitiveName || type.dtoName) ===
                    (attribute[selectIdx].dtoClassTypeName ||
                      attribute[selectIdx].dtoPrimitiveTypeName) && 'select'
                }`}
                key={i}
                onClick={() => selectDataType(type)}
              >
                {type.primitiveName || type.dtoName}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
