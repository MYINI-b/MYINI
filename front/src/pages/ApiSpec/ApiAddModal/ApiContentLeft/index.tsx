import { useState, useCallback } from 'react';
import './style.scss';
import useInput from 'hooks/useInput';
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
  const [isQuery, setIsQuery] = useState(false);
  const [apiUrl, setApiUrl] = useState('exercise');
  const [pathVarList, setPathVarList] = useState<Array<PATHVARIABLES>>([
    { key: '' },
  ]);
  const [queryList, setQueryList] = useState<Array<QUERY>>([
    { key: '', type: '' },
  ]);

  const onKeyChange = useCallback(
    (idx: number, e: any) => {
      if (isQuery) {
        console.log('Sdf');
      } else {
        const copyList = [...pathVarList];
        const copyObj = { ...copyList[idx] };
        copyObj.key = e.target.value;
        copyList[idx] = copyObj;
        let parsedApiUrlArray = apiUrl
          .split('/')
          .map((url) => url.replaceAll('{', '').replaceAll('}', ''));
        // 마지막 인덱스 수정시작하면 새거 추가
        if (e.target.value !== '' && idx === pathVarList.length - 1) {
          copyList.push({ key: '' });
        }
        if (parsedApiUrlArray.length === 0)
          setApiUrl((prev) => `${prev}/{${e.target.value}}`);
        else {
          parsedApiUrlArray[idx + 1] = e.target.value;
          parsedApiUrlArray = parsedApiUrlArray.map((url, i) =>
            i === 0 ? url : url === '' ? '' : `{${url}}`,
          );
          setApiUrl(parsedApiUrlArray.join('/'));
        }
        setPathVarList([...copyList]);
      }
    },
    [isQuery, pathVarList, apiUrl],
  );

  const deleteKey = useCallback(
    (idx: number) => {
      const copyList = [...pathVarList];
      if (idx === 0 && pathVarList.length === 1) return;

      const parsedApiUrlArray = apiUrl.split('/');
      copyList.splice(idx, 1);
      parsedApiUrlArray.splice(idx + 1, 1);

      setApiUrl(parsedApiUrlArray.join('/'));
      setPathVarList([...copyList]);
    },
    [pathVarList, apiUrl],
  );

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
          value={`/${apiUrl}`}
          readOnly
        />
      </div>

      <div className="api-query-wrapper">
        <div className="api-query-title-container">
          <h3
            className={`api-query-title ${!isQuery && 'select'}`}
            onClick={() => setIsQuery(false)}
          >
            PATH VARIABLES
          </h3>
          <h3
            className={`api-query-title ${isQuery && 'select'}`}
            onClick={() => setIsQuery(true)}
          >
            QUERY
          </h3>
        </div>
        <div className="api-query-content-container">
          {!isQuery ? (
            pathVarList.map((pathvar, i) => {
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
          ) : (
            <div className="api-query-input-container">
              <input
                type="text"
                className="api-query-input"
                placeholder="KEY"
              />
              <input
                type="text"
                className="api-query-input"
                placeholder="TYPE"
              />
              <FontAwesomeIcon icon={faClose} className="api-query-delete" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
