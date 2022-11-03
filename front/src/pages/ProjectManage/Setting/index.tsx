/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState } from 'react';
import useInput from 'hooks/useInput';
import ImageTitle from './ImageTitle';
import ProjectDesc from './ProjectDesc/index';
import { ProjectPeriod } from './Period/index';
import { ProjectLink } from './Link/index';
import { ProjectMember } from './Member/index';
import MockData from './mock.json';
import './style.scss';

export default function SettingPage() {
  const data = useMemo(() => MockData[0], []);
  const [img, setImg] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [title, onTitleChange] = useInput('');
  const [desc, onDescChange] = useInput('');
  const Props = {
    id: data.id,
    // img: data.img,
    // title: data.title,
    period: data.period,
    jiralink: data.jiralink,
    notionlink: data.notionlink,
    gitlink: data.gitlink,
    figmalink: data.figmalink,
    detailinfo: data.detailinfo,
    member: data.member,
  };

  return (
    <div className="setting-page">
      <div className="setting-components">
        <ImageTitle
          img={img}
          setImg={setImg}
          title={title}
          onTitleChange={onTitleChange}
        />
        <div className="bottom-side">
          <div className="left-side">
            <ProjectDesc desc={desc} onDescChange={onDescChange} />
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
