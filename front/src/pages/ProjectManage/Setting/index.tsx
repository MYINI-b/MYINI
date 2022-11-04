/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSyncedStore } from '@syncedstore/react';
import { globalStore } from 'store/yjsStore';
import ImageTitle from './ImageTitle';
import ProjectDesc from './ProjectDesc/index';
import Period from './Period/index';
import ReferenceLink from './ReferenceLink';
import ProjectMember from './Member/index';
import './style.scss';

export default function SettingPage() {
  const store = useSyncedStore(globalStore);

  return (
    <div className="setting-page">
      <div className="setting-components">
        <ImageTitle store={store} />
        <div className="bottom-side">
          <div className="left-side">
            <ProjectDesc store={store} />
            <Period store={store} />
            <ReferenceLink store={store} />
          </div>
          <div className="right-side">
            <ProjectMember store={store} />
          </div>
        </div>
      </div>
    </div>
  );
}
