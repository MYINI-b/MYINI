import './style.scss';
import React, { useState, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import LinkRow from './LinkRow';

interface Props {
  store: any;
}

export default function ReferenceLink({ store }: Props) {
  // const { gitlink, notionlink, jiralink, figmalink } = props;
  const [isEdit, setIsEdit] = useState(false);

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
  }, []);

  return (
    <div className="project-link">
      <div className="project-detail-info-title">
        링크 관리&nbsp;
        {isEdit ? (
          <FontAwesomeIcon
            icon={faCheck}
            className="project-edit-button"
            onClick={onSubmitClick}
          />
        ) : (
          <FontAwesomeIcon
            icon={faPen}
            className="project-edit-button"
            onClick={() => setIsEdit(true)}
          />
        )}
      </div>
      <ul className="link-list-ul">
        <LinkRow
          idx={0}
          link={store.pjt.gitLink || ''}
          store={store}
          isEdit={isEdit}
        />
        <LinkRow
          idx={1}
          link={store.pjt.jiraLink || ''}
          isEdit={isEdit}
          store={store}
        />
        <LinkRow
          idx={2}
          link={store.pjt.notionLink || ''}
          store={store}
          isEdit={isEdit}
        />
        <LinkRow
          idx={3}
          link={store.pjt.figmaLink || ''}
          store={store}
          isEdit={isEdit}
        />
      </ul>
    </div>
  );
}
