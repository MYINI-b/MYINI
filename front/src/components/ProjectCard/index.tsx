import './style.scss';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

// types
import { PROJECT_LIST } from 'types/main';

// api
import { getApi, deleteApi } from 'api';

// 3rd party
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {
  content: PROJECT_LIST;
}
export default function ProjectCard({ content }: Props) {
  const deletePjt = async (pid: any) => {
    const deletePjtData: any = await deleteApi(`projects/${pid}`);
    deletePjtData();
  };
  const goProjectSetting = useCallback(() => {
    window.location.href = `/project/${content.projectId}`;
  }, []);
  return (
    <div className="card" onClick={goProjectSetting}>
      <div className="card-header">
        {content.projectImg === null ? (
          <img
            src="https://picsum.photos/id/522/300"
            alt=""
            className="card-background-img"
          />
        ) : (
          <img
            src={`https://myini.s3.ap-northeast-2.amazonaws.com/projectProfile/${content.projectImg}`}
            alt=""
            className="card-background-img"
          />
        )}
        <div className="card-header-title">{content.projectName}</div>
      </div>
      <div className="card-body">
        <div className="card-body-header">
          <h1>{content.projectName}</h1>
        </div>
        <div className="card-body-context">{content.projectDescription}</div>
        <div className="card-body-footer">
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deletePjt(content.projectId)}
            className="card-body-delete"
          />
        </div>
      </div>
    </div>
  );
}
