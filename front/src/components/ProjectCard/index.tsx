import './style.scss';

import { Link } from 'react-router-dom';

// types
import { PROJECT_LIST } from 'types/main';

// api

interface Props {
  content: PROJECT_LIST;
}
export default function ProjectCard({ content }: Props) {
  return (
    <div className="card">
      <Link to={`/project/${content.projectId}`}>
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
      </Link>
    </div>
  );
}
