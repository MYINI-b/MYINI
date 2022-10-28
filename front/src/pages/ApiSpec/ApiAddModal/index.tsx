import { Dispatch } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import ApiContentLeft from './ApiContentLeft';
import ApiContentRight from './ApiContentRight';

interface CONTROLLER {
  name: string;
  desc: string;
  baseurl: string;
}
interface Props {
  controllers: Array<CONTROLLER>;
  controllerIdx: number;
  setIsApiAddModalOpen: Dispatch<React.SetStateAction<boolean>>;
  dataType: string[];
  objDataType: any[];
}

export default function ApiAddModal({
  controllers,
  controllerIdx,
  setIsApiAddModalOpen,
  dataType,
  objDataType,
}: Props) {
  return (
    <section
      className="modal-empty"
      onClick={() => setIsApiAddModalOpen(false)}
    >
      <div
        className="api-add-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <article className="closebtn-container">
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => setIsApiAddModalOpen(false)}
          />
        </article>

        <article className="api-add-content-container">
          <ApiContentLeft
            controllers={controllers}
            controllerIdx={controllerIdx}
          />
          <ApiContentRight dataType={dataType} objDataType={objDataType} />
        </article>

        <article className="closebtn-container">
          <button type="button" className="api-add-button">
            등록
          </button>
        </article>
      </div>
    </section>
  );
}
