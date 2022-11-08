import { Dispatch, useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { API, CONTROLLER, QUERY, DTO } from 'types/ApiSpec';
import { deleteApi, getApi, postApi, putApi } from 'api';
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
  const [deletedPath, setDeletedPath] = useState<QUERY[]>([]);
  const [deletedQuery, setDeletedQuery] = useState<QUERY[]>([]);

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
            id: obj ? obj.pathVariableId : -1,
            key: target,
            type: obj ? obj.pathVariableType : 'NORMAL',
          });
      });
      pvl.push({ id: -1, key: '', type: 'NORMAL' });
      setPathVarList(pvl);

      const qsrList = data.queryStringResponses.map((qsr: any) => {
        return {
          id: qsr.queryStringId,
          key: qsr.queryStringKey,
          type: qsr.queryStringType,
        };
      });
      qsrList.push({ id: -1, key: '', type: 'String' });
      setQueryList(qsrList);

      setIsEdit(true);
    };

    if (apiRowIdx >= 0) getApiInfo();
    else {
      setPathVarList([{ id: -1, key: '', type: 'NORMAL' }]);
      setQueryList([{ id: -1, key: '', type: 'String' }]);
    }
  }, []);

  const submitApi = useCallback(
    async (e: any) => {
      e.preventDefault();
      const newApiObj: any = {
        apiName,
        apiDescription: apiDesc,
        apiMethodName: methodName,
        apiUrl,
        apiMethod,
        apiCode: apiCode === 200 ? 'OK' : 'CREATED',
      };

      if (isEdit) {
        await putApi(`/apidocs/apis/${apiId}`, newApiObj);

        pathVarList.forEach(async (path) => {
          const body = {
            pathVariableKey: path.key,
            pathVariableType: path.type,
          };
          if (path.key !== '') {
            console.log(path);
            if (path.id < 0) {
              // 새로 생성된 것
              await postApi(`/apidocs/${apiId}/pathvariables`, body);
            } else {
              await putApi(`/apidocs/pathvariables/${path.id}`, body);
            }
          }
        });

        queryList.forEach(async (query) => {
          const body = {
            queryStringKey: query.key,
            queryStringType: query.type,
          };
          if (query.key !== '') {
            if (query.id < 0) {
              // 새로 생성된 것
              await postApi(`/apidocs/${apiId}/querystrings`, body);
            } else {
              await putApi(`/apidocs/querystrings/${query.id}`, body);
            }
          }
        });

        store.pjt.controllers[controllerIdx].responses[apiRowIdx].apiName =
          newApiObj.apiName;
        store.pjt.controllers[controllerIdx].responses[apiRowIdx].methodName =
          newApiObj.apiMethodName;
        store.pjt.controllers[controllerIdx].responses[apiRowIdx].url =
          newApiObj.apiUrl;
        store.pjt.controllers[controllerIdx].responses[apiRowIdx].method =
          newApiObj.apiMethod;
        store.pjt.controllers[controllerIdx].responses[apiRowIdx].code =
          newApiObj.apiCode === 'OK' ? 200 : 201;
        store.pjt.controllers[controllerIdx].responses[apiRowIdx].desc =
          newApiObj.apiDescription;
      } else {
        const { data }: any = await postApi(
          `/apidocs/${store.pjt.controllers[controllerIdx].id}/apis`,
          newApiObj,
        );

        newApiObj.apiId = data.apiId;
        console.log(newApiObj);
        pathVarList.forEach(async (path) => {
          const body = {
            pathVariableKey: path.key,
            pathVariableType: path.type,
          };
          if (path.key !== '')
            await postApi(`/apidocs/${data.apiId}/pathvariables`, body);
        });

        queryList.forEach(async (query) => {
          const body = {
            queryStringKey: query.key,
            queryStringType: query.type,
          };
          if (query.key !== '')
            await postApi(`/apidocs/${data.apiId}/querystrings`, body);
        });

        const parsedObj = {
          id: newApiObj.apiId,
          apiName: newApiObj.apiName,
          methodName: newApiObj.apiMethodName,
          url: newApiObj.apiUrl,
          method: newApiObj.apiMethod,
          code: newApiObj.apiCode,
          desc: newApiObj.apiDescription,
        };
        store.pjt.controllers[controllerIdx].responses.push(parsedObj);
      }

      deletedPath.forEach(async (path) => {
        await deleteApi(`/apidocs/pathvariables/${path.id}`);
      });
      deletedQuery.forEach(async (path) => {
        await deleteApi(`/apidocs/querystrings/${path.id}`);
      });

      setIsApiModalOpen(false);
    },
    [
      isEdit,
      apiName,
      apiDesc,
      methodName,
      apiUrl,
      apiMethod,
      apiCode,
      deletedPath,
      deletedQuery,
    ],
  );

  const onDeleteClick = useCallback(async () => {
    await deleteApi(`/apidocs/apis/${apiId}`);
    store.pjt.controllers[controllerIdx].responses.splice(apiRowIdx, 1);
    setIsApiModalOpen(false);
  }, [apiRowIdx, apiId]);

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
            deletedPath={deletedPath}
            setDeletedPath={setDeletedPath}
            deletedQuery={deletedQuery}
            setDeletedQuery={setDeletedQuery}
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
