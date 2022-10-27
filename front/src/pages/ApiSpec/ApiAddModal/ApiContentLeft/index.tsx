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
  const [apiUrl, setApiUrl] = useState('');
  const [pathVarList, setPathVarList] = useState<Array<PATHVARIABLES>>([
    { key: '' },
  ]);
  const [queryList, setQueryList] = useState<Array<QUERY>>([
    { key: '', type: '' },
  ]);

  const onKeyChange = useCallback(
    (idx: number, e: any) => {
      const parsedApiUrl = apiUrl.split('?');
      if (isQuery) {
        const copyList = [...queryList];
        const copyObj = { ...queryList[idx] };
        copyObj.key = e.target.value;
        copyList[idx] = copyObj;

        if (e.target.value !== '' && idx === queryList.length - 1) {
          copyList.push({ key: '', type: '' });
        }

        const divisionIdx = apiUrl.indexOf('?');

        if (divisionIdx < 0) {
          setApiUrl(`${apiUrl}?${e.target.value}=`);
        } else {
          const onlyQueryUrl = apiUrl.substring(
            divisionIdx + 1,
            apiUrl.length - 1,
          );
          if (onlyQueryUrl === '') setApiUrl(apiUrl.substring(0, divisionIdx));
          else {
            let parsedQueryArray = onlyQueryUrl.split('&');
            parsedQueryArray[idx] = e.target.value;
            parsedQueryArray = parsedQueryArray.map(
              (query) => `${query.replaceAll('=', '')}=`,
            );
            setApiUrl(`${apiUrl.split('?')[0]}?${parsedQueryArray.join('&')}`);
          }
        }

        setQueryList([...copyList]);
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

        console.log(parsedApiUrlArray);
        // 첫 path variable 추가라면
        if (parsedApiUrlArray.length === 1)
          setApiUrl(
            `/{${e.target.value}}${
              parsedApiUrl.length > 1 ? `?${parsedApiUrl[1]}` : ''
            }`,
          );
        else {
          if (e.target.value === '') {
            copyList.splice(idx, 1);
          }
          parsedApiUrlArray[idx + 1] = e.target.value;
          parsedApiUrlArray = parsedApiUrlArray
            .filter((url, i) => i === 0 || url !== '')
            .map((url, i) => (i === 0 ? url : `{${url}}`));

          setApiUrl(
            `${parsedApiUrlArray.join('/')}${
              parsedApiUrl.length > 1 ? `?${parsedApiUrl[1]}` : ''
            }`,
          );
        }
        setPathVarList([...copyList]);
      }
    },
    [isQuery, pathVarList, apiUrl, queryList],
  );

  const deleteKey = useCallback(
    (idx: number) => {
      if (!isQuery) {
        const copyList = [...pathVarList];
        const onlyApiUrl = apiUrl.split('?')[0];
        const divisionIdx = apiUrl.indexOf('?');

        if (idx === 0 && pathVarList.length === 1) {
          setApiUrl(apiUrl.substring(0, divisionIdx));
          setQueryList([{ key: '', type: '' }]);
          return;
        }

        const parsedApiUrlArray = apiUrl.split('/');
        copyList.splice(idx, 1);
        parsedApiUrlArray.splice(idx + 1, 1);

        setApiUrl(parsedApiUrlArray.join('/'));
        setPathVarList([...copyList]);
      } else {
        const copyList = [...queryList];
        const onlyQueryUrl = apiUrl.split('?')[1];
        const divisionIdx = apiUrl.indexOf('?');

        if (idx === 0 && queryList.length === 1) {
          setApiUrl(apiUrl.substring(0, divisionIdx));
          setQueryList([{ key: '', type: '' }]);
          return;
        }

        const parsedQueryArray = onlyQueryUrl.split('&');
        copyList.splice(idx, 1);
        parsedQueryArray.splice(idx, 1);

        setApiUrl(
          `${apiUrl.substring(0, divisionIdx)}${
            parsedQueryArray.length > 0 ? `?${parsedQueryArray.join('&')}` : ''
          }`,
        );
        setQueryList([...copyList]);
      }
    },
    [pathVarList, apiUrl, isQuery, queryList],
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
          value={`/exercise${apiUrl}`}
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
          {!isQuery
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
