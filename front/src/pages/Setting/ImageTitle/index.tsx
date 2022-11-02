import { faPen, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useCallback } from 'react';
import './style.scss';

interface Props {
  img: string;
  title: string;
  onTitleChange: (e: any) => void;
}

export default function ProjectImage({ img, title, onTitleChange }: Props) {
  const [isEdit, setIsEdit] = useState(false);

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
  }, []);

  return (
    <div className="title-img">
      <img className="profile-image" src={img} alt="profile" />
      <div className="project-info-container">
        <div className="project-edit-button-wrapper">
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
        <div className="project-detail-container">
          <div className="project-detail-info-title">프로젝트명</div>
          <input
            type="text"
            value={title}
            className={`project-detail-title ${isEdit && 'edit'}`}
            onChange={onTitleChange}
            readOnly={!isEdit}
            disabled={!isEdit}
          />
        </div>
      </div>
    </div>
  );
}
