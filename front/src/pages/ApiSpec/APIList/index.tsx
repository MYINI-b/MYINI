import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import ICON from 'assets/icon.png';
import ApiAddModal from '../ApiAddModal';

interface API {
  id: number;
  name: string;
  url: string;
  method: string;
  code: number;
}
interface CONTROLLER {
  name: string;
  desc: string;
  baseurl: string;
}

interface Props {
  controllers: Array<CONTROLLER>;
  controllerIdx: number;
  apis: API[][];
  dataType: string[];
  objDataType: any[];
}

export default function APIList({
  controllers,
  controllerIdx,
  apis,
  dataType,
  objDataType,
}: Props) {
  const [isApiAddModalOpen, setIsApiAddModalOpen] = useState(false);

  return (
    <section className="apilist-container">
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
              apis[controllerIdx].map((api) => {
                return (
                  <div className="api-table-row content" key={api.id}>
                    <div className="api-table-col one">
                      <img src={ICON} alt="" className="active-img" />
                    </div>
                    <h3 className="api-table-col two">{`${controllers[controllerIdx].name}-${api.id}`}</h3>
                    <h3 className="api-table-col three">{api.name}</h3>
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
              onClick={() => setIsApiAddModalOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </article>

      {isApiAddModalOpen && (
        <ApiAddModal
          setIsApiAddModalOpen={setIsApiAddModalOpen}
          controllers={controllers}
          controllerIdx={controllerIdx}
          dataType={dataType}
          objDataType={objDataType}
        />
      )}
    </section>
  );
}
