import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faCheck,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import useInput from 'hooks/useInput';

export function ProjectMember(props: any) {
  const { member } = props;
  const [memberList, setMemberList] = useState(member);
  const [isEdit, setIsEdit] = useState(false);
  const [userMail, onUserMailChange, setUserMail] = useInput('');

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
  }, []);

  const addMember = useCallback(
    (e: any) => {
      e.preventDefault();
      const copyMembers = [...memberList];
      copyMembers.push({
        id: 1,
        name: '한윤석',
        img: 'https://cdn.pixabay.com/photo/2019/08/02/19/25/vectorart-4380377__340.jpg',
      });
      setMemberList(copyMembers);
      setUserMail('');
    },
    [memberList],
  );

  const deleteMember = useCallback(
    (idx: number) => {
      const deletedMembers = [...memberList].filter(
        (e: any, i: number) => i !== idx,
      );
      setMemberList(deletedMembers);
    },
    [memberList],
  );
  return (
    <>
      <div className="project-detail-title-wrapper normal">
        <div className="project-detail-info-title">팀원관리&nbsp;</div>
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
        {memberList.map((mem: any, i: number) => (
          <div key={i} className="team-member">
            <img className="profile-image" src={mem.img} alt="profile" />
            <div className="profile-name">{mem.name}</div>
            <FontAwesomeIcon
              icon={faUserSlash}
              className="profile-delete-button"
              onClick={() => deleteMember(i)}
            />
          </div>
        ))}
      </form>
    </>
  );
}
