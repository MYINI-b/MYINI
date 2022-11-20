/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// dasfasdfsdf&token=accesstoeknasdfsdfasdf&appFlag=true
export default function Social() {
  const token = useLocation().search.split('=')[1];
  // const appFlag = useLocation().search.split('appFlag=')[1];

  useEffect(() => {
    localStorage.setItem('accessToken', token);
    window.location.href = '/main';
    // // 어플리케이션에서 클릭했을 때
    // if (appFlag === 'true') window.location.href = '/main';
    // // 마이크로페이지에서 클릭했을 때
    // else {
    //   window.location.href = 'https://k7b203.p.ssafy.io/';
    // }
  }, []);

  return <div />;
}
