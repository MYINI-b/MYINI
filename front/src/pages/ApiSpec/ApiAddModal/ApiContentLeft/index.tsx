import { useState, useCallback, useEffect } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface PATHVARIABLES {
  key: '';
}
interface QUERY {
  key: '';
  type: '';
}

export default function ApiContentLeft() {
  const [queryStep, setQueryStep] = useState(1);
  const [apiUrl, setApiUrl] = useState('');
  const [pathList, setPathList] = useState<Array<PATHVARIABLES>>([{ key: '' }]);
  const [pathVarList, setPathVarList] = useState<Array<PATHVARIABLES>>([
    { key: '' },
  ]);
  const [queryList, setQueryList] = useState<Array<QUERY>>([
    { key: '', type: '' },
  ]);

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
    let newApiUrl = '';
    pathList.forEach((e) => {
      if (e.key !== '') newApiUrl += `/${e.key}`;
    });

    pathVarList.forEach((e) => {
      if (e.key !== '') newApiUrl += `/{${e.key}}`;
    });

    newApiUrl += queryList.length > 1 || queryList[0].key !== '' ? '?' : '';
    queryList.forEach((e, i) => {
      if (e.key !== '') newApiUrl += i > 0 ? `&${e.key}=` : `${e.key}=`;
    });

    setApiUrl(newApiUrl);
  }, [pathList, pathVarList, queryList]);

  return (
    <div className="api-add-content-left">
      <input type="text" className="api-add-input" placeholder="API Name" />
      <input type="text" className="api-add-input" placeholder="Method Name" />
      <input
        type="text"
        className="api-add-input"
        placeholder="Api Description"
      />

      <div className="api-method-code-wrapper">
        <div className="method-code-div">
          <h3 className="method-code-title">메소드</h3>
          <span className="method-code-block get">GET</span>
        </div>
        <div className="method-code-div">
          <h3 className="method-code-title">코드</h3>
          <span className="method-code-block code">GET</span>
        </div>
      </div>

      <div className="api-url-wrapper">
        <h3 className="api-url-title">URL</h3>
        <input
          type="text"
          className="api-url-input"
          value={`/exercise${apiUrl}`}
          readOnly
        />
      </div>

      <div className="api-query-wrapper">
        <div className="api-query-title-container">
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
          {queryStep === 1
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
