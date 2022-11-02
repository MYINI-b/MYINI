import { Dispatch, useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { API, CONTROLLER, QUERY } from 'types/ApiSpec';
import ApiContentLeft from './ApiContentLeft';
import ApiContentRight from './ApiContentRight';

interface Props {
  controllers: Array<CONTROLLER>;
  controllerIdx: number;
  apiRowIdx: number;
  setIsApiModalOpen: Dispatch<React.SetStateAction<boolean>>;
  objDataType: any[];
  apis: API[][];
  setApis: React.Dispatch<React.SetStateAction<API[][]>>;
}

export default function ApiModal({
  controllers,
  controllerIdx,
  apiRowIdx,
  setIsApiModalOpen,
  objDataType,
  apis,
  setApis,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);

  const [apiName, setApiName] = useState('');
  const [apiDesc, setApiDesc] = useState('');
  const [methodName, setMethodName] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiCode, setApiCode] = useState(200);
  const [reqVarName, setReqVarName] = useState('');
  const [resVarName, setResVarName] = useState('');

  const [pathVarList, setPathVarList] = useState<Array<QUERY>>([
    { key: '', type: 'PATH' },
  ]);
  const [queryList, setQueryList] = useState<Array<QUERY>>([
    { key: '', type: 'STRING' },
  ]);

  useEffect(() => {
    const isEditIdx = apiRowIdx >= 0;
    if (isEditIdx) {
      const editRow = { ...apis[controllerIdx][apiRowIdx] };
      setApiName(editRow.apiName);
      setApiDesc(editRow.desc);
      setMethodName(editRow.methodName);
      setApiUrl(editRow.url);
      setApiMethod(editRow.method);
      setApiCode(editRow.code);
      setReqVarName(editRow.reqVarName);
      setResVarName(editRow.resVarName);
      setPathVarList(editRow.pathVarList);
      setQueryList(editRow.queryList);
    }
    setIsEdit(isEditIdx);
  }, []);

  const submitApi = useCallback(
    (e: any) => {
      e.preventDefault();
      const newApiObj = {
        id: apis.length,
        apiName,
        desc: apiDesc,
        methodName,
        url: apiUrl,
        method: apiMethod,
        code: apiCode,
        reqVarName,
        resVarName,
        pathVarList,
        queryList,
      };
      const copyArr = [...[...apis]];

      if (isEdit) {
        copyArr[controllerIdx][apiRowIdx] = newApiObj;
      } else {
        copyArr[controllerIdx].push(newApiObj);
      }

      setApis(copyArr);
      setIsApiModalOpen(false);
    },
    [
      isEdit,
      apis,
      apiName,
      apiDesc,
      methodName,
      apiUrl,
      apiMethod,
      apiCode,
      reqVarName,
      resVarName,
      pathVarList,
      queryList,
    ],
  );

  const onDeleteClick = useCallback(() => {
    const copyArr = [...[...apis]];
    const deletedArr = [...copyArr[controllerIdx]].filter(
      (e, i) => i !== apiRowIdx,
    );
    copyArr[controllerIdx] = deletedArr;
    setApis(copyArr);
    setIsApiModalOpen(false);
  }, [apis, apiRowIdx]);

  return (
    <section className="modal-empty" onClick={() => setIsApiModalOpen(false)}>
      <form
        className="api-add-modal-content"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitApi}
      >
        <article className="closebtn-container">
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => setIsApiModalOpen(false)}
          />
        </article>

        <article className="api-add-content-container">
          <ApiContentLeft
            queryList={queryList}
            setQueryList={setQueryList}
            pathVarList={pathVarList}
            setPathVarList={setPathVarList}
            apiName={apiName}
            setApiName={setApiName}
            apiDesc={apiDesc}
            setApiDesc={setApiDesc}
            methodName={methodName}
            setMethodName={setMethodName}
            apiMethod={apiMethod}
            setApiMethod={setApiMethod}
            apiCode={apiCode}
            setApiCode={setApiCode}
            apiUrl={apiUrl}
            setApiUrl={setApiUrl}
            apiBaseUrl={`/${controllers[controllerIdx].baseurl}`}
          />
          <ApiContentRight
            apiMethod={apiMethod}
            objDataType={objDataType}
            resVarName={resVarName}
            reqVarName={reqVarName}
            setResVarName={setResVarName}
            setReqVarName={setReqVarName}
          />
        </article>

        <article className="closebtn-container">
          <button type="submit" className="api-add-button">
            {isEdit ? '수정' : '등록'}
          </button>
          {isEdit && (
            <button
              type="button"
              className="api-add-button"
              onClick={onDeleteClick}
            >
              삭제
            </button>
          )}
        </article>
      </form>
    </section>
  );
}
