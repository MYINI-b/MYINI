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
  store: any;
  controllerIdx: number;
}

export default function ApiContentLeft({ store, controllerIdx }: Props) {
  const [isPathVar, setIsPathVar] = useState(true);
  const [isApiMethodListOpen, setIsApiMethodListOpen] = useState(false);
  const [isPathTypeOpen, setIsPathTypeOpen] = useState(false);
  const [clickElementPos, setClickElementPos] = useState<ELEMENTPOS>({
    x: 0,
    y: 0,
    width: 0,
  });
  const [selectIdx, setSelectIdx] = useState(0);

  const onApiNameChange = useCallback(
    (e: any) => {
      store.pjt.currentAPI.responses.apiName = e.target.value.trim();
    },
    [store],
  );

  const onMethodNameChange = useCallback(
    (e: any) => {
      store.pjt.currentAPI.responses.methodName = e.target.value.trim();
    },
    [store],
  );

  const onDescChange = useCallback(
    (e: any) => {
      store.pjt.currentAPI.responses.desc = e.target.value.trim();
    },
    [store],
  );

  const onKeyChange = useCallback(
    (idx: number, e: any) => {
      const value = e.target.value.trim();

      if (isPathVar) {
        store.pjt.currentAPI.pathVarList[idx].key = value;
        if (
          value !== '' &&
          idx === store.pjt.currentAPI.pathVarList.length - 1
        ) {
          store.pjt.currentAPI.pathVarList.push({ key: '', type: 'PATH' });
        }
      } else {
        store.pjt.currentAPI.queryList[idx].key = value;

        if (value !== '' && idx === store.pjt.currentAPI.queryList.length - 1) {
          store.pjt.currentAPI.queryList.push({ key: '', type: 'STRING' });
        }
      }
    },
    [isPathVar],
  );

  const deleteKey = useCallback(
    (idx: number) => {
      if (isPathVar) {
        if (idx === 0 && store.pjt.currentAPI.pathVarList.length === 1) {
          store.pjt.currentAPI.pathVarList = [{ key: '', type: 'PATH' }];
          return;
        }

        store.pjt.currentAPI.pathVarList.splice(idx, 1);
      } else {
        if (idx === 0 && store.pjt.currentAPI.queryList.length === 1) {
          store.pjt.currentAPI.queryList = [{ key: '', type: 'PATH' }];
          return;
        }

        store.pjt.currentAPI.queryList.splice(idx, 1);
      }
    },
    [isPathVar],
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
    let newUrl = store.pjt.controllers[controllerIdx].baseurl;

    if (store.pjt.currentAPI) {
      store.pjt.currentAPI.pathVarList.forEach((path: QUERY) => {
        const pathurl =
          path.type === 'PATH' ? `/${path.key}` : `/{${path.key}}`;
        newUrl += pathurl;
      });

      store.pjt.currentAPI.queryList.forEach((query: QUERY, i: number) => {
        const queryurl = i === 0 ? `?${query.key}=` : `&${query.key}=`;
        newUrl += queryurl;
      });
      store.pjt.currentAPI.responses.url = newUrl;
      console.log(newUrl);
    }
  }, [store.pjt.currentAPI]);

  return (
    <div className="api-add-content-left">
      {store.pjt.currentAPI && (
        <>
          <input
            type="text"
            className="api-add-input"
            placeholder="API Name"
            value={store.pjt.currentAPI.responses.apiName}
            onChange={onApiNameChange}
            required
          />
          <Tooltip text="Camel Case 양식으로 작성해주세요.">
            <input
              type="text"
              className="api-add-input"
              placeholder="Method Name"
              value={store.pjt.currentAPI.responses.methodName}
              onChange={onMethodNameChange}
              required
            />
          </Tooltip>

          <input
            type="text"
            className="api-add-input"
            placeholder="Api Description"
            value={store.pjt.currentAPI.responses.desc}
            onChange={onDescChange}
            required
          />

          <div className="api-method-code-wrapper">
            <div className="method-code-div">
              <h3 className="method-code-title">메소드</h3>
              <span
                className={`method-code-block ${store.pjt.currentAPI.responses.method.toLowerCase()}`}
                onClick={() => setIsApiMethodListOpen(true)}
              >
                {store.pjt.currentAPI.responses.method}
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
              <span className="method-code-block code">
                {store.pjt.currentAPI.responses.code}
              </span>
            </div>
          </div>

          <div className="api-url-wrapper">
            <h3 className="api-url-title">URL</h3>
            <input
              type="text"
              className="api-url-input"
              value={`${store.pjt.controllers[controllerIdx].baseurl}${store.pjt.currentAPI.responses.url}`}
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
                ? store.pjt.currentAPI.pathVarList.map(
                    (pathvar: QUERY, i: number) => {
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
                              {!pathvar || pathvar.type === ''
                                ? 'TYPE'
                                : pathvar.type}
                            </label>
                            <FontAwesomeIcon icon={faChevronDown} />
                            {isPathTypeOpen && (
                              <PathTypeModal
                                setIsPathTypeOpen={setIsPathTypeOpen}
                                clickElementPos={clickElementPos}
                                selectIdx={selectIdx}
                                isPathVar={isPathVar}
                                store={store}
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
                    },
                  )
                : store.pjt.currentAPI.queryList.map(
                    (query: QUERY, i: number) => {
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
                              {!query || query.type === ''
                                ? 'TYPE'
                                : query.type}
                            </label>
                            <FontAwesomeIcon icon={faChevronDown} />
                            {isPathTypeOpen && (
                              <PathTypeModal
                                setIsPathTypeOpen={setIsPathTypeOpen}
                                clickElementPos={clickElementPos}
                                selectIdx={selectIdx}
                                isPathVar={isPathVar}
                                store={store}
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
                    },
                  )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
