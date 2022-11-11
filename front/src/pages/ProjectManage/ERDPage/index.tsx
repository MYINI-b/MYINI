// import React, { useLayoutEffect, useState } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { RootState } from 'modules';
import { useSelector } from 'react-redux';
// import Stepper from './Stepper';

// redux
// import { Store } from 'Store';

// components
import GenerateVuerd from './GenerateVuerd';

export default function ERDPage() {
  const { pid } = useSelector((state: RootState) => state.project);

  return (
    <div>
      <div className="erd-container">
        <h1 className="erd-title">ERD</h1>
        <section className="erd-info-section">
          <h3 className="erd-project-title">PROJECT NAME</h3>
          <button className="erd-save-button" type="button">
            <FontAwesomeIcon icon={faSave} />
          </button>
        </section>

        <section className="erd-tool">
          <GenerateVuerd />
        </section>
      </div>
    </div>
  );
}
