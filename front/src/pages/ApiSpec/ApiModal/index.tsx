import { Dispatch, useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { API, CONTROLLER, PATHVARIABLES, QUERY } from 'types/ApiSpec';
import ApiContentLeft from './ApiContentLeft';
import ApiContentRight from './ApiContentRight';

interface Props {
  controllers: Array<CONTROLLER>;
  controllerIdx: number;
  apiRowIdx: number;
  setIsApiModalOpen: Dispatch<React.SetStateAction<boolean>>;
  dataType: string[];
  objDataType: any[];
  apis: API[][];
  setApis: React.Dispatch<React.SetStateAction<API[][]>>;
}

export default function ApiModal({
  controllers,
  controllerIdx,
  apiRowIdx,
  setIsApiModalOpen,
  dataType,
  objDataType,
  apis,
  setApis,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [apiName, setApiName] = useState('');
  const [apiDesc, setApiDesc] = useState('');
  const [methodName, setMethodName] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [apiMethod, setApiMethod] = useState('');
  const [apiCode, setApiCode] = useState(200);
  const [reqVarName, setReqVarName] = useState('');
  const [resVarName, setResVarName] = useState('');

  const [pathList, setPathList] = useState<Array<PATHVARIABLES>>([{ key: '' }]);
  const [pathVarList, setPathVarList] = useState<Array<PATHVARIABLES>>([
    { key: '' },
  ]);
  const [queryList, setQueryList] = useState<Array<QUERY>>([
    { key: '', type: '' },
  ]);

  const submitApi = useCallback(
    (e: any) => {
      e.preventDefault();
      const newApiObj = {
        id: apis.length,
        apiName,
        desc: apiDesc,
        methodName,
        url: `${controllers[controllerIdx].baseurl}${apiUrl}`,
        method: apiMethod,
        code: apiCode,
        reqVarName,
        resVarName,
        pathList,
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
      pathList,
      pathVarList,
      queryList,
    ],
  );

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
      setPathList(editRow.pathList);
      setPathVarList(editRow.pathVarList);
      setQueryList(editRow.queryList);
    }
    setIsEdit(isEditIdx);
  }, []);

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
            controllers={controllers}
            controllerIdx={controllerIdx}
            pathList={pathList}
            setPathList={setPathList}
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
          />
          <ApiContentRight
            dataType={dataType}
            objDataType={objDataType}
            resVarName={resVarName}
            reqVarName={reqVarName}
            setResVarName={setResVarName}
            setReqVarName={setReqVarName}
          />
        </article>

        <article className="closebtn-container">
          <button type="submit" className="api-add-button">
            등록
          </button>
        </article>
      </form>
    </section>
  );
}
