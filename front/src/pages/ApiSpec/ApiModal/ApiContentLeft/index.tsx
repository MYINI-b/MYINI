import { useState, useCallback, useEffect, Dispatch } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import { PATHVARIABLES, QUERY } from 'types/ApiSpec';
import ApiMethodList from '../ApiMethodList';

interface Props {
  pathList: PATHVARIABLES[];
  setPathList: Dispatch<React.SetStateAction<PATHVARIABLES[]>>;
  pathVarList: PATHVARIABLES[];
  setPathVarList: Dispatch<React.SetStateAction<PATHVARIABLES[]>>;
  queryList: QUERY[];
  setQueryList: Dispatch<React.SetStateAction<QUERY[]>>;
  apiName: string;
  setApiName: Dispatch<React.SetStateAction<string>>;
  methodName: string;
  setMethodName: Dispatch<React.SetStateAction<string>>;
  apiDesc: string;
  setApiDesc: Dispatch<React.SetStateAction<string>>;
  apiMethod: string;
  setApiMethod: Dispatch<React.SetStateAction<string>>;
  apiCode: number;
  setApiCode: Dispatch<React.SetStateAction<number>>;
  apiUrl: string;
  setApiUrl: Dispatch<React.SetStateAction<string>>;
  apiBaseUrl: string;
}

export default function ApiContentLeft({
  pathList,
  setPathList,
  pathVarList,
  setPathVarList,
  queryList,
  setQueryList,
  apiName,
  setApiName,
  methodName,
  setMethodName,
  apiDesc,
  setApiDesc,
  apiMethod,
  setApiMethod,
  apiCode,
  setApiCode,
  apiUrl,
  setApiUrl,
  apiBaseUrl,
}: Props) {
  const [queryStep, setQueryStep] = useState(0);
  const [isApiMethodListOpen, setIsApiMethodListOpen] = useState(false);

  const onKeyChange = useCallback(
    (idx: number, e: any) => {
      const copyList =
        queryStep === 0
          ? [...pathList]
          : queryStep === 1
          ? [...pathVarList]
          : [...queryList];
      const copyObj = { ...copyList[idx] };
      copyObj.key = e.target.value;
      copyList[idx] = copyObj;

      if (queryStep === 0) {
        if (e.target.value !== '' && idx === pathList.length - 1)
          copyList.push({ key: '' });

        setPathList([...copyList]);
      } else if (queryStep === 1) {
        if (e.target.value !== '' && idx === pathVarList.length - 1) {
          copyList.push({ key: '' });
        }

        setPathVarList([...copyList]);
      } else if (queryStep === 2) {
        const copyList = [...queryList];
        const copyObj = { ...queryList[idx] };
        copyObj.key = e.target.value;
        copyList[idx] = copyObj;

        if (e.target.value !== '' && idx === queryList.length - 1) {
          copyList.push({ key: '', type: '' });
        }

        setQueryList([...copyList]);
      }
    },
    [queryStep, pathVarList, queryList, pathList],
  );

  const deleteKey = useCallback(
    (idx: number) => {
      const copyList =
        queryStep === 0
          ? [...pathList]
          : queryStep === 1
          ? [...pathVarList]
          : [...queryList];

      if (queryStep === 0) {
        if (idx === 0 && pathList.length === 1) {
          setPathList([{ key: '' }]);
          return;
        }

        copyList.splice(idx, 1);
        setPathList([...copyList]);
      } else if (queryStep === 1) {
        if (idx === 0 && pathVarList.length === 1) {
          setPathVarList([{ key: '' }]);
          return;
        }

        copyList.splice(idx, 1);
        setPathVarList([...copyList]);
      } else if (queryStep === 2) {
        const copyList = [...queryList];

        if (idx === 0 && queryList.length === 1) {
          setQueryList([{ key: '', type: '' }]);
          return;
        }

        copyList.splice(idx, 1);
        setQueryList([...copyList]);
      }
    },
    [pathVarList, queryStep, queryList, pathList],
  );

  useEffect(() => {
    let newApiUrl = apiBaseUrl;
    pathList.forEach((e) => {
      if (e.key !== '') newApiUrl += `/${e.key}`;
    });

    pathVarList.forEach((e) => {
      if (e.key !== '') newApiUrl += `/{${e.key}}`;
    });

    newApiUrl +=
      queryList.length > 1 || (queryList.length > 0 && queryList[0].key !== '')
        ? '?'
        : '';
    queryList.forEach((e, i) => {
      if (e.key !== '') newApiUrl += i > 0 ? `&${e.key}=` : `${e.key}=`;
    });

    setApiUrl(newApiUrl);
  }, [pathList, pathVarList, queryList]);

  useEffect(() => {
    if (apiMethod === 'POST') {
      setApiCode(201);
    } else {
      setApiCode(200);
    }
  }, [apiMethod]);

  return (
    <div className="api-add-content-left">
      <input
        type="text"
        className="api-add-input"
        placeholder="API Name"
        value={apiName}
        onChange={(e) => setApiName(e.target.value)}
        required
      />
      <input
        type="text"
        className="api-add-input"
        placeholder="Method Name"
        value={methodName}
        onChange={(e) => setMethodName(e.target.value)}
        required
      />
      <input
        type="text"
        className="api-add-input"
        placeholder="Api Description"
        value={apiDesc}
        onChange={(e) => setApiDesc(e.target.value)}
        required
      />

      <div className="api-method-code-wrapper">
        <div className="method-code-div">
          <h3 className="method-code-title">메소드</h3>
          <span
            className={`method-code-block ${apiMethod.toLowerCase()}`}
            onClick={() => setIsApiMethodListOpen(true)}
          >
            {apiMethod}
            {isApiMethodListOpen && (
              <ApiMethodList
                setIsApiMethodListOpen={setIsApiMethodListOpen}
                apiMethod={apiMethod}
                setApiMethod={setApiMethod}
              />
            )}
          </span>
        </div>
        <div className="method-code-div">
          <h3 className="method-code-title">코드</h3>
          <span className="method-code-block code">{apiCode}</span>
        </div>
      </div>

      <div className="api-url-wrapper">
        <h3 className="api-url-title">URL</h3>
        <input type="text" className="api-url-input" value={apiUrl} readOnly />
      </div>

      <div className="api-query-wrapper">
        <div className="api-query-title-container">
          <h3
            className={`api-query-title ${queryStep === 0 && 'select'}`}
            onClick={() => setQueryStep(0)}
          >
            PATH
          </h3>
          <h3
            className={`api-query-title ${queryStep === 1 && 'select'}`}
            onClick={() => setQueryStep(1)}
          >
            PATH VARIABLES
          </h3>
          <h3
            className={`api-query-title ${queryStep === 2 && 'select'}`}
            onClick={() => setQueryStep(2)}
          >
            QUERY
          </h3>
        </div>
        <div className="api-query-content-container">
          {queryStep === 0
            ? pathList.map((path, i) => {
                return (
                  <div className="api-query-input-container" key={i}>
                    <input
                      type="text"
                      className="api-query-input"
                      placeholder="KEY"
                      onChange={(e) => onKeyChange(i, e)}
                      value={path.key}
                    />
                    <FontAwesomeIcon
                      icon={faClose}
                      className="api-query-delete"
                      onClick={() => deleteKey(i)}
                    />
                  </div>
                );
              })
            : queryStep === 1
            ? pathVarList.map((pathvar, i) => {
                return (
                  <div className="api-query-input-container" key={i}>
                    <input
                      type="text"
                      className="api-query-input"
                      placeholder="KEY"
                      onChange={(e) => onKeyChange(i, e)}
                      value={pathvar.key}
                    />
                    <FontAwesomeIcon
                      icon={faClose}
                      className="api-query-delete"
                      onClick={() => deleteKey(i)}
                    />
                  </div>
                );
              })
            : queryList.map((query, i) => {
                return (
                  <div className="api-query-input-container" key={i}>
                    <input
                      type="text"
                      className="api-query-input"
                      placeholder="KEY"
                      onChange={(e) => onKeyChange(i, e)}
                      value={query.key}
                    />
                    <input
                      type="text"
                      className="api-query-input"
                      placeholder="TYPE"
                    />
                    <FontAwesomeIcon
                      icon={faClose}
                      className="api-query-delete"
                      onClick={() => deleteKey(i)}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
