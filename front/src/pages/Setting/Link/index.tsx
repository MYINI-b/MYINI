import './style.scss';
import { useState, useCallback } from 'react';
import { LINK_LIST } from 'constants/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import LinkRow from './LinkRow';

export function ProjectLink(props: any) {
  // const { gitlink, notionlink, jiralink, figmalink } = props;
  const [isEdit, setIsEdit] = useState(true);
  const [gitLink, setGitLink] = useState('asdsad');
  const [jiraLink, setJiraLink] = useState('');
  const [notionLink, setNotionLink] = useState('');
  const [figmaLink, setFigmaLink] = useState('');

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
  }, []);

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
        <LinkRow
          img={LINK_LIST[0].img}
          link={gitLink}
          setLink={setGitLink}
          isEdit={isEdit}
        />
        <LinkRow
          img={LINK_LIST[1].img}
          link={jiraLink}
          setLink={setJiraLink}
          isEdit={isEdit}
        />
        <LinkRow
          img={LINK_LIST[2].img}
          link={notionLink}
          setLink={setNotionLink}
          isEdit={isEdit}
        />
        <LinkRow
          img={LINK_LIST[3].img}
          link={figmaLink}
          setLink={setFigmaLink}
          isEdit={isEdit}
        />
      </ul>
    </div>
  );
}
