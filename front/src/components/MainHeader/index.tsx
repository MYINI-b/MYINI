import { Dispatch, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';
import Stepper from 'components/Stepper';

// types
import { MY_INFO } from 'types/main';

// 3rd party
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOtter } from '@fortawesome/free-solid-svg-icons';

interface Props {
  needStepper: boolean;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function MainHeader({ needStepper, step, setStep }: Props) {
  const navigate = useNavigate();

  // logout func
  const getLogout = () => {
    window.localStorage.removeItem('accessToken');
    navigate('/');
    console.log(localStorage, 'local');
  };

  // TODO: tokencheck
  const checkToken = () => {
    if (
      localStorage.getItem('accessToken') === null ||
      localStorage.getItem('accessToken') === undefined
    ) {
      navigate('/');
    }
  };
  checkToken();

  useEffect(() => {}, []);

  return (
    <div className="main-header">
      <span className="empty-space" />
      {needStepper ? (
        <Stepper step={step} setStep={setStep} />
      ) : (
        <span className="empty-space" />
      )}
      <div className="dropdown">
        <div>
          <div className="profile-img" />
        </div>
        <div className="dropdown-content">
          <Link to="/main">
            <p>홈</p>
          </Link>
          <p onClick={getLogout}>로그아웃</p>
        </div>
      </div>
    </div>
  );
}
