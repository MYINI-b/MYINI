import { useState, useCallback, useEffect } from 'react';
import {
  faChevronDown,
  faChevronUp,
  faEdit,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DTO, DTO_RESPONSE, MOUSEPOS } from 'types/ApiSpec';
import { getApi, postApi, putApi } from 'api';
import DataTypeList from 'components/DataTypeList';
import './style.scss';

interface Props {
  rowId: number;
}
export default function DatatypeRow({ rowId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [mousePos, setMousePos] = useState<MOUSEPOS>({ x: 0, y: 0 });
  const [isDtoModalOpen, setIsDtoModalOpen] = useState(false);
  const [attributes, setAttributes] = useState<Array<DTO_RESPONSE>>([]);
  const [selectIdx, setSelectIdx] = useState(-1);
  const [dto, setDto] = useState<DTO>({
    dtoId: 0,
    dtoName: '',
    dtoType: 'DTO',
    dtoItemResponses: [],
    dtoIsList: false,
  });

  const toggleDto = useCallback(() => {
    setIsOpen((prev) => !prev);
    setIsEdit(false);
    if (isOpen) setAttributes([]);
  }, []);

  const deleteDatatype = useCallback(() => {}, []);

  const onEditClick = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onEditFinishClick = useCallback(async () => {
    const copyDto: any = { ...dto };
    copyDto.dtoIsList = copyDto === 'Y';

    await putApi(`/apidocs/dtos/${dto.dtoId}`, copyDto);

    //

    // await putApi(`/apidocs/dtoitems/${dto.dtoId}`);
    setIsEdit(false);
    setAttributes([]);
  }, [dto, attributes]);

  const onNameChange = useCallback(
    (e: any) => {
      const copyDto = { ...dto };
      copyDto.dtoName = e.target.value;
      setDto(copyDto);
    },
    [dto],
  );

  const onAttrChange = useCallback(
    (e: any, i: number) => {
      const copyAttrs = [...attributes];
      copyAttrs[i].dtoItemName = e.target.value;
      setAttributes(copyAttrs);
    },
    [attributes],
  );

  const onTypeClick = useCallback(
    (e: any, idx: number) => {
      if (!isEdit) return;
      setMousePos({ x: e.clientX, y: e.clientY });
      setSelectIdx(idx);
      setIsDtoModalOpen(true);
    },
    [isEdit],
  );

  const addNewAttribute = useCallback(() => {
    const copyResponses = [...attributes];
    copyResponses.push({
      dtoItemId: -1,
      dtoItemName: '',
      dtoClassTypeId: 0,
      dtoClassTypeName: '',
      dtoPrimitiveTypeId: 9,
      dtoPrimitiveTypeName: 'String',
      dtoIsList: false,
    });

    setAttributes(copyResponses);
  }, [attributes]);

  const deleteAttr = useCallback(
    (idx: number, e: any) => {
      e.stopPropagation();
      const copyArr = [...attributes];
      copyArr.splice(idx, 1);
      setAttributes(copyArr);
    },
    [attributes],
  );

  useEffect(() => {
    const getDtoInfo = async () => {
      const { data }: any = await getApi(`/apidocs/dtos/${rowId}`);
      setDto(data);
      setAttributes(data.dtoItemResponses);
    };

    setTimeout(() => {
      getDtoInfo();
    }, 50);
  }, []);

  return (
    <div className="datatype-content">
      <div className="datatype-title-wrapper" onClick={toggleDto}>
        <input
          type="text"
          className={`datatype-content-title ${isEdit && 'edit'}`}
          value={dto.dtoName}
          readOnly={!isEdit}
          onChange={onNameChange}
          onClick={(e) => e.stopPropagation()}
        />
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="datatype-content-openbtn"
        />
      </div>
      {isOpen && (
        <>
          <div className="datatype-attr-list">
            <p className="datatype-add-brace">&#123;</p>

            {attributes.map((atr: DTO_RESPONSE, j: number) => {
              return (
                <div className="attr-div" key={j}>
                  <button
                    type="button"
                    className="attr-type-button"
                    onClick={(e) => onTypeClick(e, j)}
                  >
                    {atr.dtoIsList
                      ? `List<${
                          atr.dtoClassTypeName || atr.dtoPrimitiveTypeName
                        }>`
                      : atr.dtoClassTypeName || atr.dtoPrimitiveTypeName}
                  </button>
                  <input
                    type="text"
                    value={atr.dtoItemName}
                    onChange={(e) => onAttrChange(e, j)}
                    className={`attr-type-name ${isEdit && 'edit'}`}
                    readOnly={!isEdit}
                    required
                  />

                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="attr-type-delete"
                    onClick={(e) => deleteAttr(j, e)}
                  />
                </div>
              );
            })}
            {isEdit && (
              <button
                type="button"
                className="datatype-add-btn"
                onClick={addNewAttribute}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
            <p className="datatype-add-brace">&#125;</p>
          </div>{' '}
          <div className="datatype-button-wrapper">
            {isEdit ? (
              <button
                type="button"
                onClick={onEditFinishClick}
                className="datatype-add-form-button"
              >
                완료{' '}
              </button>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="attr-type-delete"
                  onClick={onEditClick}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="attr-type-delete"
                  onClick={() => deleteDatatype}
                />
              </>
            )}
          </div>
        </>
      )}

      {isDtoModalOpen && (
        <DataTypeList
          mousePos={mousePos}
          setIsDatatypeListOpen={setIsDtoModalOpen}
          isAll
          attribute={attributes}
          selectIdx={selectIdx}
          setAttribute={setAttributes}
        />
      )}
    </div>
  );
}
