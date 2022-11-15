import { useOthers, useUpdatePresence } from '@y-presence/react';
import { UserPresence } from 'types/main';
import React from 'react';
import './style.scss';
import { Cursor } from 'components/Cursor';

// components
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
