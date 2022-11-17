import { Dispatch, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';
import Stepper from 'components/Stepper';

// redux
import { useSelector } from 'react-redux';

// 3rd party
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOtter } from '@fortawesome/free-solid-svg-icons';
import { RootState } from 'modules/Reducers';

interface Props {
  needStepper: boolean;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function MainHeader({ needStepper, step, setStep }: Props) {
  const navigate = useNavigate();

  const myProfile: any = useSelector(
    (state: RootState) => state.member.memberProfileImg,
  );

  // logout func
  const getLogout = () => {
    window.localStorage.removeItem('accessToken');
    alert('정상적으로 로그아웃되었습니다.');
    navigate('/');
  };

  // TODO: tokencheck
  // const checkToken = () => {
  //   if (
  //     localStorage.getItem('accessToken') === null ||
  //     localStorage.getItem('accessToken') === undefined
  //   ) {
  //     navigate('/');
  //   }
  // };
  // checkToken();

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
          {myProfile === null ? (
            <div className="profile-default-img">
              <FontAwesomeIcon icon={faOtter} />
            </div>
          ) : (
            <div className="profile-google-img">
              <img src={myProfile} alt="" className="profile-google-img-url" />
            </div>
          )}
        </div>
        <div className="dropdown-content">
          <Link to="/main">
            <p>홈</p>
          </Link>
          <a href="https://k7b203.p.ssafy.io/" target="_blank" rel="noreferrer">
            <p>공식홈페이지</p>
          </a>
          <p onClick={getLogout}>로그아웃</p>
        </div>
      </div>
    </div>
  );
}
