import { useOthers, useUpdatePresence } from '@y-presence/react';
import { UserPresence } from 'types/main';
import React from 'react';
import './style.scss';
import { Cursor } from 'components/Cursor';

// components

// 3rd party
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import GenerateVuerd from './GenerateVuerd';

interface Props {
  pid: string;
  store: any;
}
export default function ERDPage({ pid, store }: Props) {
  const others = useOthers<UserPresence>();
  const updatePresence = useUpdatePresence<UserPresence>();

  const handlePointMove = React.useCallback(
    (e: React.PointerEvent) => {
      updatePresence({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
        step: 3,
      });
    },
    [updatePresence],
  );

  return (
    <div className="erd-container" onPointerMove={handlePointMove}>
      <h1 className="erd-title">
        ERD &nbsp;
        <div className="other-list-container">
          {others
            .filter((user) => user.presence.step === 3)
            .map((user: any, i: number) => {
              return (
                <div className="other-color-container" key={i}>
                  <img src={user.presence.img} className="other-color" alt="" />
                  <label className="other-hover-name">
                    {user.presence.name}
                  </label>
                </div>
              );
            })}
        </div>
      </h1>
      <section className="erd-info-section">
        <h3 className="erd-project-title">{store && store.pjt.title}</h3>
        <div className="erd-info-container">
          <div className="erd-info-hover-content">
            <h5>정상적으로 빌드되려면?</h5>
            <div>
              <span>Table명은 </span>
              <span className="for-primary-color">PascalCase</span>
              <span>로 적어주세요.</span>
            </div>
            <span>Column명은 </span>
            <span className="for-primary-color">snake_case</span>
            <span>로 적어주세요.</span>
            <h5>자세한 내용은 ERD작성방법을 클릭하세요.</h5>
          </div>
          <a
            href="https://github.com/wooobinkim/myini/blob/main/docs/MYINIGuide.md#e-r-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8"
            target="_blank"
            rel="noreferrer"
            className="erd-info-content"
          >
            <span className="erd-info-content">ERD 작성방법</span>
            <FontAwesomeIcon icon={faCircleInfo} className="erd-info-btn" />
          </a>
        </div>
      </section>

      <section className="erd-tool">
        <GenerateVuerd pid={pid} store={store} />
      </section>
      {others
        .filter((user) => user.presence.step === 3)
        .map((user) => (
          <Cursor key={user.id} {...user.presence} />
        ))}
    </div>
  );
}
