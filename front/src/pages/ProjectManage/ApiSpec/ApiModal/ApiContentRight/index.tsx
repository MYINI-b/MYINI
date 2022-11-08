import { useState, useCallback, Dispatch } from 'react';
import DataTypeList from 'components/DataTypeList';
import './style.scss';
import { MOUSEPOS, ATTRIBUTE } from 'types/ApiSpec';
import Tooltip from 'components/Tooltip';

interface Props {
  objDataType: any[];
  store: any;
}

export default function ApiContentRight({ objDataType, store }: Props) {
  const [isReq, setIsReq] = useState(false);
  const [isDatatypeListOpen, setIsDatatypeListOpen] = useState(false);
  const [mousePos, setMousePos] = useState<MOUSEPOS>({ x: 0, y: 0 });
  const [reqObjAttribute, setReqObjAttribute] = useState<Array<ATTRIBUTE>>([
    {
      name: 'string',
      type: 'string',
      isList: false,
    },
  ]);
  const [resObjAttribute, setResObjAttribute] = useState<Array<ATTRIBUTE>>([
    {
      name: 'string',
      type: 'string',
      isList: false,
    },
  ]);

  const openDataTypeList = useCallback((e: any, isReq: boolean) => {
    e.stopPropagation();
    e.preventDefault();

    setIsReq(isReq);
    setMousePos({ x: e.clientX, y: e.clientY });
    setIsDatatypeListOpen((prev) => !prev);
  }, []);

  const onReqVarNameChange = useCallback((e: any) => {}, []);

  const onResVarNameChange = useCallback((e: any) => {}, []);

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
                  {reqObjAttribute[0].isList
                    ? `List<${reqObjAttribute[0].type}>`
                    : reqObjAttribute[0].type}
                </div>
              </div>
              <input
                type="text"
                className="content-right-boxcontent-input"
                placeholder="변수명을 입력해주세요"
                value=""
                onChange={onReqVarNameChange}
              />
            </div>
            <div className="content-right-detail-boxcontent">
              {reqObjAttribute[0].attr && reqObjAttribute[0].attr.length > 0 && (
                <>
                  {reqObjAttribute[0].isList && (
                    <p className="datatype-add-brace">&#91;</p>
                  )}
                  <p
                    className={`datatype-add-brace ${
                      reqObjAttribute[0].isList && 'second'
                    }`}
                  >
                    &#123;
                  </p>
                  {reqObjAttribute[0].attr.map((atr, i) => {
                    return (
                      <div
                        className={`attr-div ${
                          reqObjAttribute[0].isList && 'second'
                        }`}
                        key={i}
                      >
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
                  <p
                    className={`datatype-add-brace ${
                      reqObjAttribute[0].isList && 'second'
                    }`}
                  >
                    &#123;
                  </p>
                  {reqObjAttribute[0].isList && (
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
              {/* <div className={`many-radio-button ${!resMany && 'select'}`} /> */}
              <p className="many-radio-text">단건</p>
            </div>
            <div className="many-radio-wrapper" onClick={() => {}}>
              {/* <div className={`many-radio-button ${resMany && 'select'}`} /> */}
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
                  {resObjAttribute[0].isList
                    ? `List<${resObjAttribute[0].type}>`
                    : resObjAttribute[0].type}
                </div>
              </div>
              <input
                type="text"
                className="content-right-boxcontent-input"
                placeholder="변수명을 입력해주세요"
                value=""
                onChange={onResVarNameChange}
              />
            </div>
            <div className="content-right-detail-boxcontent">
              {resObjAttribute[0].attr && resObjAttribute[0].attr.length > 0 && (
                <>
                  {resObjAttribute[0].isList && (
                    <p className="datatype-add-brace">&#91;</p>
                  )}
                  <p
                    className={`datatype-add-brace ${
                      resObjAttribute[0].isList && 'second'
                    }`}
                  >
                    &#123;
                  </p>
                  {resObjAttribute[0].attr.map((atr, i) => {
                    return (
                      <div
                        className={`attr-div ${
                          resObjAttribute[0].isList && 'second'
                        }`}
                        key={i}
                      >
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
                  <p
                    className={`datatype-add-brace ${
                      resObjAttribute[0].isList && 'second'
                    }`}
                  >
                    &#123;
                  </p>
                  {resObjAttribute[0].isList && (
                    <p className="datatype-add-brace"> &#93;</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {isDatatypeListOpen && (
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
      )}
    </div>
  );
}
