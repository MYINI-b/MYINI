import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useCallback, useEffect } from 'react';
import './style.scss';

interface Props {
  store: any;
  editProjectInfo: () => Promise<void>;
}
export default function DetailInfo({ store, editProjectInfo }: Props) {
  const [isEdit, setIsEdit] = useState(false);

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
    editProjectInfo();
  }, []);

  const onDescChange = useCallback(
    (e: any) => {
      store.pjt.desc = e.target.value;
    },
    [store],
  );

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
        value={store.pjt.desc || ''}
        onChange={onDescChange}
        disabled={!isEdit}
        placeholder="프로젝트 설명을 작성해주세요!"
      />
    </div>
  );
}
