import { useState, useCallback, Dispatch, useEffect } from 'react';
import DataTypeList from 'components/DataTypeList';
import './style.scss';
import { MOUSEPOS, ATTRIBUTE, DTO } from 'types/ApiSpec';
import Tooltip from 'components/Tooltip';

interface Props {
  objDataType: any[];
  store: any;
  dtoResponse: DTO[];
}

export default function ApiContentRight({
  objDataType,
  store,
  dtoResponse,
}: Props) {
  const [isReq, setIsReq] = useState(false);
  const [isDatatypeListOpen, setIsDatatypeListOpen] = useState(false);
  const [mousePos, setMousePos] = useState<MOUSEPOS>({ x: 0, y: 0 });
  const [request, setRequest] = useState<any>({
    dtoId: 0,
    dtoIsList: false,
    dtoItemResponses: [],
    dtoName: '',
    dtoType: '',
  });
  const [response, setResponse] = useState<any>({
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

  const onReqVarNameChange = useCallback(
    (e: any) => {
      const copyRequest = { ...request };
      copyRequest.dtoName = e.target.value;
    },
    [request],
  );

  const onResVarNameChange = useCallback(
    (e: any) => {
      const copyResponse = { ...response };
      copyResponse.dtoName = e.target.value;
    },
    [response],
  );

  useEffect(() => {
    dtoResponse.forEach((dto: any) => {
      if (dto.dtoType === 'RESPONSE') setResponse(dto);
      else setRequest(dto);
      console.log(dto);
    });
  }, [dtoResponse]);

  return (
    <div className="api-add-content-right">
      <section className="content-section">
        <Tooltip text="변수명은 Camel Case로 작성해주세요.">
          <h1 className="content-right-title">REQUEST BODY</h1>
        </Tooltip>

        <div className="content-right-box">
          <div className="content-right-boxtitle-wrapper">
            <h3 className="content-right-boxtitle static">자료형</h3>
            <h3 className="content-right-boxtitle">변수명</h3>
          </div>
          <div className="content-right-boxcontent-wrapper">
            <div className="content-right-normal-boxcontent">
              <div className="datatype-wrapper">
                <div
                  className="datatype-block"
                  onClick={(e) => openDataTypeList(e, true)}
                >
                  {request.dtoIsList
                    ? `List<${request.dtoName}>`
                    : request.dtoName}
                </div>
              </div>
              {/* <input
                type="text"
                className="content-right-boxcontent-input"
                placeholder="변수명을 입력해주세요"
                value={request.dtoName}
                onChange={onReqVarNameChange}
              /> */}
            </div>
            <div className="content-right-detail-boxcontent">
              {request.dtoItemResponses.length > 0 && (
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
                  {request.dtoItemResponses.map((req: any, i: number) => {
                    return (
                      <div
                        className={`attr-div ${req.dtoIsList && 'second'}`}
                        key={i}
                      >
                        <button type="button" className="attr-type-button">
                          {req.dtoIsList
                            ? `List<${
                                req.dtoClassTypeName || req.dtoPrimitiveTypeName
                              }>`
                            : req.dtoClassTypeName || req.dtoPrimitiveTypeName}
                        </button>
                        {/* <input
                          type="text"
                          value={req.dtoItemName}
                          className="attr-type-name"
                          readOnly
                        /> */}
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
          <div className="content-right-many-wrapper">
            <div className="many-radio-wrapper" onClick={() => {}}>
              <div
                className={`many-radio-button ${
                  !response.dtoIsList && 'select'
                }`}
              />
              <p className="many-radio-text">단건</p>
            </div>
            <div className="many-radio-wrapper" onClick={() => {}}>
              <div
                className={`many-radio-button ${
                  response.dtoIsList && 'select'
                }`}
              />
              <p className="many-radio-text">다건</p>
            </div>
          </div>
          <div className="content-right-boxtitle-wrapper">
            <h3 className="content-right-boxtitle static">자료형</h3>
            <h3 className="content-right-boxtitle">변수명</h3>
          </div>
          <div className="content-right-boxcontent-wrapper">
            <div className="content-right-normal-boxcontent">
              <div className="datatype-wrapper">
                <div
                  className="datatype-block"
                  onClick={(e) => openDataTypeList(e, false)}
                >
                  {response.dtoIsList
                    ? `List<${response.dtoName}>`
                    : response.dtoName}
                </div>
              </div>
              {/* <input
                type="text"
                className="content-right-boxcontent-input"
                placeholder="변수명을 입력해주세요"
                value={response.dtoName}
                onChange={onResVarNameChange}
              /> */}
            </div>
            <div className="content-right-detail-boxcontent">
              {response.dtoItemResponses.length > 0 && (
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
                  {response.dtoItemResponses.map((res: any, i: number) => {
                    return (
                      <div
                        className={`attr-div ${res.dtoIsList && 'second'}`}
                        key={i}
                      >
                        <button type="button" className="attr-type-button">
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
                          readOnly
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

      {/* {isDatatypeListOpen && (
        <DataTypeList
          setIsDatatypeListOpen={setIsDatatypeListOpen}
          mousePos={mousePos}
          objDataType={objDataType}
          selectInfo={
            isReq
              ? { ...reqObjAttribute[0], idx: 0 }
              : { ...resObjAttribute[0], idx: 0 }
          }
          newObjAttribute={isReq ? reqObjAttribute : resObjAttribute}
          setNewObjAttribute={isReq ? setReqObjAttribute : setResObjAttribute}
        />
      )} */}
    </div>
  );
}
