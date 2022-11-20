/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Social() {
  const token = useLocation().search.split('=')[1];

  useEffect(() => {
    localStorage.setItem('accessToken', token);
    const isApp = localStorage.getItem('isApp');

    alert(isApp);
    // 어플리케이션에서 클릭했을 때
    if (isApp === 'true') window.location.href = '/main';
    // 마이크로페이지에서 클릭했을 때
    else {
      window.location.href = 'https://k7b203.p.ssafy.io/';
    }
  }, []);

  return <div />;
}
