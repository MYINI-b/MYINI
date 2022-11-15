import { useEffect, useState } from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

// 3rd party
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// types
import { PROJECT_LIST } from 'types/main';

// api
import { getApi, deleteApi } from 'api';

export default function ProjectCard() {
  const [myProjectList, getMyProject] = useState<PROJECT_LIST[]>([]);

  const deletePjt = async (pid: any) => {
    const deletePjtData: any = await deleteApi(`projects/${pid}`);
    deletePjtData();
  };

  useEffect(() => {
    const fetchProject = async () => {
      const getProjectDatas: any = await getApi(`/projects`);
      getMyProject(getProjectDatas.data);
    };
    fetchProject();
  }, [deletePjt]);

  return (
    <>
      {myProjectList.map((content, idx) => {
        return (
          <div key={idx} className="card">
            <Link to={`/project/${content.projectId}`} className="card-link">
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
            </Link>
            <div className="card-body">
              <Link to={`/project/${content.projectId}`} className="card-link">
                <div className="card-body-header">
                  <h1>{content.projectName}</h1>
                </div>
              </Link>
              <div className="card-body-context">
                {content.projectDescription}
              </div>
              <div className="card-body-footer">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deletePjt(content.projectId)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
