/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useSyncedStore } from '@syncedstore/react';
import moment from 'moment';
import { globalStore } from 'store/yjsStore';
import { USER } from 'types/Setting';
import ImageTitle from './ImageTitle';
import ProjectDesc from './ProjectDesc/index';
import Period from './Period/index';
import ReferenceLink from './ReferenceLink';
import ProjectMember from './Member/index';
import './style.scss';

export default function SettingPage() {
  const store = useSyncedStore(globalStore);

  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');
  const [startDay, setStartDay] = useState(
    moment(new Date()).format('YYYY/MM/DD'),
  );
  const [endDay, setEndDay] = useState(moment(new Date()).format('YYYY/MM/DD'));
  const [gitLink, setGitLink] = useState('');
  const [jiraLink, setJiraLink] = useState('');
  const [notionLink, setNotionLink] = useState('');
  const [figmaLink, setFigmaLink] = useState('');
  const [memberList, setMemberList] = useState<USER[]>([]);

  return (
    <div className="setting-page">
      <div className="setting-components">
        <ImageTitle
          img={img}
          setImg={setImg}
          title={title}
          setTitle={setTitle}
          store={store}
        />
        <div className="bottom-side">
          <div className="left-side">
            <ProjectDesc desc={desc} setDesc={setDesc} store={store} />
            <Period
              store={store}
              startDay={startDay}
              setStartDay={setStartDay}
              endDay={endDay}
              setEndDay={setEndDay}
            />
            <ReferenceLink
              gitLink={gitLink}
              setGitLink={setGitLink}
              jiraLink={jiraLink}
              setJiraLink={setJiraLink}
              notionLink={notionLink}
              setNotionLink={setNotionLink}
              figmaLink={figmaLink}
              setFigmaLink={setFigmaLink}
              store={store}
            />
          </div>
          <div className="right-side">
            <ProjectMember
              memberList={memberList}
              setMemberList={setMemberList}
              store={store}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
