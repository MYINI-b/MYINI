import { useState, useCallback, useEffect, Dispatch } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { QUERY } from 'types/ApiSpec';
import { ELEMENTPOS } from 'types/Requirement';
import Tooltip from 'components/Tooltip';
import ApiMethodList from '../ApiMethodList';
import PathTypeModal from './PathTypeModal';

interface Props {
  pathVarList: QUERY[];
  setPathVarList: Dispatch<React.SetStateAction<QUERY[]>>;
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
  const [isPathVar, setIsPathVar] = useState(true);
  const [isApiMethodListOpen, setIsApiMethodListOpen] = useState(false);
  const [isPathTypeOpen, setIsPathTypeOpen] = useState(false);
  const [clickElementPos, setClickElementPos] = useState<ELEMENTPOS>({
    x: 0,
    y: 0,
    width: 0,
  });
  const [selectIdx, setSelectIdx] = useState(0);

  // const onKeyChange = useCallback(
  //   (idx: number, e: any) => {
  //     const copyList = isPathVar ? [...pathVarList] : [...queryList];
  //     const copyObj = { ...copyList[idx] };
  //     copyObj.key = e.target.value.trim();
  //     copyList[idx] = copyObj;

  //     if (isPathVar) {
  //       if (e.target.value !== '' && idx === pathVarList.length - 1) {
  //         copyList.push({ key: '', type: 'PATH' });
  //       }

  //       setPathVarList([...copyList]);
  //     } else {
  //       const copyList = [...queryList];
  //       const copyObj = { ...queryList[idx] };
  //       copyObj.key = e.target.value;
  //       copyList[idx] = copyObj;

  //       if (e.target.value !== '' && idx === queryList.length - 1) {
  //         copyList.push({ key: '', type: 'STRING' });
  //       }

  //       setQueryList([...copyList]);
  //     }
  //   },
  //   [isPathVar, pathVarList, queryList],
  // );

  // const deleteKey = useCallback(
  //   (idx: number) => {
  //     const copyList = isPathVar ? [...pathVarList] : [...queryList];

  //     if (isPathVar) {
  //       if (idx === 0 && pathVarList.length === 1) {
  //         setPathVarList([{ key: '', type: 'PATH' }]);
  //         return;
  //       }

  //       copyList.splice(idx, 1);
  //       setPathVarList([...copyList]);
  //     } else {
  //       const copyList = [...queryList];

  //       if (idx === 0 && queryList.length === 1) {
  //         setQueryList([{ key: '', type: 'STRING' }]);
  //         return;
  //       }

  //       copyList.splice(idx, 1);
  //       setQueryList([...copyList]);
  //     }
  //   },
  //   [pathVarList, isPathVar, queryList],
  // );

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
    let newApiUrl = '';

    pathVarList.forEach((e) => {
      if (e.key !== '') {
        if (e.type === 'PATH') newApiUrl += `/${e.key}`;
        else newApiUrl += `/{${e.key}}`;
      }
    });

    newApiUrl +=
      queryList.length > 1 || (queryList.length > 0 && queryList[0].key !== '')
        ? '?'
        : '';
    queryList.forEach((e, i) => {
      if (e.key !== '') newApiUrl += i > 0 ? `&${e.key}=` : `${e.key}=`;
    });

    setApiUrl(newApiUrl);
  }, [pathVarList, queryList]);

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
        onChange={(e) => setApiName(e.target.value.trim())}
        required
      />
      <Tooltip text="Camel Case 양식으로 작성해주세요.">
        <input
          type="text"
          className="api-add-input"
          placeholder="Method Name"
          value={methodName}
          onChange={(e) => setMethodName(e.target.value.trim())}
          required
        />
      </Tooltip>

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
        <input
          type="text"
          className="api-url-input"
          value={`${apiBaseUrl}${apiUrl}`}
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
            ? pathVarList.map((pathvar, i) => {
                return (
                  <div className="api-query-input-container" key={i}>
                    <input
                      type="text"
                      className="api-query-input"
                      placeholder="KEY"
                      // onChange={(e) => onKeyChange(i, e)}
                      value={pathvar.key}
                    />
                    <div className="api-query-div">
                      <label onClick={(e) => onPathTypeClick(e, i)}>
                        {pathvar.type === '' ? 'TYPE' : pathvar.type}{' '}
                      </label>
                      <FontAwesomeIcon icon={faChevronDown} />
                      {isPathTypeOpen && (
                        <PathTypeModal
                          setIsPathTypeOpen={setIsPathTypeOpen}
                          clickElementPos={clickElementPos}
                          list={pathVarList}
                          setList={setPathVarList}
                          selectIdx={selectIdx}
                          isPathVar={isPathVar}
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
              })
            : queryList.map((query, i) => {
                return (
                  <div className="api-query-input-container" key={i}>
                    <input
                      type="text"
                      className="api-query-input"
                      placeholder="KEY"
                      // onChange={(e) => onKeyChange(i, e)}
                      value={query.key}
                    />
                    <div className="api-query-div">
                      <label onClick={(e) => onPathTypeClick(e, i)}>
                        {query.type === '' ? 'TYPE' : query.type}
                      </label>
                      <FontAwesomeIcon icon={faChevronDown} />
                      {isPathTypeOpen && (
                        <PathTypeModal
                          setIsPathTypeOpen={setIsPathTypeOpen}
                          clickElementPos={clickElementPos}
                          list={queryList}
                          setList={setQueryList}
                          selectIdx={selectIdx}
                          isPathVar={isPathVar}
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
