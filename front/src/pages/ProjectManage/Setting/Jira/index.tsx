import { LINK_LIST } from 'constants/index';
import { useState } from 'react';
import Modal from '../Modal';
import './style.scss';

interface Props {
  store: any;
  pid: string;
  editJiraInfo: () => Promise<void>;
}

export default function ProjectJira({ store, pid, editJiraInfo }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <div className="project-detail-jira">
        <div className="project-detail-jira-title">지라관리&nbsp;</div>
        <img
          className="project-detail-jira-image-icon"
          src={LINK_LIST[1].img}
          onClick={modalClose}
          alt="git"
        />
        {modalOpen && (
          <Modal
            store={store}
            pid={pid}
            modalClose={modalClose}
            editJiraInfo={editJiraInfo}
          />
        )}
      </div>
      <div className="project-select-jira">{store.pjt.jiraProjectName}</div>
    </>
  );
}
