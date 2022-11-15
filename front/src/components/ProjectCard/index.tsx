import './style.scss';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';

// types
import { PROJECT_LIST } from 'types/main';

// api

interface Props {
  content: PROJECT_LIST;
}
export default function ProjectCard({ content }: Props) {
  const goProjectSetting = useCallback(() => {
    window.location.href = `/project/${content.projectId}`;
  }, []);
  return (
    <div className="card" onClick={goProjectSetting}>
      <div className="card-header">
        <div className="card-header-title">{content.projectName}</div>
        <div>{content.projectId}</div>
      </div>
      <div className="card-body">
        <div className="card-body-header">
          <h1>{content.projectName}</h1>
        </div>
        <div className="card-body-context">
          {content.projectDescription}
          <div className="members">
            <div className="member" />
            <div className="member" />
            <div className="member" />
          </div>
        </div>
      </div>
    </div>
  );
}
