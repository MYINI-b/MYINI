import React, { useLayoutEffect, useEffect, useState } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';

// import Stepper from './Stepper';

import { RootState } from 'modules/Reducers';

// redux
import { useSelector } from 'react-redux';

// components
import GenerateVuerd from './GenerateVuerd';

interface Props {
  pid: string;
  store: any;
}
export default function ERDPage({ pid, store }: Props) {
  return (
    <div>
      <div className="erd-container">
        <h1 className="erd-title">ERD</h1>
        <section className="erd-info-section">
          <h3 className="erd-project-title">{store && store.pjt.title}</h3>
        </section>

        <section className="erd-tool">
          <GenerateVuerd pid={pid} store={store} />
        </section>
      </div>
    </div>
  );
}
