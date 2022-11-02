import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faPenToSquare,
  faPen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import Stepper from 'pages/Requirement/Stepper';
import { API, CONTROLLER } from 'types/ApiSpec';
import APIList from './APIList';
import ControllerAddModal from './ControllerAddModal';
import DatatypeModal from './DatatypeModal';

export default function ApiSpec() {
  const [step, setStep] = useState(1);
  const [objDataType, setObjDataType] = useState<Array<any>>([]);
  const [controllers, setControllers] = useState<Array<CONTROLLER>>([]); // 컨트롤러 목록
  const [controllerIdx, setControllerIdx] = useState(-1); // 현재 선택된 컨트롤러 인덱스
  const [clickControllerIdx, setClickControllerIdx] = useState(0); // 현재 선택된 컨트롤러 인덱스

  const [apis, setApis] = useState<Array<Array<API>>>([]); // [controllerIdx]의 api 목록
  const [isControllerAddModalOpen, setIsControllerAddModalOpen] =
    useState(false);
  const [isDatatypeModalOpen, setIsDatatypeModalOpen] = useState(false);
  const canEdit = false;

  const onControllerBlockClick = useCallback((idx: number) => {
    setControllerIdx(idx);
  }, []);

  const onHandleControllerClick = useCallback((idx: number) => {
    setClickControllerIdx(idx);
    setIsControllerAddModalOpen(true);
  }, []);

  const onDatatypeClick = useCallback(() => {
    setIsDatatypeModalOpen(true);
  }, []);

  return (
    <div className="apispec-container">
      <h1 className="apispec-title">API 명세서</h1>

      <section className="apispec-info-section">
        <h2 className="apispec-project-title">project name</h2>
        <span className="apispec-status-span">
          <FontAwesomeIcon
            icon={faCircle}
            className={`apispec-status-icon ${canEdit ? 'on' : 'off'}`}
          />
          &nbsp;{canEdit ? '편집가능' : '편집불가'}
        </span>
      </section>

      <section className="apispec-controller-container">
        <article className="controller-list">
          <div className="controller-list-overflow">
            {controllers.map((controller, i) => {
              return (
                <div
                  className={`controller-block ${controllerIdx === i && 'on'}`}
                  onClick={() => onControllerBlockClick(i)}
                  key={i}
                >
                  {controller.name} &nbsp;{' '}
                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => onHandleControllerClick(i)}
                    className="controller-block-edit"
                  />
                </div>
              );
            })}
            <div
              className="controller-block plus"
              onClick={() => onHandleControllerClick(-1)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </article>
        <article className="datatype-container" onClick={onDatatypeClick}>
          <FontAwesomeIcon icon={faPenToSquare} />
          &nbsp; 자료형 관리
        </article>
      </section>

      <APIList
        controllers={controllers}
        controllerIdx={controllerIdx}
        objDataType={objDataType}
        apis={apis}
        setApis={setApis}
      />

      {isControllerAddModalOpen && (
        <ControllerAddModal
          setIsControllerAddModalOpen={setIsControllerAddModalOpen}
          setControllers={setControllers}
          controllers={controllers}
          clickControllerIdx={clickControllerIdx}
          setControllerIdx={setControllerIdx}
          apis={apis}
          setApis={setApis}
        />
      )}

      {isDatatypeModalOpen && (
        <DatatypeModal
          setIsDatatypeModalOpen={setIsDatatypeModalOpen}
          objDataType={objDataType}
          setObjDataType={setObjDataType}
        />
      )}
    </div>
  );
}
