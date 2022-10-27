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
import ControllerList from './APIList';

interface API {
  id: number;
  name: string;
  url: string;
  method: string;
  code: number;
}

export default function ApiSpec() {
  const [step, setStep] = useState(1);
  const [controllers, setControllers] = useState(['user', 'exercise']);
  const [controllerIdx, setControllerIdx] = useState(0);
  const [apis, setApis] = useState([
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
  ]);
  const canEdit = false;

  const onControllerBlockClick = useCallback((idx: number) => {
    setControllerIdx(idx);
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
          {controllers.map((controller, i) => {
            return (
              <div
                className={`controller-block ${controllerIdx === i && 'on'}`}
                onClick={() => onControllerBlockClick(i)}
                key={i}
              >
                {controller} &nbsp; <FontAwesomeIcon icon={faPen} />
              </div>
            );
          })}
          <div className="controller-block plus">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </article>
        <article className="datatype-container">
          <FontAwesomeIcon icon={faPenToSquare} />
          &nbsp; 자료형 관리
        </article>
      </section>

      <ControllerList
        controllers={controllers}
        controllerIdx={controllerIdx}
        apis={apis}
      />
    </div>
  );
}
