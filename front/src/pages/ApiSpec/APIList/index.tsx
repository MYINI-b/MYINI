import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import ICON from 'assets/icon.png';
import { API, CONTROLLER } from 'types/ApiSpec';
import ApiModal from '../ApiModal';

interface Props {
  controllers: Array<CONTROLLER>;
  controllerIdx: number;
  apis: API[][];
  setApis: React.Dispatch<React.SetStateAction<API[][]>>;
  dataType: string[];
  objDataType: any[];
}

export default function APIList({
  controllers,
  controllerIdx,
  apis,
  setApis,
  dataType,
  objDataType,
}: Props) {
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [apiRowIdx, setApiRowIdx] = useState(-1);

  const onApiRowClick = useCallback((idx: number) => {
    setApiRowIdx(idx);
    setIsApiModalOpen(true);
  }, []);

  return (
    <section className="apilist-container">
      {controllerIdx >= 0 && (
        <>
          <p className="controller-desc">
            Description : {controllers[controllerIdx].desc}
          </p>
          <p className="controller-desc">
            BaseUrl : /{controllers[controllerIdx].baseurl}
          </p>
          <article className="api-table-wrapper">
            <div className="api-table-row">
              <div className="api-table-col one" />
              <h3 className="api-table-col two title">ID</h3>
              <h3 className="api-table-col three title">이름</h3>
              <h3 className="api-table-col three title">URL</h3>
              <h3 className="api-table-col two title">메소드</h3>
              <h3 className="api-table-col two title">코드</h3>
            </div>

            <div className="api-table-tbody">
              <div className="api-table-overflow">
                {apis[controllerIdx].length > 0 &&
                  apis[controllerIdx].map((api, i) => {
                    return (
                      <div
                        className="api-table-row content"
                        key={i}
                        onClick={() => onApiRowClick(i)}
                      >
                        <div className="api-table-col one">
                          <img src={ICON} alt="" className="active-img" />
                        </div>
                        <h3 className="api-table-col two">{`${controllers[controllerIdx].name}-${api.id}`}</h3>
                        <h3 className="api-table-col three">{api.apiName}</h3>
                        <h3 className="api-table-col three">{api.url}</h3>
                        <h3 className="api-table-col two">
                          <span className={`api-method-block ${api.method}`}>
                            {api.method}
                          </span>
                        </h3>
                        <h3 className="api-table-col two">{api.code}</h3>
                      </div>
                    );
                  })}

                <button
                  type="button"
                  className="api-add-button"
                  onClick={() => onApiRowClick(-1)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </article>
        </>
      )}

      {isApiModalOpen && (
        <ApiModal
          setIsApiModalOpen={setIsApiModalOpen}
          controllers={controllers}
          controllerIdx={controllerIdx}
          apiRowIdx={apiRowIdx}
          dataType={dataType}
          objDataType={objDataType}
          apis={apis}
          setApis={setApis}
        />
      )}
    </section>
  );
}
