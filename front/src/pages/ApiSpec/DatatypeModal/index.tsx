import { Dispatch, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faChevronDown,
  faChevronUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';

interface Props {
  setIsDatatypeModalOpen: Dispatch<React.SetStateAction<boolean>>;
  dataType: any[];
  setDataType: Dispatch<React.SetStateAction<any[]>>;
}

interface ATTRIBUTE {
  name: string;
  type: string;
}

export default function DatatypeModal({
  setIsDatatypeModalOpen,
  dataType,
  setDataType,
}: Props) {
  const [objDataType, setObjDataType] = useState<Array<any>>([
    ...dataType.filter((dt, i) => i >= 10),
    { name: 'test', isOpen: true },
    { name: 'test', isOpen: true },
    { name: 'test', isOpen: true },
    { name: 'test', isOpen: true },
    { name: 'test', isOpen: true },
    { name: 'test', isOpen: true },
    { name: 'test', isOpen: true },
    { name: 'test', isOpen: true },
    { name: 'test', isOpen: true },
    { name: 'test', isOpen: true },
    { name: 'test', isOpen: true },
  ]);
  const [isDatatypeAddOpen, setIsDatatypeAddOpen] = useState(false);
  const [newObjAttribute, setNewObjAttribute] = useState<Array<ATTRIBUTE>>([]);

  const closeModal = useCallback(() => {
    setIsDatatypeModalOpen(false);
  }, [setIsDatatypeModalOpen]);

  const toggleObjDatatype = useCallback((idx: number) => {
    const copyArr = [...objDataType];
    copyArr[idx].isOpen = !copyArr[idx].isOpen;
    setObjDataType(copyArr);
  }, []);

  const onDatatypeAddClick = useCallback(() => {
    setIsDatatypeAddOpen(true);
  }, []);

  const addNewAttribute = useCallback(
    (idx: number) => {
      const copyArr = [...newObjAttribute];
      copyArr.splice(idx, 0, { name: '', type: 'String' });
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
          {objDataType.length > 0 &&
            objDataType.map((dt, i) => {
              return (
                <div
                  className="datatype-content"
                  key={i}
                  onClick={() => toggleObjDatatype(i)}
                >
                  <div className="datatype-title-wrapper">
                    <h1 className="datatype-content-title">d</h1>
                    <FontAwesomeIcon
                      icon={dt.isOpen ? faChevronUp : faChevronDown}
                      className="datatype-content-openbtn"
                    />
                  </div>
                </div>
              );
            })}
          {isDatatypeAddOpen ? (
            <div className="datatype-add-form">
              <input
                type="text"
                className="datatype-add-input"
                placeholder="Dto 명"
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
                        onClick={(e) => e.stopPropagation()}
                      >
                        {attr.type}
                      </button>
                      <input
                        type="text"
                        onChange={(e) => changeAttrName(i, e)}
                        value={attr.name}
                        onClick={(e) => e.stopPropagation()}
                        className="attr-type-name"
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
                <button className="datatype-add-form-button" type="button">
                  등록
                </button>
              </div>
            </div>
          ) : (
            <button
              className="datatype-add-button"
              type="button"
              onClick={onDatatypeAddClick}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>

        <button className="datatype-modal-button" type="button">
          확인
        </button>
      </div>
    </section>
  );
}
