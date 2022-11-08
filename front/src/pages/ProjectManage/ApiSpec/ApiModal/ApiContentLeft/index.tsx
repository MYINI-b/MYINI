import React, { useState, useCallback, useEffect, Dispatch } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { QUERY } from 'types/ApiSpec';
import { ELEMENTPOS } from 'types/Requirement';
import Tooltip from 'components/Tooltip';
import ApiMethodList from '../ApiMethodList';
import PathTypeModal from './PathTypeModal';

interface Props {
  store: any;
  controllerIdx: number;
  apiName: string;
  setApiName: Dispatch<React.SetStateAction<string>>;
  apiDesc: string;
  setApiDesc: Dispatch<React.SetStateAction<string>>;
  methodName: string;
  setMethodName: Dispatch<React.SetStateAction<string>>;
  apiUrl: string;
  setApiUrl: Dispatch<React.SetStateAction<string>>;
  apiMethod: string;
  setApiMethod: Dispatch<React.SetStateAction<string>>;
  apiCode: number;
  setApiCode: Dispatch<React.SetStateAction<number>>;
  pathVarList: QUERY[];
  setPathVarList: Dispatch<React.SetStateAction<QUERY[]>>;
  queryList: QUERY[];
  setQueryList: Dispatch<React.SetStateAction<QUERY[]>>;
}

export default function ApiContentLeft({
  store,
  controllerIdx,
  apiName,
  setApiName,
  apiDesc,
  setApiDesc,
  methodName,
  setMethodName,
  apiUrl,
  setApiUrl,
  apiMethod,
  setApiMethod,
  apiCode,
  setApiCode,
  pathVarList,
  setPathVarList,
  queryList,
  setQueryList,
}: Props) {
  const [isPathVar, setIsPathVar] = useState(true);
  const [isApiMethodListOpen, setIsApiMethodListOpen] = useState(false);
  const [isPathTypeOpen, setIsPathTypeOpen] = useState(false);
  const [clickElementPos, setClickElementPos] = useState<ELEMENTPOS>({
    x: 0,
    y: 0,
    width: 0,
  });
  const [selectIdx, setSelectIdx] = useState(0);

  const onApiNameChange = useCallback((e: any) => {
    setApiName(e.target.value.trim());
  }, []);

  const onMethodNameChange = useCallback((e: any) => {
    setMethodName(e.target.value.trim());
  }, []);

  const onDescChange = useCallback((e: any) => {
    setApiDesc(e.target.value.trim());
  }, []);

  const onKeyChange = useCallback(
    (idx: number, e: any) => {
      const value = e.target.value.trim();

      if (isPathVar) {
        const copyList = [...pathVarList];
        copyList[idx].key = value;
        if (value !== '' && idx === pathVarList.length - 1)
          copyList.push({ id: 0, key: '', type: 'NORMAL' });
        setPathVarList(copyList);
      } else {
        const copyList = [...queryList];
        copyList[idx].key = value;
        if (value !== '' && idx === queryList.length - 1)
          copyList.push({ id: 0, key: '', type: 'String' });
        setQueryList(copyList);
      }
    },
    [isPathVar, pathVarList, queryList],
  );

  const deleteKey = useCallback(
    (idx: number) => {
      if (isPathVar) {
        if (idx === 0 && pathVarList.length === 1) {
          setPathVarList([{ id: 0, key: '', type: 'NORMAL' }]);
          return;
        }

        const copyArr = [...pathVarList];
        copyArr.splice(idx, 1);
        setPathVarList(copyArr);
      } else {
        if (idx === 0 && queryList.length === 1) {
          setQueryList([{ id: 0, key: '', type: 'String' }]);
          return;
        }

        const copyArr = [...queryList];
        copyArr.splice(idx, 1);
        setQueryList(copyArr);
      }
    },
    [isPathVar, pathVarList, queryList],
  );

  const onPathTypeClick = useCallback((e: any, idx: number) => {
    setIsPathTypeOpen(true);
    setClickElementPos({
      y: e.target.getBoundingClientRect().top + 26,
      x: e.target.getBoundingClientRect().left,
      width: e.target.offsetWidth,
    });
    setSelectIdx(idx);
  }, []);

  useEffect(() => {
    let newUrl = '';

    pathVarList.forEach((path) => {
      if (path.key !== '')
        newUrl += path.type === 'NORMAL' ? `/${path.key}` : `/{${path.key}}`;
    });

    queryList.forEach((query: any, i: number) => {
      if (query.key !== '')
        newUrl += i === 0 ? `?${query.key}=` : `&${query.key}=`;
    });
    setApiUrl(newUrl);
  }, [pathVarList, queryList]);

  return (
    <div className="api-add-content-left">
      <input
        type="text"
        className="api-add-input"
        placeholder="API Name"
        value={apiName || ''}
        onChange={onApiNameChange}
        required
      />
      <Tooltip text="Camel Case 양식으로 작성해주세요.">
        <input
          type="text"
          className="api-add-input"
          placeholder="Method Name"
          value={methodName || ''}
          onChange={onMethodNameChange}
          required
        />
      </Tooltip>

      <input
        type="text"
        className="api-add-input"
        placeholder="Api Description"
        value={apiDesc || ''}
        onChange={onDescChange}
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
                store={store}
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
        <input
          type="text"
          className="api-url-input"
          value={
            `${store.pjt.controllers[controllerIdx].baseurl}${apiUrl}` || ''
          }
          readOnly
        />
      </div>

      <div className="api-query-wrapper">
        <Tooltip text="PATH는 소문자 복수형으로, PATH VARIABLE은 소문자로 작성해주세요.">
          <div className="api-query-title-container">
            <h3
              className={`api-query-title ${isPathVar && 'select'}`}
              onClick={() => setIsPathVar(true)}
            >
              RESOURCE
            </h3>
            <h3
              className={`api-query-title ${!isPathVar && 'select'}`}
              onClick={() => setIsPathVar(false)}
            >
              QUERY
            </h3>
          </div>
        </Tooltip>
        <div className="api-query-content-container">
          {isPathVar
            ? pathVarList.map((pathvar: QUERY, i: number) => {
                return (
                  <div className="api-query-input-container" key={i}>
                    <input
                      type="text"
                      className="api-query-input"
                      placeholder="KEY"
                      onChange={(e) => onKeyChange(i, e)}
                      value={pathvar.key || ''}
                    />
                    <div className="api-query-div">
                      <label onClick={(e) => onPathTypeClick(e, i)}>
                        {pathvar.type}
                      </label>
                      <FontAwesomeIcon icon={faChevronDown} />
                      {isPathTypeOpen && (
                        <PathTypeModal
                          setIsPathTypeOpen={setIsPathTypeOpen}
                          clickElementPos={clickElementPos}
                          selectIdx={selectIdx}
                          isPathVar={isPathVar}
                          store={store}
                          list={pathVarList}
                          setList={setPathVarList}
                        />
                      )}
                    </div>

                    <FontAwesomeIcon
                      icon={faClose}
                      className="api-query-delete"
                      onClick={() => deleteKey(i)}
                    />
                  </div>
                );
              })
            : queryList.map((query: any, i: number) => {
                return (
                  <div className="api-query-input-container" key={i}>
                    <input
                      type="text"
                      className="api-query-input"
                      placeholder="KEY"
                      onChange={(e) => onKeyChange(i, e)}
                      value={query.key || ''}
                    />
                    <div className="api-query-div">
                      <label onClick={(e) => onPathTypeClick(e, i)}>
                        {query.type}
                      </label>
                      <FontAwesomeIcon icon={faChevronDown} />
                      {isPathTypeOpen && (
                        <PathTypeModal
                          setIsPathTypeOpen={setIsPathTypeOpen}
                          clickElementPos={clickElementPos}
                          selectIdx={selectIdx}
                          isPathVar={isPathVar}
                          store={store}
                          list={queryList}
                          setList={setQueryList}
                        />
                      )}
                    </div>
                    <FontAwesomeIcon
                      icon={faClose}
                      className="api-query-delete"
                      // onClick={() => deleteKey(i)}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
