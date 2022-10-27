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
import APIList from './APIList';
import ControllerAddModal from './ControllerAddModal';

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

export default function ApiSpec() {
  const [step, setStep] = useState(1);
  const [controllers, setControllers] = useState<Array<CONTROLLER>>([
    { name: 'user', desc: '회원 관리를 위한 컨트롤러 입니다', baseurl: 'user' },
  ]); // 컨트롤러 목록
  const [controllerIdx, setControllerIdx] = useState(0); // 현재 선택된 컨트롤러 인덱스
  const [apis, setApis] = useState<Array<Array<API>>>([
    [
      {
        id: 1,
        name: '운동목록조회',
        url: '/exercises',
        method: 'GET',
        code: 200,
      },
      {
        id: 2,
        name: '운동목록조회',
        url: '/exercises',
        method: 'POST',
        code: 200,
      },
      {
        id: 3,
        name: '운동목록조회',
        url: '/exercises',
        method: 'PUT',
        code: 200,
      },
      {
        id: 4,
        name: '운동목록조회',
        url: '/exercises',
        method: 'DELETE',
        code: 200,
      },
      {
        id: 5,
        name: '운동목록조회',
        url: '/exercises',
        method: 'PATCH',
        code: 200,
      },
    ],
    [
      {
        id: 1,
        name: '유저목록조회',
        url: '/user',
        method: 'GET',
        code: 200,
      },
      {
        id: 2,
        name: '유저목록조회',
        url: '/user',
        method: 'POST',
        code: 200,
      },
      {
        id: 3,
        name: '유저목록조회',
        url: '/user',
        method: 'PUT',
        code: 200,
      },
      {
        id: 4,
        name: '유저목록조회',
        url: '/user',
        method: 'DELETE',
        code: 200,
      },
      {
        id: 5,
        name: '유저목록조회',
        url: '/user',
        method: 'PATCH',
        code: 200,
      },
    ],
  ]); // [controllerIdx]의 api 목록
  const [isControllerAddModalOpen, setIsControllerAddModalOpen] =
    useState(false);
  const canEdit = false;

  const onControllerBlockClick = useCallback((idx: number) => {
    setControllerIdx(idx);
  }, []);

  const onAddControllerClick = useCallback(() => {
    setIsControllerAddModalOpen(true);
  }, []);

  return (
    <div className="apispec-container">
      <Stepper step={step} setStep={setStep} />
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
                  {controller.name} &nbsp; <FontAwesomeIcon icon={faPen} />
                </div>
              );
            })}
            <div
              className="controller-block plus"
              onClick={onAddControllerClick}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </article>
        <article className="datatype-container">
          <FontAwesomeIcon icon={faPenToSquare} />
          &nbsp; 자료형 관리
        </article>
      </section>

      <APIList
        controllers={controllers}
        controllerIdx={controllerIdx}
        apis={apis}
      />

      {isControllerAddModalOpen && (
        <ControllerAddModal
          setIsControllerAddModalOpen={setIsControllerAddModalOpen}
          setControllers={setControllers}
          controllers={controllers}
        />
      )}
    </div>
  );
}
