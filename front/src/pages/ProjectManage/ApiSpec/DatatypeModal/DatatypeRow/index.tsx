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
import { deleteApi, getApi, postApi, putApi } from 'api';
import DataTypeList from 'components/DataTypeList';
import './style.scss';

interface Props {
  rowId: number;
  dtoRows: any[];
  setDtoRows: React.Dispatch<React.SetStateAction<any[]>>;
  rowIdx: number;
}
export default function DatatypeRow({
  rowId,
  dtoRows,
  setDtoRows,
  rowIdx,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isList, setIsList] = useState(false);
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
  }, []);

  const deleteDatatype = useCallback(async () => {
    await deleteApi(`/apidocs/dtos/${dto.dtoId}`);
    const copyRows = [...dtoRows];
    copyRows.splice(rowIdx, 1);
    setDtoRows(copyRows);
    setIsEdit(false);
  }, [dtoRows, dto, rowIdx]);

  const onEditClick = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onEditFinishClick = useCallback(async () => {
    // dto제목 정보 수정
    const copyDto: any = { ...dto };
    copyDto.dtoItemResponses = [...attributes].map((attr) => {
      return {
        ...attr,
        dtoIsList: attr.dtoIsList ? 'Y' : 'N',
      };
    });
    copyDto.dtoIsList = copyDto.dtoIsList ? 'Y' : 'N';
    console.log(copyDto);
    await putApi(`/apidocs/dtos/${dto.dtoId}`, copyDto);

    let cnt = 0;
    copyDto.dtoItemResponses.forEach(async (attr: any) => {
      if (attr.dtoItemName !== '') {
        console.log(attr);
        cnt++;
      }
    });

    setIsEdit(false);
    // 모든 속성이 다 빈칸이면 지움
    if (cnt === 0) {
      deleteDatatype();
      await deleteApi(`/apidocs/dtos/${dto.dtoId}`);
    }
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
    async (e: any, i: number) => {
      const copyAttrs = [...attributes];

      if (copyAttrs[i].dtoItemId === -1) {
        const body = {
          dtoItemName: e.target.value,
          dtoPrimitiveType: copyAttrs[i].dtoPrimitiveTypeId
            ? copyAttrs[i].dtoPrimitiveTypeId
            : null,
          dtoClassType: copyAttrs[i].dtoClassTypeId
            ? copyAttrs[i].dtoClassTypeId
            : null,
          dtoIsList: 'N',
        };
        const { data }: any = await postApi(
          `/apidocs/${dto.dtoId}/dtoitems`,
          body,
        );
        data.dtoIsList = data.dtoIsList === 'Y';
        copyAttrs[i] = { ...data };
        console.log(copyAttrs);
      } else copyAttrs[i].dtoItemName = e.target.value;

      setAttributes(copyAttrs);
    },
    [attributes, dto],
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

  const addNewAttribute = useCallback(async () => {
    const copyResponses = [...attributes];
    copyResponses.push({
      dtoItemId: -1,
      dtoItemName: '',
      dtoPrimitiveTypeId: 9,
      dtoPrimitiveTypeName: 'String',
      dtoIsList: false,
    });

    setAttributes(copyResponses);
  }, [attributes]);

  const deleteAttr = useCallback(
    async (idx: number, e: any) => {
      e.stopPropagation();
      if (!isEdit) return;

      await deleteApi(`/apidocs/dtoitems/${attributes[idx].dtoItemId}`);
      const copyArr = [...attributes];
      copyArr.splice(idx, 1);
      setAttributes(copyArr);
    },
    [attributes, isEdit],
  );

  const focusOutAttr = useCallback(
    async (idx: number) => {
      const body = {
        dtoItemName: attributes[idx].dtoItemName,
        dtoClassType: attributes[idx].dtoClassTypeId
          ? attributes[idx].dtoClassTypeId
          : null,
        dtoPrimitiveType: attributes[idx].dtoPrimitiveTypeId
          ? attributes[idx].dtoPrimitiveTypeId
          : null,
        dtoIsList: attributes[idx].dtoIsList ? 'Y' : 'N',
      };
      console.log(attributes[idx]);
      if (attributes[idx].dtoItemName !== '')
        await putApi(`/apidocs/dtoitems/${attributes[idx].dtoItemId}`, body);
    },
    [attributes],
  );

  useEffect(() => {
    const getDtoInfo = async () => {
      const { data }: any = await getApi(`/apidocs/dtos/${rowId}`);
      data.dtoIsList = data.dtoIsList === 'Y';
      setDto(data);
      setAttributes(
        data.dtoItemResponses.map((item: any) => {
          console.log(item);
          return {
            ...item,
            dtoIsList: item.dtoIsList === 'Y',
          };
        }),
      );
      console.log(data);
    };

    setTimeout(() => {
      getDtoInfo();
    }, 50);
  }, [rowId]);

  useEffect(() => {
    const inputs = document.querySelectorAll(
      `.attr-div > .attr-type-name.edit`,
    );
    if (isEdit) {
      inputs.forEach((elem, i) => {
        elem.addEventListener('focusout', () => {
          focusOutAttr(i);
        });
      });
    }
    return () => {
      inputs.forEach((elem, i) => {
        elem.removeEventListener('focusout', () => {
          focusOutAttr(i);
        });
      });
    };
  }, [isEdit]);

  return (
    <div className="datatype-content">
      <div className="datatype-title-wrapper" onClick={toggleDto}>
        <input
          type="text"
          className={`datatype-content-title ${isEdit && 'edit'}`}
          value={dto.dtoName}
          readOnly={!isEdit}
          onChange={onNameChange}
          onClick={(e) => isEdit && e.stopPropagation()}
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
                <div className={`attr-div ${isEdit && 'edit'}`} key={j}>
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
                    className={`attr-type-name  ${isEdit && 'edit'}`}
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
                  onClick={deleteDatatype}
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
