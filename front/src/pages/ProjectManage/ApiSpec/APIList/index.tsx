import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import ICON from 'assets/icon.png';
import { RESPONSE } from 'types/ApiSpec';
import ApiModal from '../ApiModal';

interface Props {
  store: any;
  controllerIdx: number;
}

export default function APIList({ store, controllerIdx }: Props) {
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [apiRowIdx, setApiRowIdx] = useState(-1);

  const onApiRowClick = useCallback((idx: number) => {
    setApiRowIdx(idx);
    setIsApiModalOpen(true);
  }, []);

  return (
    <section className="apilist-container">
      {store.pjt.controllers &&
        store.pjt.controllers.length > 0 &&
        controllerIdx >= 0 && (
          <>
            <p className="controller-desc">
              Description : {store.pjt.controllers[controllerIdx].desc}
            </p>
            <p className="controller-desc">
              BaseUrl : {store.pjt.controllers[controllerIdx].baseurl}
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
                  {store.pjt.controllers[controllerIdx].responses &&
                    store.pjt.controllers[controllerIdx].responses.map(
                      (api: RESPONSE, i: number) => {
                        return (
                          <div
                            className="api-table-row content"
                            key={i}
                            onClick={() => onApiRowClick(i)}
                          >
                            <div className="api-table-col one">
                              <img src={ICON} alt="" className="active-img" />
                            </div>
                            <h3 className="api-table-col two">{`${
                              store.pjt.controllers[controllerIdx].name
                            }-${i + 1}`}</h3>
                            <h3 className="api-table-col three">
                              {api.apiName}
                            </h3>
                            <h3 className="api-table-col three">{`${store.pjt.controllers[controllerIdx].baseurl}${api.url}`}</h3>
                            <h3 className="api-table-col two">
                              <span
                                className={`api-method-block ${api.method}`}
                              >
                                {api.method}
                              </span>
                            </h3>
                            <h3 className="api-table-col two">{api.code}</h3>
                          </div>
                        );
                      },
                    )}

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

      {/* {isApiModalOpen && (
        <ApiModal
          setIsApiModalOpen={setIsApiModalOpen}
          controllers={controllers}
          controllerIdx={controllerIdx}
          apiRowIdx={apiRowIdx}
          objDataType={objDataType}
          apis={apis}
          setApis={setApis}
        />
      )} */}
    </section>
  );
}
