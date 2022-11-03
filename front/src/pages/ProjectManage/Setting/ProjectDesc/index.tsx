import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useCallback } from 'react';
import './style.scss';

interface Props {
  desc: string;
  onDescChange: (e: any) => void;
}
export default function DetailInfo({ desc, onDescChange }: Props) {
  const [isEdit, setIsEdit] = useState(false);

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
  }, []);
  return (
    <div className="detail-info">
      <div className="project-detail-title-wrapper normal">
        <div className="project-detail-info-title">프로젝트 설명&nbsp;</div>
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

      <textarea
        className={`project-info-desc ${isEdit && 'edit'}`}
        value={desc}
        onChange={onDescChange}
        disabled={!isEdit}
      />
    </div>
  );
}
