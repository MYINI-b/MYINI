import { Dispatch, useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { QUERY, DTO, DTO_RESPONSE } from 'types/ApiSpec';
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
  const [deletedDtoItems, setDeletedDtoItems] = useState<number[]>([]);
  const [reqItems, setReqItems] = useState<DTO_RESPONSE[]>([]);
  const [resItems, setResItems] = useState<DTO_RESPONSE[]>([]);

  useEffect(() => {
    const getApiInfo = async () => {
      const editRow = store.pjt.controllers[controllerIdx].responses[apiRowIdx];

      const { data }: any = await getApi(`/apidocs/apis/${editRow.id}`);

      setApiId(data.apiResponse.apiId);
      setApiName(data.apiResponse.apiName);
      setApiDesc(data.apiResponse.apiDescription);
      setMethodName(data.apiResponse.apiMethodName);
      setApiUrl(data.apiResponse.apiUrl);
      setApiMethod(data.apiResponse.apiMethod);
      setApiCode(data.apiResponse.apiCode === 'OK' ? 200 : 201);
      const dtoresponses = data.dtoResponses.map((res: any) => {
        return {
          ...res,
          dtoIsList: res.dtoIsList === 'Y',
        };
      });

      if (
        dtoresponses.find((element: any) => {
          return element.dtoType === 'REQUEST';
        }) === undefined
      )
        dtoresponses.splice(0, 0, {
          dtoId: -1,
          dtoName: '',
          dtoType: 'REQUEST',
          dtoItemResponses: [],
          dtoIsList: false,
        });
      if (
        dtoresponses.find((element: any) => {
          return element.dtoType === 'RESPONSE';
        }) === undefined
      )
        dtoresponses.push({
          dtoId: -1,
          dtoName: '',
          dtoType: 'RESPONSE',
          dtoItemResponses: [],
          dtoIsList: false,
        });

      setDtoResponse(dtoresponses);

      dtoresponses.forEach((dtoItem: any) => {
        if (dtoItem.dtoType === 'RESPONSE') {
          setResItems(
            dtoItem.dtoItemResponses.map((item: any) => {
              return {
                ...item,
                dtoIsList: item.dtoIsList === 'Y',
              };
            }),
          );
        } else {
          setReqItems(
            dtoItem.dtoItemResponses.map((item: any) => {
              return {
                ...item,
                dtoIsList: item.dtoIsList === 'Y',
              };
            }),
          );
        }
      });

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
      setDtoResponse([
        {
          dtoId: -1,
          dtoName: '',
          dtoType: 'REQUEST',
          dtoItemResponses: [],
          dtoIsList: false,
        },
        {
          dtoId: -1,
          dtoName: '',
          dtoType: 'RESPONSE',
          dtoItemResponses: [],
          dtoIsList: false,
        },
      ]);
    }
  }, []);

  const closeModal = useCallback(() => {
    if (apiRowIdx >= 0) {
      const findIdx = store.pjt.editors.findIndex(
        (x: any) =>
          x.space === 'API' &&
          x.sid ===
            store.pjt.controllers[controllerIdx].responses[apiRowIdx].id,
      );

      store.pjt.editors.splice(findIdx, 1);
    } else {
      // 새로 생성하는 api면
      const findIdx = store.pjt.editors.findIndex(
        (x: any) =>
          x.space === 'API' && x.name === `controller${controllerIdx}`,
      );

      store.pjt.editors.splice(findIdx, 1);
    }
    setIsApiModalOpen(false);
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
        pathVarList.forEach(async (path) => {
          const body = {
            pathVariableKey: path.key,
            pathVariableType: path.type,
          };
          if (path.key !== '') {
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

        const updatedRequest: any[] = [];
        dtoResponse.forEach((dtoObj: any, j: number) => {
          const updateArr = dtoObj.dtoType === 'REQUEST' ? reqItems : resItems;
          updatedRequest.push({
            dtoId: dtoObj.dtoId,
            updateDtoRequest: {
              dtoName: dtoObj.dtoName,
              dtoType: dtoObj.dtoType,
              dtoIsList:
                dtoObj.dtoIsList && dtoObj.dtoItemResponses.length !== 0
                  ? 'Y'
                  : 'N',
            },
            createDtoItemRequests: updateArr
              .filter((item: any) => item.dtoItemId === -1)
              .map((item) => {
                return {
                  dtoItemName: item.dtoItemName,
                  dtoClassType: item.dtoClassTypeId
                    ? item.dtoClassTypeId
                    : null,
                  dtoPrimitiveType: item.dtoPrimitiveTypeId
                    ? item.dtoPrimitiveTypeId
                    : null,
                  dtoIsList: item.dtoIsList ? 'Y' : 'N',
                };
              }),
            updateApiDtoItemRequests: updateArr
              .filter((item: any) => item.dtoItemId !== -1)
              .map((item: any) => {
                return {
                  dtoItemId: item.dtoItemId,
                  updateDtoItemRequest: {
                    ...item,
                    dtoClassType: item.dtoClassTypeId
                      ? item.dtoClassTypeId
                      : null,
                    dtoPrimitiveType: item.dtoPrimitiveTypeId
                      ? item.dtoPrimitiveTypeId
                      : null,
                    dtoIsList: item.dtoIsList ? 'Y' : 'N',
                  },
                };
              }),
            deleteDtoItemRequests:
              j === 0
                ? deletedDtoItems.map((dId: number) => {
                    return { dtoItemId: dId };
                  })
                : [],
          });
        });

        newApiObj.updateApiDtoRequest = updatedRequest;
        await putApi(`/apidocs/apis/${apiId}`, newApiObj);

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
        // api 생성
        const { data }: any = await postApi(
          `/apidocs/${store.pjt.controllers[controllerIdx].id}/apis`,
          newApiObj,
        );

        newApiObj.apiId = data.apiId;
        // pathvar 생성
        pathVarList.forEach(async (path) => {
          const body = {
            pathVariableKey: path.key,
            pathVariableType: path.type,
          };
          if (path.key !== '')
            await postApi(`/apidocs/${data.apiId}/pathvariables`, body);
        });

        // querylist 생성
        queryList.forEach(async (query) => {
          const body = {
            queryStringKey: query.key,
            queryStringType: query.type,
          };
          if (query.key !== '')
            await postApi(`/apidocs/${data.apiId}/querystrings`, body);
        });

        createNewDto(data.apiId);

        const parsedObj = {
          id: newApiObj.apiId,
          apiName: newApiObj.apiName,
          methodName: newApiObj.apiMethodName,
          url: newApiObj.apiUrl,
          method: newApiObj.apiMethod,
          code: newApiObj.apiCode === 'OK' ? 200 : 201,
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

      closeModal();
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
      deletedDtoItems,
      resItems,
      reqItems,
      dtoResponse,
      pathVarList,
      queryList,
    ],
  );

  const onDeleteClick = useCallback(async () => {
    const findIdx = store.pjt.editors.findIndex(
      (x: any) =>
        x.space === 'API' &&
        x.sid === store.pjt.controllers[controllerIdx].responses[apiRowIdx].id,
    );
    store.pjt.editors.splice(findIdx, 1);

    await deleteApi(`/apidocs/apis/${apiId}`);
    store.pjt.controllers[controllerIdx].responses.splice(apiRowIdx, 1);
    setIsApiModalOpen(false);
  }, [apiRowIdx, apiId]);

  const onDuplicateClick = useCallback(async () => {
    const copyObj = {
      ...store.pjt.controllers[controllerIdx].responses[apiRowIdx],
    };
    const dupApiObj = {
      apiName,
      apiDescription: apiDesc,
      apiUrl,
      apiMethod,
      apiCode,
      apiMethodName: methodName,
    };
    // api생성
    const { data }: any = await postApi(
      `/apidocs/${store.pjt.controllers[controllerIdx].id}/apis`,
      { ...dupApiObj, apiCode: dupApiObj.apiCode === 200 ? 'OK' : 'CREATED' },
    );

    createNewDto(data.apiId);

    copyObj.id = data.apiId;
    store.pjt.controllers[controllerIdx].responses.push(copyObj);

    closeModal();
  }, [apiRowIdx, apiName, apiDesc, apiUrl, apiMethod, apiCode, methodName]);

  const createNewDto = useCallback(
    async (apiId: number) => {
      // request 생성
      const reqBody = {
        dtoName: `${methodName}RequestDto`,
        dtoType: 'REQUEST',
        dtoIsList: dtoResponse[0].dtoIsList ? 'Y' : 'N',
      };

      // response 생성
      const resBody = {
        dtoName: `${methodName}ResponseDto`,
        dtoType: 'RESPONSE',
        dtoIsList: dtoResponse[1].dtoIsList ? 'Y' : 'N',
      };

      const reqDtoResp: any = await postApi(`/apidocs/${apiId}/dtos`, reqBody);
      const resDtoResp: any = await postApi(`/apidocs/${apiId}/dtos`, resBody);

      // request item 생성
      reqItems.forEach(async (item) => {
        const reqItemBody = {
          dtoItemName: item.dtoItemName,
          dtoClassType: item.dtoClassTypeId ? item.dtoClassTypeId : null,
          dtoPrimitiveType: item.dtoPrimitiveTypeId
            ? item.dtoPrimitiveTypeId
            : null,
          dtoIsList: item.dtoIsList ? 'Y' : 'N',
        };
        await postApi(
          `/apidocs/${reqDtoResp.data.dtoId}/dtoitems`,
          reqItemBody,
        );
      });

      // response item 생성
      resItems.forEach(async (item) => {
        const resItemBody = {
          dtoItemName: item.dtoItemName,
          dtoClassType: item.dtoClassTypeId ? item.dtoClassTypeId : null,
          dtoPrimitiveType: item.dtoPrimitiveTypeId
            ? item.dtoPrimitiveTypeId
            : null,
          dtoIsList: item.dtoIsList ? 'Y' : 'N',
        };
        await postApi(
          `/apidocs/${resDtoResp.data.dtoId}/dtoitems`,
          resItemBody,
        );
      });
    },
    [dtoResponse, reqItems, resItems, methodName],
  );

  return (
    <section className="modal-empty" onClick={closeModal}>
      <form
        className="api-add-modal-content"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitApi}
      >
        <article className="closebtn-container">
          <FontAwesomeIcon icon={faClose} onClick={closeModal} />
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
            reqItems={reqItems}
            resItems={resItems}
            setReqItems={setReqItems}
            setResItems={setResItems}
            dtoResponse={dtoResponse}
            setDtoResponse={setDtoResponse}
            deletedDtoItems={deletedDtoItems}
            setDeletedDtoItems={setDeletedDtoItems}
          />
        </article>

        <article className="closebtn-container">
          <button type="submit" className="api-add-button">
            {isEdit ? '수정' : '등록'}
          </button>
          {isEdit && (
            <>
              <button
                type="button"
                className="api-add-button"
                onClick={onDuplicateClick}
              >
                복제
              </button>
              <button
                type="button"
                className="api-add-button"
                onClick={onDeleteClick}
              >
                삭제
              </button>
            </>
          )}
        </article>
      </form>
    </section>
  );
}
