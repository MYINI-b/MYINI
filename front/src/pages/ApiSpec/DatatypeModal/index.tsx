import { Dispatch, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faChevronDown,
  faChevronUp,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { ATTRIBUTE, ATTRIBUTE_PLUS, MOUSEPOS } from 'types/ApiSpec';
import DataTypeList from 'components/DataTypeList';

interface Props {
  setIsDatatypeModalOpen: Dispatch<React.SetStateAction<boolean>>;
  dataType: string[];
  objDataType: any[];
  setObjDataType: Dispatch<React.SetStateAction<any[]>>;
}

export default function DatatypeModal({
  setIsDatatypeModalOpen,
  dataType,
  objDataType,
  setObjDataType,
}: Props) {
  const [isDatatypeAddOpen, setIsDatatypeAddOpen] = useState(false);
  const [dtoName, setDtoName] = useState('');
  const [newObjAttribute, setNewObjAttribute] = useState<Array<ATTRIBUTE>>([]);
  const [isDatatypeListOpen, setIsDatatypeListOpen] = useState(false);
  const [mousePos, setMousePos] = useState<MOUSEPOS>({ x: 0, y: 0 });
  const [selectInfo, setSelectInfo] = useState<ATTRIBUTE_PLUS>({
    name: '',
    idx: 0,
    type: 'string',
    isList: false,
  });

  const closeModal = useCallback(() => {
    setIsDatatypeModalOpen(false);
  }, [setIsDatatypeModalOpen]);

  const toggleObjDatatype = useCallback(
    (idx: number) => {
      const copyArr = [...objDataType];
      copyArr[idx].isOpen = !copyArr[idx].isOpen;
      setObjDataType(copyArr);
    },
    [objDataType],
  );

  const onDatatypeAddClick = useCallback(() => {
    setIsDatatypeAddOpen(true);
  }, []);

  const addNewAttribute = useCallback(
    (idx: number) => {
      const copyArr = [...newObjAttribute];
      copyArr.splice(idx, 0, { name: '', type: 'string', isList: false });
      setNewObjAttribute(copyArr);
    },
    [newObjAttribute],
  );

  const addNewAttrWithEnter = useCallback(
    (idx: number, e: any) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();

      const copyArr = [...newObjAttribute];
      copyArr.splice(idx, 0, { name: '', type: 'string', isList: false });
      setNewObjAttribute(copyArr);
    },
    [newObjAttribute],
  );

  const changeAttrName = useCallback(
    (idx: number, e: any) => {
      const copyArr = [...newObjAttribute];
      copyArr[idx].name = e.target.value;
      setNewObjAttribute(copyArr);
    },
    [newObjAttribute],
  );

  const deleteAttr = useCallback(
    (idx: number, e: any) => {
      e.stopPropagation();
      const copyArr = [...newObjAttribute].filter((attr, i) => i !== idx);
      setNewObjAttribute(copyArr);
    },
    [newObjAttribute],
  );

  const openDataTypeList = useCallback(
    (idx: number, e: any) => {
      e.stopPropagation();
      e.preventDefault();
      setMousePos({ x: e.clientX, y: e.clientY });
      setSelectInfo({ ...newObjAttribute[idx], idx });
      setIsDatatypeListOpen((prev) => !prev);
    },
    [newObjAttribute],
  );

  const addDataType = useCallback(
    (e: any) => {
      e.preventDefault();

      const validAttr = [...newObjAttribute].filter((attr) => attr.name !== '');

      if (validAttr.length === 0) {
        alert('한 개 이상의 유효한 자료형이 필요합니다.');
        return;
      }

      const newDataTypeObj = {
        name: dtoName,
        type: dtoName,
        attr: validAttr,
        isOpen: false,
      };
      setNewObjAttribute([]);
      setDtoName('');
      setObjDataType([...objDataType, newDataTypeObj]);
      setIsDatatypeAddOpen(false);
      console.log(newObjAttribute);
    },
    [newObjAttribute],
  );

  return (
    <section className="modal-empty">
      <div
        className="datatype-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="closebtn-container">
          <FontAwesomeIcon icon={faClose} onClick={closeModal} />
        </div>

        <div className="datatype-modal-body">
          {isDatatypeAddOpen ? (
            <form className="datatype-add-form" onSubmit={addDataType}>
              <input
                type="text"
                className="datatype-add-input"
                placeholder="Dto 명"
                value={dtoName}
                onChange={(e) => setDtoName(e.target.value)}
                required
              />
              <div className="datatype-add-body">
                <p
                  className="datatype-add-brace"
                  onClick={() => addNewAttribute(0)}
                >
                  &#123;
                </p>
                {newObjAttribute.map((attr, i) => {
                  return (
                    <div
                      className="attr-div"
                      key={i}
                      onClick={() => addNewAttribute(i + 1)}
                    >
                      <button
                        type="button"
                        className="attr-type-button"
                        onClick={(e) => openDataTypeList(i, e)}
                      >
                        {attr.isList ? `List<${attr.type}>` : attr.type}
                      </button>
                      <input
                        type="text"
                        onChange={(e) => changeAttrName(i, e)}
                        value={attr.name}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => addNewAttrWithEnter(i + 1, e)}
                        className="attr-type-name"
                      />

                      <FontAwesomeIcon
                        icon={faTrash}
                        className="attr-type-delete"
                        onClick={(e) => deleteAttr(i, e)}
                      />
                    </div>
                  );
                })}
                <p className="datatype-add-brace">&#125;</p>
              </div>
              <div className="datatype-button-wrapper">
                <button
                  className="datatype-add-form-button"
                  type="button"
                  onClick={() => setIsDatatypeAddOpen(false)}
                >
                  취소
                </button>
                <button className="datatype-add-form-button" type="submit">
                  등록
                </button>
              </div>
            </form>
          ) : (
            <button
              className="datatype-add-button"
              type="button"
              onClick={onDatatypeAddClick}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
          {objDataType.length > 0 &&
            objDataType.map((dt, i) => {
              return (
                <div className="datatype-content" key={i}>
                  <div
                    className="datatype-title-wrapper"
                    onClick={() => toggleObjDatatype(i)}
                  >
                    <h1 className="datatype-content-title">{dt.name}</h1>
                    <FontAwesomeIcon
                      icon={dt.isOpen ? faChevronUp : faChevronDown}
                      className="datatype-content-openbtn"
                    />
                  </div>
                  {dt.isOpen && (
                    <div className="datatype-attr-list">
                      <p className="datatype-add-brace">&#123;</p>
                      {dt.attr.map((atr: any, j: number) => {
                        return (
                          <div className="attr-div" key={j}>
                            <button type="button" className="attr-type-button">
                              {atr.isList ? `List<${atr.type}>` : atr.type}
                            </button>
                            <input
                              type="text"
                              value={atr.name}
                              className="attr-type-name"
                              readOnly
                            />
                          </div>
                        );
                      })}
                      <p className="datatype-add-brace">&#125;</p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        <button
          className="datatype-modal-button"
          type="button"
          onClick={() => setIsDatatypeModalOpen(false)}
        >
          확인
        </button>
      </div>

      {isDatatypeListOpen && (
        <DataTypeList
          setIsDatatypeListOpen={setIsDatatypeListOpen}
          mousePos={mousePos}
          dataType={dataType}
          objDataType={objDataType}
          selectInfo={selectInfo}
          newObjAttribute={newObjAttribute}
          setNewObjAttribute={setNewObjAttribute}
        />
      )}
    </section>
  );
}
