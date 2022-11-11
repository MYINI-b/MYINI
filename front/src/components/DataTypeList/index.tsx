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

import { RootState } from 'modules/Reducers';
import { useSelector } from 'react-redux';
import './style.scss';
import { DTO_RESPONSE } from 'types/ApiSpec';
import { getApi, putApi } from 'api';

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
  const { pid } = useSelector((state: RootState) => state.project);
  const [types, setTypes] = useState<any[]>([]);
  const [isListCheck, setIsListCheck] = useState(
    attribute[selectIdx] ? attribute[selectIdx].dtoIsList : false,
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
    async (type: any) => {
      const copyArr = [...attribute];

      if (type.dtoId && type.dtoId >= 0) {
        copyArr[selectIdx].dtoPrimitiveTypeId = null;
        copyArr[selectIdx].dtoPrimitiveTypeName = '';
        copyArr[selectIdx].dtoClassTypeId = type.dtoId;
        copyArr[selectIdx].dtoClassTypeName = type.dtoName;
      } else {
        copyArr[selectIdx].dtoClassTypeId = null;
        copyArr[selectIdx].dtoClassTypeName = '';
        copyArr[selectIdx].dtoPrimitiveTypeId = type.primitiveId;
        copyArr[selectIdx].dtoPrimitiveTypeName = type.primitiveName;
      }
      copyArr[selectIdx].dtoIsList = isListCheck;

      const body = {
        dtoItemName: copyArr[selectIdx].dtoItemName,
        dtoClassType: copyArr[selectIdx].dtoClassTypeId
          ? copyArr[selectIdx].dtoClassTypeId
          : null,
        dtoPrimitiveType: copyArr[selectIdx].dtoPrimitiveTypeId
          ? copyArr[selectIdx].dtoPrimitiveTypeId
          : null,
        dtoIsList: copyArr[selectIdx].dtoIsList ? 'Y' : 'N',
      };
      await putApi(`/apidocs/dtoitems/${attribute[selectIdx].dtoItemId}`, body);
      setAttribute(copyArr);
      closeModal();
    },
    [isListCheck, attribute],
  );

  const changeListCheck = useCallback(async () => {
    const copyArr = [...attribute];
    copyArr[selectIdx].dtoIsList = !isListCheck;

    const body = {
      dtoItemName: copyArr[selectIdx].dtoItemName,
      dtoClassType: copyArr[selectIdx].dtoClassTypeId
        ? copyArr[selectIdx].dtoClassTypeId
        : null,
      dtoPrimitiveType: copyArr[selectIdx].dtoPrimitiveTypeId
        ? copyArr[selectIdx].dtoPrimitiveTypeId
        : null,
      dtoIsList: copyArr[selectIdx].dtoIsList ? 'Y' : 'N',
    };
    await putApi(`/apidocs/dtoitems/${attribute[selectIdx].dtoItemId}`, body);
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
