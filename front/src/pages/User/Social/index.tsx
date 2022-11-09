/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Social() {
  const token = useLocation().search.split('=')[1];
  useEffect(() => {
    localStorage.setItem('accessToken', token);
    window.location.href = '/main';
  }, []);

  return <div />;
}
