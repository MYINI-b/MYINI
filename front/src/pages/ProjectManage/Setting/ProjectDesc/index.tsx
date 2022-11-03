import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useCallback, Dispatch, useEffect } from 'react';
import './style.scss';

interface Props {
  desc: string;
  setDesc: Dispatch<React.SetStateAction<string>>;
  store: any;
}
export default function DetailInfo({ desc, setDesc, store }: Props) {
  const [isEdit, setIsEdit] = useState(false);

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
  }, []);

  const onDescChange = useCallback(
    (e: any) => {
      store.pjt.desc = e.target.value;
    },
    [store],
  );

  useEffect(() => {
    if (store.pjt.desc !== undefined) setDesc(store.pjt.desc);
  }, [store.pjt.desc]);

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
