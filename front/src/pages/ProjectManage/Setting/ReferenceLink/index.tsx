import './style.scss';
import React, { useState, useCallback, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import LinkRow from './LinkRow';

interface Props {
  gitLink: string;
  setGitLink: React.Dispatch<React.SetStateAction<string>>;
  jiraLink: string;
  setJiraLink: React.Dispatch<React.SetStateAction<string>>;
  notionLink: string;
  setNotionLink: React.Dispatch<React.SetStateAction<string>>;
  figmaLink: string;
  setFigmaLink: React.Dispatch<React.SetStateAction<string>>;
  store: any;
}

export default function ReferenceLink({
  gitLink,
  setGitLink,
  jiraLink,
  setJiraLink,
  notionLink,
  setNotionLink,
  figmaLink,
  setFigmaLink,
  store,
}: Props) {
  // const { gitlink, notionlink, jiralink, figmalink } = props;
  const [isEdit, setIsEdit] = useState(false);

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
  }, []);

  useEffect(() => {
    setGitLink(store.pjt.gitLink);
  }, [store.pjt.gitLink]);

  useEffect(() => {
    setJiraLink(store.pjt.jiraLink);
  }, [store.pjt.jiraLink]);

  useEffect(() => {
    setNotionLink(store.pjt.notionLink);
  }, [store.pjt.notionLink]);

  useEffect(() => {
    setFigmaLink(store.pjt.figmaLink);
  }, [store.pjt.figmaLink]);

  return (
    <div className="project-link">
      <div className="project-detail-info-title">
        링크관리&nbsp;
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
        <LinkRow idx={0} link={gitLink} store={store} isEdit={isEdit} />
        <LinkRow idx={1} link={jiraLink} isEdit={isEdit} store={store} />
        <LinkRow idx={2} link={notionLink} store={store} isEdit={isEdit} />
        <LinkRow idx={3} link={figmaLink} store={store} isEdit={isEdit} />
      </ul>
    </div>
  );
}
