/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Social() {
  const token = useLocation().search.split('=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('accessToken', token);
    const isApp = localStorage.getItem('isApp');

    if (isApp === 'true') window.location.href = '/main';
    else window.location.href = 'https://k7b203.p.ssafy.io/';
  }, []);

  return <div />;
}
