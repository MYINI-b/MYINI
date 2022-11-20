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
import { useParams } from 'react-router-dom';
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
  attribute: DTO_RESPONSE[];
  setAttribute: Dispatch<React.SetStateAction<DTO_RESPONSE[]>>;
}

export default function DataTypeList({
  setIsDatatypeListOpen,
  mousePos,
  selectIdx,
  attribute,
  setAttribute,
}: Props) {
  const { pid } = useSelector((state: RootState) => state.project);
  const [types, setTypes] = useState<any[]>([]);
  const [isListCheck, setIsListCheck] = useState(false);
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
      const newDatatype = {
        dtoItemId: -1,
        dtoItemName: '',
        dtoClassTypeId: type.dtoId ? type.dtoId : null,
        dtoPrimitiveTypeId: type.primitiveId ? type.primitiveId : null,
        dtoClassTypeName: type.dtoName ? type.dtoName : null,
        dtoPrimitiveTypeName: type.primitiveName ? type.primitiveName : null,
        dtoIsList: isListCheck,
      };
      copyArr.push(newDatatype);
      console.log(copyArr);
      setAttribute(copyArr);
      closeModal();
    },
    [isListCheck, attribute],
  );

  const changeListCheck = useCallback(async () => {
    setIsListCheck((prev) => !prev);
  }, []);

  useEffect(() => {
    const getTypes = async () => {
      const dtResp: any = await getApi(`/apidocs/${pid}/types`);
      const totalArr = [
        ...dtResp.data.primitiveTypeResponses,
        ...dtResp.data.classTypeResponses,
      ];
      console.log(totalArr);
      setTypes(totalArr);
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
                className="dtlist-menu"
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
