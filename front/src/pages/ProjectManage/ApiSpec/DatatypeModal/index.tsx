import { Dispatch, useCallback, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { MOUSEPOS, DTO_RESPONSE, DTO } from 'types/ApiSpec';
import './style.scss';
import { RootState } from 'modules';
import { useSelector } from 'react-redux';
import DataTypeList from 'components/DataTypeList';
import { getApi, postApi } from 'api';
import DatatypeRow from './DatatypeRow';

interface Props {
  setIsDatatypeModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function DatatypeModal({ setIsDatatypeModalOpen }: Props) {
  const { pid } = useSelector((state: RootState) => state.project);
  const [isDatatypeAddOpen, setIsDatatypeAddOpen] = useState(false);
  const [dto, setDto] = useState<DTO>({
    dtoId: -1,
    dtoName: '',
    dtoType: '',
    dtoItemResponses: [],
  });
  const [attributes, setAttributes] = useState<Array<DTO_RESPONSE>>([]); // 새로 추가하는 dto의 속성들
  const [selectIdx, setSelectIdx] = useState(-1);
  const [isDatatypeListOpen, setIsDatatypeListOpen] = useState(false);
  const [mousePos, setMousePos] = useState<MOUSEPOS>({ x: 0, y: 0 });
  const [dtoRows, setDtoRows] = useState<any[]>([]);

  const closeModal = useCallback(() => {
    setIsDatatypeModalOpen(false);
  }, [setIsDatatypeModalOpen]);

  const onDatatypeAddClick = useCallback(() => {
    setIsDatatypeAddOpen(true);
  }, []);

  const onCancleClick = useCallback(() => {
    setIsDatatypeAddOpen(false);
    setDto({
      dtoId: -1,
      dtoName: '',
      dtoType: '',
      dtoItemResponses: [],
    });
  }, []);

  const addNewAttribute = useCallback(async () => {
    if (dto.dtoId === -1) {
      const body = {
        dtoName: dto.dtoName || 'UNTITLED',
        dtoType: 'DTO',
        dtoIsList: 'N',
      };
      const { data }: any = await postApi(`/apidocs/${pid}/customdtos`, body);
      const copyDto = { ...dto };
      copyDto.dtoId = data.dtoId;
      console.log(copyDto, data);
      setDto(copyDto);
    }
    const copyArr = [...attributes];
    copyArr.push({
      dtoItemId: 0,
      dtoItemName: '',
      dtoPrimitiveTypeId: 9,
      dtoPrimitiveTypeName: 'String',
      dtoIsList: false,
    });
    setAttributes(copyArr);
  }, [attributes, dto]);

  const changeAttrName = useCallback(
    (idx: number, e: any) => {
      const copyArr = [...attributes];
      copyArr[idx].dtoItemName = e.target.value.trim();
      setAttributes(copyArr);
    },
    [attributes],
  );

  const deleteAttr = useCallback(
    (idx: number, e: any) => {
      e.stopPropagation();
      const copyArr = [...attributes].filter((attr, i) => i !== idx);
      setAttributes(copyArr);
    },
    [attributes],
  );

  const openDataTypeList = useCallback(
    (idx: number, e: any) => {
      e.stopPropagation();
      e.preventDefault();

      setSelectIdx(idx);
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsDatatypeListOpen((prev) => !prev);
    },
    [attributes],
  );

  const onNameChange = useCallback(
    (e: any) => {
      const copyDto = { ...dto };
      copyDto.dtoName = e.target.value;
      setDto(copyDto);
    },
    [dto],
  );

  const addDataType = useCallback(
    async (e: any) => {
      e.preventDefault();

      attributes.forEach(async (attr: any) => {
        const attrBody = {
          dtoItemName: attr.dtoItemName,
          dtoClassType:
            attr.dtoClassTypeId < 0 || !attr.dtoClassTypeId
              ? null
              : attr.dtoClassTypeId,
          dtoPrimitiveType:
            attr.dtoPrimitiveTypeId < 0 || !attr.dtoPrimitiveTypeId
              ? null
              : attr.dtoPrimitiveTypeId,
          dtoIsList: attr.dtoIsList ? 'Y' : 'N',
        };
        if (attrBody.dtoItemName !== '') {
          await postApi(`/apidocs/${dto.dtoId}/dtoitems`, attrBody);
        }
      });

      const copyDtoArr = [...dtoRows];

      const newDto = {
        dtoId: dto.dtoId,
        dtoName: dto.dtoName,
        dtoItemResponses: [...attributes],
      };
      copyDtoArr.push(newDto);
      console.log(copyDtoArr);
      setAttributes([]);
      setDto({
        dtoId: -1,
        dtoName: '',
        dtoType: '',
        dtoItemResponses: [],
      });
      setIsDatatypeAddOpen(false);
      setDtoRows(copyDtoArr);
    },
    [attributes, dtoRows, dto],
  );

  useEffect(() => {
    const getDtoList = async () => {
      const { data }: any = await getApi(`/apidocs/${pid}/dtotype`);
      setDtoRows(data);
    };

    getDtoList();
  }, []);

  return (
    <section className="modal-empty" onClick={closeModal}>
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
                value={dto.dtoName}
                onChange={onNameChange}
                required
              />
              <div className="datatype-add-body">
                <p className="datatype-add-brace">&#123;</p>
                {attributes.map((attr, i) => {
                  return (
                    <div className="attr-div" key={i}>
                      <button
                        type="button"
                        className="attr-type-button"
                        onClick={(e) => openDataTypeList(i, e)}
                      >
                        {attr.dtoIsList
                          ? `List<${
                              attr.dtoClassTypeName || attr.dtoPrimitiveTypeName
                            }>`
                          : attr.dtoClassTypeName || attr.dtoPrimitiveTypeName}
                      </button>
                      <input
                        type="text"
                        onChange={(e) => changeAttrName(i, e)}
                        value={attr.dtoItemName}
                        className="attr-type-name"
                        required
                      />

                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="attr-type-delete"
                        onClick={(e) => deleteAttr(i, e)}
                      />
                    </div>
                  );
                })}
                <button
                  type="button"
                  className="datatype-add-btn"
                  onClick={addNewAttribute}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <p className="datatype-add-brace">&#125;</p>
              </div>
              <div className="datatype-button-wrapper">
                <button
                  className="datatype-add-form-button"
                  type="button"
                  onClick={onCancleClick}
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
          {dtoRows.length > 0 &&
            dtoRows.map((dt, i) => {
              return (
                <DatatypeRow
                  rowId={dt.dtoId}
                  dtoRows={dtoRows}
                  setDtoRows={setDtoRows}
                  rowIdx={i}
                  key={i}
                />
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
          selectIdx={selectIdx}
          isAll
          attribute={attributes}
          setAttribute={setAttributes}
        />
      )}
    </section>
  );
}
