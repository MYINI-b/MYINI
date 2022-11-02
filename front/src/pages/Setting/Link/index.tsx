import './style.scss';
import { useState } from 'react';
import { LINK_LIST } from 'constants/index';
import LinkRow from './LinkRow';

export function ProjectLink(props: any) {
  // const { gitlink, notionlink, jiralink, figmalink } = props;
  const [gitLink, setGitLink] = useState('asdsad');
  const [jiraLink, setJiraLink] = useState('');
  const [notionLink, setNotionLink] = useState('');
  const [figmaLink, setFigmaLink] = useState('');

  return (
    <div className="project-link">
      <div className="project-detail-info-title">링크관리</div>
      <ul className="link-list-ul">
        <LinkRow img={LINK_LIST[0].img} link={gitLink} setLink={setGitLink} />
        <LinkRow img={LINK_LIST[1].img} link={jiraLink} setLink={setJiraLink} />
        <LinkRow
          img={LINK_LIST[2].img}
          link={notionLink}
          setLink={setNotionLink}
        />
        <LinkRow
          img={LINK_LIST[3].img}
          link={figmaLink}
          setLink={setFigmaLink}
        />
      </ul>
    </div>
  );
}
