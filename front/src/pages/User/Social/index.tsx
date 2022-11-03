/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_TOKEN } from 'reducers/Auth';
import { authAxios } from '../../../api/common';

export default function Social() {
  const token = useLocation().search.split('=')[1];

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(SET_TOKEN(token));
    const saveToken = localStorage.setItem('accessToken', token);

    authAxios.get('/members').then((res) => {
      console.log(res, 'res');
    });
  });

  return <div />;
}
