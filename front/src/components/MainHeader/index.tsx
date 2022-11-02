import { Dispatch, useState } from 'react';
import './style.scss';
import Stepper from 'components/Stepper';

interface Props {
  needStepper: boolean;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function MainHeader({ needStepper, step, setStep }: Props) {
  return (
    <div className="main-header">
      <span className="empty-space" />
      {needStepper ? (
        <Stepper step={step} setStep={setStep} />
      ) : (
        <span className="empty-space" />
      )}
      <div className="dropdown">
        <div className="profile-img" />
        <div className="dropdown-content">
          <p>홈</p>
          <p>로그아웃</p>
        </div>
      </div>
    </div>
  );
}
