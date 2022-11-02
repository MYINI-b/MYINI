import { Dispatch } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faWrench } from '@fortawesome/free-solid-svg-icons';

interface Props {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
}

export default function Stepper({ step, setStep }: Props) {
  const leftBtnArr = [
    '',
    '',
    '프로젝트관리',
    '요구사항명세서',
    'ERD',
    'API명세서',
  ];
  const rightBtnArr = ['', '요구사항명세서', 'ERD', 'API명세서', '빌드'];
  return (
    <section className="requirement-stepper-container">
      <div className="stepper-btn-wrapper">
        <button type="button" className="stepper-btn">
          {step === 1 ? (
            <FontAwesomeIcon icon={faHouseChimney} key={1} />
          ) : (
            <span className="stepper-arrow left" />
          )}
        </button>
        <p className="stepper-btn-text">{leftBtnArr[step]}</p>
      </div>

      <div className="stepper-step-wrapper">
        <div className="step-div-wrapper">
          <div
            className={`step-div-container ${step >= 1 && 'on'}`}
            onClick={() => setStep(1)}
          >
            <div className="step-circle">1</div>
            <p className="step-description">프로젝트관리</p>
          </div>
          <div
            className={`step-div-container ${step >= 2 && 'on'}`}
            onClick={() => setStep(2)}
          >
            <div className="step-circle">2</div>
            <p className="step-description">요구사항명세서</p>
          </div>
          <div
            className={`step-div-container ${step >= 3 && 'on'}`}
            onClick={() => setStep(3)}
          >
            <div className="step-circle">3</div>
            <p className="step-description">ERD</p>
          </div>
          <div
            className={`step-div-container ${step >= 4 && 'on'}`}
            onClick={() => setStep(4)}
          >
            <div className="step-circle">4</div>
            <p className="step-description">API명세서</p>
          </div>
          <div
            className={`step-div-container ${step >= 5 && 'on'}`}
            onClick={() => setStep(5)}
          >
            <div className="step-circle">5</div>
            <p className="step-description">빌드</p>
          </div>
        </div>

        <span className="step-bar">
          <span
            className="step-bar-gauge"
            style={{ width: `${(step - 1) * 25}%` }}
          />
        </span>
      </div>

      <div className="stepper-btn-wrapper">
        <button type="button" className="stepper-btn">
          {step === 5 ? (
            <FontAwesomeIcon icon={faWrench} key={1} />
          ) : (
            <span className="stepper-arrow right" />
          )}
        </button>
        <p className="stepper-btn-text">{rightBtnArr[step]}</p>
      </div>
    </section>
  );
}
