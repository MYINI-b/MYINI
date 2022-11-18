import { Dispatch, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSyncedStore } from '@syncedstore/react';
import { globalStore } from 'store/yjsStore';

import './style.scss';

interface Props {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
}

export default function Stepper({ step, setStep }: Props) {
  const navigate = useNavigate();

  const onPrevClick = useCallback(() => {
    if (step > 1) setStep((prev) => prev - 1);
    else if (step === 1) navigate('/main');
  }, [setStep, step, navigate]);

  const onNextClick = useCallback(() => {
    if (step < 5) setStep((prev) => prev + 1);
  }, [setStep, step, navigate]);

  return (
    <section className="main-stepper-container">
      <span className="stepper-arrow left" onClick={onPrevClick} />

      <div className="stepper-step-wrapper">
        <div className="step-div-wrapper">
          <div className={`step-div-container ${step >= 1 && 'on'}`}>
            <div className="step-circle" onClick={() => setStep(1)}>
              1
            </div>
            <p className="step-description" onClick={() => setStep(1)}>
              프로젝트 관리
            </p>
          </div>
          <div className={`step-div-container ${step >= 2 && 'on'}`}>
            <div className="step-circle" onClick={() => setStep(2)}>
              2
            </div>
            <p className="step-description" onClick={() => setStep(2)}>
              요구사항 명세서
            </p>
          </div>
          <div className={`step-div-container ${step >= 3 && 'on'}`}>
            <div className="step-circle" onClick={() => setStep(3)}>
              3
            </div>
            <p className="step-description" onClick={() => setStep(3)}>
              ERD
            </p>
          </div>
          <div className={`step-div-container ${step >= 4 && 'on'}`}>
            <div className="step-circle" onClick={() => setStep(4)}>
              4
            </div>
            <p className="step-description" onClick={() => setStep(4)}>
              API 명세서
            </p>
          </div>
          <div className={`step-div-container ${step >= 5 && 'on'}`}>
            <div className="step-circle" onClick={() => setStep(5)}>
              5
            </div>
            <p className="step-description" onClick={() => setStep(5)}>
              빌드
            </p>
          </div>
        </div>

        <span className="step-bar">
          <span
            className="step-bar-gauge"
            style={{ width: `${(step - 1) * 25}%` }}
          />
        </span>
      </div>
      <span
        className={`stepper-arrow right ${step >= 5 && 'hide'}`}
        onClick={onNextClick}
      />
    </section>
  );
}
