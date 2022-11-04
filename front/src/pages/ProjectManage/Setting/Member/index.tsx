import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faCheck,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import useInput from 'hooks/useInput';

interface Props {
  store: any;
}

export default function ProjectMember({ store }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [userMail, onUserMailChange, setUserMail] = useInput('');

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
    setUserMail('');
  }, []);

  const addMember = useCallback(
    (e: any) => {
      e.preventDefault();
      if (store.pjt.members === undefined) store.pjt.members = [];
      store.pjt.members.push({
        id: 1,
        name: userMail,
        img: 'https://cdn.pixabay.com/photo/2019/08/02/19/25/vectorart-4380377__340.jpg',
      });
      setUserMail('');
    },
    [store, userMail],
  );

  const deleteMember = useCallback(
    (idx: number) => {
      store.pjt.members.splice(idx, 1);
    },
    [store],
  );

  return (
    <>
      <div className="project-detail-title-wrapper normal">
        <div className="project-detail-info-title">팀원 관리&nbsp;</div>
        {isEdit ? (
          <FontAwesomeIcon
            icon={faCheck}
            className="project-edit-button"
            onClick={onSubmitClick}
          />
        ) : (
          <FontAwesomeIcon
            icon={faGear}
            className="project-edit-button"
            onClick={() => setIsEdit(true)}
          />
        )}
      </div>

      <form className="member-scroll" onSubmit={addMember}>
        {isEdit && (
          <input
            type="text"
            className="member-search-input"
            placeholder="E-mail을 입력해주세요."
            onChange={onUserMailChange}
            value={userMail}
          />
        )}
        {store.pjt.members &&
          store.pjt.members.map((mem: any, i: number) => (
            <div key={i} className="team-member">
              <img className="profile-image" src={mem.img} alt="profile" />
              <div className="profile-name">{mem.name}</div>
              <FontAwesomeIcon
                icon={faUserSlash}
                className={`profile-delete-button ${!isEdit && 'hidden'}`}
                onClick={() => deleteMember(i)}
              />
            </div>
          ))}
      </form>
    </>
  );
}
