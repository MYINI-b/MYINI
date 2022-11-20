import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faCheck,
  faUserPlus,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { deleteApi, getApi, postApi } from 'api';
import TimerModal from 'components/TimerModal';

interface Props {
  store: any;
  pid: string;
  editProjectInfo: () => Promise<void>;
}

export default function ProjectMember({ store, pid, editProjectInfo }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [userMail, setUserMail] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [alertText, setAlertText] = useState('');

  const onSubmitClick = useCallback(async () => {
    const resp = await postApi(`/projects/${pid}/members/${userMail}`);
    setIsEdit(false);
    setUserMail('');
  }, []);

  const onUserMailChange = useCallback(async (e: any) => {
    setUserMail(e.target.value);
    const body = {
      memberEmail: e.target.value,
    };
    const { data }: any = await postApi(`/projects/members`, body);
    setSearchResult(data);
    setUserMail(e.target.value);
  }, []);

  const addMember = useCallback(
    async (mem: any) => {
      if (store.pjt.members === undefined) store.pjt.members = [];

      const addResp: any = await postApi(
        `/projects/${pid}/members/${mem.memberId}`,
      );

      if (addResp.status === 201) {
        const copyMem = {
          id: mem.memberId,
          img: mem.memberProfileImg,
          name: mem.memberNickName,
          email: mem.memberEmail,
          nickname: mem.memberNickName,
        };
        store.pjt.members.push(copyMem);
        setAlertText('팀원으로 추가되었습니다!');
      } else {
        setAlertText('팀원 추가중 에러 발생!');
        return;
      }

      setUserMail('');
    },
    [store, userMail],
  );

  const deleteMember = useCallback(
    async (idx: number, mid: number) => {
      store.pjt.members.splice(idx, 1);
      await deleteApi(`/projects/${pid}/members/${mid}`);
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

      <div className="member-scroll">
        {isEdit && (
          <input
            type="text"
            className="member-search-input"
            placeholder="E-mail을 입력해주세요."
            onChange={onUserMailChange}
            value={userMail}
          />
        )}
        {userMail === ''
          ? store.pjt.members &&
            store.pjt.members.map((mem: any, i: number) => (
              <div key={i} className="team-member">
                <img className="profile-image" src={mem.img} alt="profile" />
                <div className="profile-name">{mem.name}</div>
                <FontAwesomeIcon
                  icon={faUserSlash}
                  className={`profile-delete-button ${!isEdit && 'hidden'}`}
                  onClick={() => deleteMember(i, mem.id)}
                />
              </div>
            ))
          : searchResult.map((mem: any, i: number) => (
              <div key={i} className="team-member">
                <img
                  className="profile-image"
                  src={mem.memberProfileImg}
                  alt="profile"
                />
                <div className="profile-name">{mem.memberNickName}</div>
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className={`profile-delete-button ${!isEdit && 'hidden'}`}
                  onClick={() => addMember(mem)}
                />
              </div>
            ))}
      </div>
      {!!alertText && <TimerModal text={alertText} setText={setAlertText} />}
    </>
  );
}
