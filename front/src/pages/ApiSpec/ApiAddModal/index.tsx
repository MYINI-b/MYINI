import { Dispatch, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { API, CONTROLLER, PATHVARIABLES, QUERY } from 'types/ApiSpec';
import ApiContentLeft from './ApiContentLeft';
import ApiContentRight from './ApiContentRight';

interface Props {
  controllers: Array<CONTROLLER>;
  controllerIdx: number;
  setIsApiAddModalOpen: Dispatch<React.SetStateAction<boolean>>;
  dataType: string[];
  objDataType: any[];
  apis: API[][];
  setApis: React.Dispatch<React.SetStateAction<API[][]>>;
}

export default function ApiAddModal({
  controllers,
  controllerIdx,
  setIsApiAddModalOpen,
  dataType,
  objDataType,
  apis,
  setApis,
}: Props) {
  const [apiName, setApiName] = useState('');
  const [apiDesc, setApiDesc] = useState('');
  const [methodName, setMethodName] = useState('');

  const [reqVarName, setReqVarName] = useState('');
  const [resVarName, setResVarName] = useState('');

  const [pathList, setPathList] = useState<Array<PATHVARIABLES>>([{ key: '' }]);
  const [pathVarList, setPathVarList] = useState<Array<PATHVARIABLES>>([
    { key: '' },
  ]);
  const [queryList, setQueryList] = useState<Array<QUERY>>([
    { key: '', type: '' },
  ]);

  const submitApi = useCallback(() => {}, []);

  return (
    <section
      className="modal-empty"
      onClick={() => setIsApiAddModalOpen(false)}
    >
      <form
        className="api-add-modal-content"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitApi}
      >
        <article className="closebtn-container">
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => setIsApiAddModalOpen(false)}
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
