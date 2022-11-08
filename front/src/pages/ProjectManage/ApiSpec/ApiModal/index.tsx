import { Dispatch, useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { API, CONTROLLER, QUERY, DTO } from 'types/ApiSpec';
import { getApi } from 'api';
import ApiContentLeft from './ApiContentLeft';
import ApiContentRight from './ApiContentRight';

interface Props {
  controllerIdx: number;
  apiRowIdx: number;
  setIsApiModalOpen: Dispatch<React.SetStateAction<boolean>>;
  store: any;
}

export default function ApiModal({
  controllerIdx,
  apiRowIdx,
  setIsApiModalOpen,
  store,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const objDataType: any[] = [];

  const [apiId, setApiId] = useState(0);
  const [apiName, setApiName] = useState('');
  const [apiDesc, setApiDesc] = useState('');
  const [methodName, setMethodName] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiCode, setApiCode] = useState(200);
  const [dtoResponse, setDtoResponse] = useState<DTO[]>([]);
  const [pathVarList, setPathVarList] = useState<QUERY[]>([]);
  const [queryList, setQueryList] = useState<QUERY[]>([]);

  useEffect(() => {
    const getApiInfo = async () => {
      const editRow = store.pjt.controllers[controllerIdx].responses[apiRowIdx];

      const { data }: any = await getApi(`/apidocs/apis/${editRow.id}`);
      console.log(data);

      setApiId(data.apiResponse.apiId);
      setApiName(data.apiResponse.apiName);
      setApiDesc(data.apiResponse.apiDescription);
      setMethodName(data.apiResponse.apiMethodName);
      setApiUrl(data.apiResponse.apiUrl);
      setApiMethod(data.apiResponse.apiMethod);
      setApiCode(data.apiResponse.apiCode === 'OK' ? 200 : 201);
      setDtoResponse(data.dtoResponses);

      const pvl = [];
      data.pathListResponse.forEach((path: string) => {
        const target =
          path.indexOf('{') >= 0 ? path.substring(1, path.length - 1) : path;
        let obj: any = null;
        data.pathVariableResponses.forEach((pvrs: any) => {
          if (target === pvrs.pathVariableKey) obj = { ...pvrs };
        });
        if (target !== '')
          pvl.push({
            id: obj ? obj.pathVariableId : 0,
            key: target,
            type: obj ? obj.pathVariableType : 'NORMAL',
          });
      });
      pvl.push({ id: 0, key: '', type: 'NORMAL' });
      setPathVarList(pvl);

      const qsrList = data.queryStringResponses.map((qsr: any) => {
        return {
          id: qsr.queryStringId,
          key: qsr.queryStringKey,
          type: qsr.queryStringType,
        };
      });
      qsrList.push({ id: 0, key: '', type: 'String' });
      setQueryList(qsrList);

      setIsEdit(true);
    };
    if (apiRowIdx >= 0) getApiInfo();
  }, []);

  const submitApi = useCallback(
    (e: any) => {
      e.preventDefault();
      const newApiObj = {
        responses: {
          id: 0,
          apiName,
          desc: apiDesc,
          methodName,
          url: apiUrl,
          method: apiMethod,
          code: apiCode,
        },
      };

      store.pjt.controller[controllerIdx].responses.push(newApiObj);

      setIsApiModalOpen(false);
    },
    [isEdit, apiName, apiDesc, methodName, apiUrl, apiMethod, apiCode],
  );

  const onDeleteClick = useCallback(() => {
    // const copyArr = [...[...apis]];
    // const deletedArr = [...copyArr[controllerIdx]].filter(
    //   (e, i) => i !== apiRowIdx,
    // );
    // copyArr[controllerIdx] = deletedArr;
    // setApis(copyArr);
    setIsApiModalOpen(false);
  }, [apiRowIdx]);

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
            store={store}
            controllerIdx={controllerIdx}
            apiName={apiName}
            setApiName={setApiName}
            apiDesc={apiDesc}
            setApiDesc={setApiDesc}
            methodName={methodName}
            setMethodName={setMethodName}
            apiUrl={apiUrl}
            setApiUrl={setApiUrl}
            apiMethod={apiMethod}
            setApiMethod={setApiMethod}
            apiCode={apiCode}
            setApiCode={setApiCode}
            pathVarList={pathVarList}
            setPathVarList={setPathVarList}
            queryList={queryList}
            setQueryList={setQueryList}
          />
          <ApiContentRight
            store={store}
            objDataType={objDataType}
            dtoResponse={dtoResponse}
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
