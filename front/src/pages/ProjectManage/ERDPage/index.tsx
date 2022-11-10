import React, { useLayoutEffect, useState } from 'react';
import './style.scss';

import { RootState } from 'modules/Reducers';

// redux
import { useSelector } from 'react-redux';

// components
import GenerateVuerd from './GenerateVuerd';

export default function ERDPage() {
  const [erdData, setErdData] = useState({});

  const asd = useSelector((state: RootState) => state.vuerd);
  useLayoutEffect(() => {
    // setErdData();
  });

  return (
    <div>
      <div className="erd-container">
        <h1 className="erd-title">ERD</h1>
        <section className="erd-info-section">
          <h3 className="erd-project-title">PROJECT NAME</h3>
        </section>

        <section className="erd-tool">
          <GenerateVuerd />
        </section>
      </div>
    </div>
  );
}
