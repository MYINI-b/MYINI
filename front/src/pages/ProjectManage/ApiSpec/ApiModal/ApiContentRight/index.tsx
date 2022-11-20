import { useState, useCallback, Dispatch, useEffect } from 'react';
import './style.scss';
import { MOUSEPOS, ATTRIBUTE, DTO, DTO_RESPONSE } from 'types/ApiSpec';
import Tooltip from 'components/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddDataTypeList from 'components/AddDataTypeList';

interface Props {
  dtoResponse: DTO[];
  setDtoResponse: Dispatch<React.SetStateAction<DTO[]>>;
  reqItems: DTO_RESPONSE[];
  resItems: DTO_RESPONSE[];
  setReqItems: Dispatch<React.SetStateAction<DTO_RESPONSE[]>>;
  setResItems: Dispatch<React.SetStateAction<DTO_RESPONSE[]>>;
  deletedDtoItems: number[];
  setDeletedDtoItems: Dispatch<React.SetStateAction<number[]>>;
}

export default function ApiContentRight({
  dtoResponse,
  setDtoResponse,
  reqItems,
  setReqItems,
  resItems,
  setResItems,
  deletedDtoItems,
  setDeletedDtoItems,
}: Props) {
  const [isReq, setIsReq] = useState(false);
  const [isDatatypeListOpen, setIsDatatypeListOpen] = useState(false);
  const [mousePos, setMousePos] = useState<MOUSEPOS>({ x: 0, y: 0 });
  const [request, setRequest] = useState<DTO>({
    dtoId: 0,
    dtoIsList: false,
    dtoItemResponses: [],
    dtoName: '',
    dtoType: '',
  });

  const [response, setResponse] = useState<DTO>({
    dtoId: 0,
    dtoIsList: false,
    dtoItemResponses: [],
    dtoName: '',
    dtoType: '',
  });

  const openDataTypeList = useCallback((e: any, isReq: boolean) => {
    e.stopPropagation();
    e.preventDefault();

    setIsReq(isReq);
    setMousePos({ x: e.clientX, y: e.clientY });
    setIsDatatypeListOpen((prev) => !prev);
  }, []);

  const onManyClick = useCallback(
    (isReq: boolean) => {
      const copyObj = isReq ? { ...request } : { ...response };
      const copyDtoResponse = [...dtoResponse];
      copyObj.dtoIsList = !copyObj.dtoIsList;

      if (isReq) {
        setRequest(copyObj);
        copyDtoResponse[0] = { ...copyObj };
      } else {
        setResponse(copyObj);
        copyDtoResponse[1] = { ...copyObj };
      }

      setDtoResponse(copyDtoResponse);
    },
    [response, request, dtoResponse],
  );

  const deleteDtoItem = useCallback(
    (idx: number, isReq: boolean) => {
      const copyArr = isReq ? [...reqItems] : [...resItems];
      const copyDeleted = [...deletedDtoItems];
      copyDeleted.push(copyArr[idx].dtoItemId);
      copyArr.splice(idx, 1);
      if (isReq) setReqItems(copyArr);
      else setResItems(copyArr);
      setDeletedDtoItems(copyDeleted);
    },
    [reqItems, resItems, deletedDtoItems],
  );

  const onDtoItemNameChange = useCallback(
    (e: any, idx: number, isReq: boolean) => {
      const copyArr = isReq ? [...reqItems] : [...resItems];
      const copyDto = { ...copyArr[idx] };
      copyDto.dtoItemName = e.target.value.trim();
      copyArr[idx] = copyDto;
      if (isReq) setReqItems(copyArr);
      else setResItems(copyArr);
    },
    [reqItems, resItems],
  );

  useEffect(() => {
    dtoResponse.forEach((dtoItem: any) => {
      if (dtoItem.dtoType === 'RESPONSE') {
        setResponse(dtoItem);
      } else {
        setRequest(dtoItem);
      }
    });
  }, [dtoResponse]);

  return (
    <div className="api-add-content-right">
      <section className="content-section">
        <Tooltip text="변수명은 Camel Case로 작성해주세요." under>
          <h1 className="content-right-title">REQUEST BODY</h1>
        </Tooltip>

        <div className="content-right-box">
          <div className="content-right-boxcontent-wrapper">
            <div className="content-right-between">
              <h3 className="content-right-boxtitle">
                자료형 &nbsp;
                <div
                  className="datatype-block"
                  onClick={(e) => openDataTypeList(e, true)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </h3>

              <div className="content-right-many-wrapper">
                단건 &nbsp;
                <div
                  className={`many-checkbox-wrapper  ${
                    request.dtoIsList && 'list'
                  }`}
                  onClick={() => onManyClick(true)}
                >
                  <span
                    className={`many-checker ${request.dtoIsList && 'list'}`}
                  />
                </div>
                &nbsp; 다건
              </div>
            </div>
            <div className="content-right-detail-boxcontent">
              {reqItems.length > 0 && (
                <>
                  {request.dtoIsList && (
                    <p className="datatype-add-brace">&#91;</p>
                  )}
                  <p
                    className={`datatype-add-brace ${
                      request.dtoIsList && 'second'
                    }`}
                  >
                    &#123;
                  </p>
                  {reqItems.map((req: any, i: number) => {
                    return (
                      <div
                        className={`attr-div ${request.dtoIsList && 'second'}`}
                        key={i}
                      >
                        <button
                          type="button"
                          className="attr-type-button"
                          onClick={() => deleteDtoItem(i, true)}
                        >
                          {req.dtoIsList
                            ? `List<${
                                req.dtoClassTypeName || req.dtoPrimitiveTypeName
                              }>`
                            : req.dtoClassTypeName || req.dtoPrimitiveTypeName}
                        </button>
                        <input
                          type="text"
                          value={req.dtoItemName}
                          className="attr-type-name"
                          onChange={(e) => onDtoItemNameChange(e, i, true)}
                          required
                        />
                      </div>
                    );
                  })}
                  <p
                    className={`datatype-add-brace ${
                      request.dtoIsList && 'second'
                    }`}
                  >
                    &#123;
                  </p>
                  {request.dtoIsList && (
                    <p className="datatype-add-brace"> &#93;</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h1 className="content-right-title">RESPONSE BODY</h1>
        <div className="content-right-box">
          <div className="content-right-between">
            <h3 className="content-right-boxtitle">
              자료형 &nbsp;
              <div
                className="datatype-block"
                onClick={(e) => openDataTypeList(e, false)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </h3>

            <div className="content-right-many-wrapper">
              단건 &nbsp;
              <div
                className={`many-checkbox-wrapper  ${
                  response.dtoIsList && 'list'
                }`}
                onClick={() => onManyClick(false)}
              >
                <span
                  className={`many-checker ${response.dtoIsList && 'list'}`}
                />
              </div>
              &nbsp; 다건
            </div>
          </div>

          <div className="content-right-boxcontent-wrapper">
            <div className="content-right-detail-boxcontent">
              {resItems.length > 0 && (
                <>
                  {response.dtoIsList && (
                    <p className="datatype-add-brace">&#91;</p>
                  )}
                  <p
                    className={`datatype-add-brace ${
                      response.dtoIsList && 'second'
                    }`}
                  >
                    &#123;
                  </p>
                  {resItems.map((res: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className={`attr-div ${response.dtoIsList && 'second'}`}
                      >
                        <button
                          type="button"
                          className="attr-type-button"
                          onClick={() => deleteDtoItem(i, false)}
                        >
                          {res.dtoIsList
                            ? `List<${
                                res.dtoPrimitiveTypeName || res.dtoClassTypeName
                              }>`
                            : res.dtoPrimitiveTypeName || res.dtoClassTypeName}
                        </button>
                        <input
                          type="text"
                          value={res.dtoItemName}
                          className="attr-type-name"
                          onChange={(e) => onDtoItemNameChange(e, i, false)}
                          required
                        />
                      </div>
                    );
                  })}
                  <p
                    className={`datatype-add-brace ${
                      response.dtoIsList && 'second'
                    }`}
                  >
                    &#123;
                  </p>
                  {response.dtoIsList && (
                    <p className="datatype-add-brace"> &#93;</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {isDatatypeListOpen && (
        <AddDataTypeList
          setIsDatatypeListOpen={setIsDatatypeListOpen}
          mousePos={mousePos}
          selectIdx={0}
          attribute={isReq ? reqItems : resItems}
          setAttribute={isReq ? setReqItems : setResItems}
        />
      )}
    </div>
  );
}
