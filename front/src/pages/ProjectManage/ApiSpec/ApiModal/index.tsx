import { Dispatch, useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { API, CONTROLLER, QUERY } from 'types/ApiSpec';
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

  useEffect(() => {
    const getApiInfo = async () => {
      const editRow = store.pjt.controllers[controllerIdx].responses[apiRowIdx];

      const { data }: any = await getApi(`/apidocs/apis/${editRow.id}`);
      console.log(data);

      if (!store.pjt.currentAPI) initCurrentAPI();

      store.pjt.currentAPI.responses.id = data.apiResponse.apiId;
      store.pjt.currentAPI.responses.apiName = data.apiResponse.apiName;
      store.pjt.currentAPI.responses.methodName =
        data.apiResponse.apiMethodName;
      store.pjt.currentAPI.responses.url = data.apiResponse.apiUrl;
      store.pjt.currentAPI.responses.method = data.apiResponse.apiMethod;
      store.pjt.currentAPI.responses.code =
        data.apiResponse.apiCode === 'OK' ? 200 : 201;
      store.pjt.currentAPI.responses.desc =
        data.apiResponse.apiDescription || '';

      store.pjt.currentAPI.pathVarList = data.pathVariableResponses;
      store.pjt.currentAPI.queryList = data.queryStringResponses;
      store.pjt.currentAPI.dtoResponse = data.dtoResponses;

      setIsEdit(true);
    };

    const initCurrentAPI = () => {
      console.log('init current api');
      if (!store.pjt.currentAPI)
        store.pjt.currentAPI = {
          responses: {
            id: 0,
            apiName: '',
            methodName: '',
            url: '',
            method: 'GET',
            code: 200,
            desc: '',
          },
          pathVarList: [{ name: '', type: 'PATH' }],
          queryList: [{ name: '', type: 'STRING' }],
          dtoResponse: [],
        };
    };

    if (apiRowIdx >= 0) getApiInfo();
    else initCurrentAPI();
  }, []);

  const submitApi = useCallback(
    (e: any) => {
      e.preventDefault();

      setIsApiModalOpen(false);
    },
    [isEdit],
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
          <ApiContentLeft store={store} controllerIdx={controllerIdx} />
          <ApiContentRight objDataType={objDataType} store={store} />
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
