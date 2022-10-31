/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { ProjectImage } from './ImageTitle/index';
import { DetailInfo } from './ProjectDetail/index';
import { ProjectPeriod } from './Period/index';
import { ProjectLink } from './Link/index';
import { ProjectMember } from './Member/index';
import MockData from './mock.json';
import './style.scss';

export default function SettingPage() {
  const data = useMemo(() => MockData[0], []);
  const Props = {
    id: data.id,
    img: data.img,
    title: data.title,
    period: data.period,
    jiralink: data.jiralink,
    notionlink: data.notionlink,
    gitlink: data.gitlink,
    figmalink: data.figmalink,
    detailinfo: data.detailinfo,
    member: data.member,
  };
  // console.log(data);
  const [need, setNeed] = useState('');
  axios
    .get('https://k7b203.p.ssafy.io/api/erds/relationitem')
    // 성공시 then 실행
    .then(function (response) {
      console.log(response);
    })
    // 실패 시 catch 실행
    .catch(function (error) {
      console.log(error);
      setNeed(error.response.data.message);
    })
    // 성공이던 실패던 항상 실행
    .then(function () {
      // always executed
    });
  return (
    <div className="setting-page">
      <div className="setting-components">
        <Link to="/" className="INI">
          home
        </Link>
        <div>{need}</div>
        <div className="top-side">
          <ProjectImage {...Props} className="project-image" />
        </div>
        <div className="bottom-side">
          <div className="left-side">
            <DetailInfo {...Props} className="detail-info" />
            <ProjectPeriod {...Props} className="project-period" />
            <ProjectLink {...Props} className="project-link" />
          </div>
          <div className="right-side">
            <ProjectMember {...Props} className="project-member" />
          </div>
        </div>
      </div>
    </div>
  );
}
