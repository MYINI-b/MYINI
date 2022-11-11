/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react';
import MainHeader from 'components/MainHeader';
import ProjectCard from 'components/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { RootState } from 'modules/Reducers';

// types
import { MEMBER } from 'types/main';

// 3rd party
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faOtter } from '@fortawesome/free-solid-svg-icons';

// api
import { getApi, patchApi } from 'api';
import { authAxios } from '../../api/common';

import { Profile } from '../../modules/member';
import CardLogo from '../../assets/card-logo.png';
import './style.scss';

export default function MainPage() {
  const [step, setStep] = useState(0);
  const [jiraEdit, setJiraEdit] = useState(false);
  const [myMember, setMyMember] = useState<MEMBER[]>([]);
  const [jiraMail, setJiraMail] = useState('');
  const [myInfo, setMyInfo] = useState<{
    memberEmail: string;
    memberId: number;
    memberNickname: string;
    memberProfileImg: string;
    projectCount: number;
  }>({
    memberEmail: '',
    memberId: -1,
    memberNickname: '',
    memberProfileImg: '',
    projectCount: 0,
  });

  const onJiraSubmit = useCallback(() => {
    const fetchJiraMail = async () => {
      const myJiraMail = jiraMail;
      await patchApi(`/members/jiraemail`, myJiraMail);
    };
    fetchJiraMail();
    setJiraEdit(false);
  }, []);

  const inputJiraMail = useCallback((e: any) => {
    console.log(e.target.value, '???');
    setJiraMail(e.target.value);
  }, []);

  const dispatch = useDispatch();

  // redux 사용
  const getMyInfo = useSelector((state: RootState) => state.member);
  useEffect(() => {
    const fetchData = async () => {
      await authAxios
        .get('members')
        .then((res: any) => {
          const data = {
            memberEmail: res.data.memberEmail,
            memberId: res.data.memberId,
            memberNickname: res.data.memberNickname,
            memberProfileImg: res.data.memberProfileImg,
            projectCount: res.data.projectCount,
          };
          setMyInfo(data);
          dispatch(
            Profile(
              data.memberEmail,
              data.memberId,
              data.memberNickname,
              data.memberProfileImg,
              data.projectCount,
            ),
          );
        })
        .catch((err) => {
          console.log(err, '에러요');
        });
    };
    fetchData();
    const getMembers = async () => {
      const getMemberData: any = await getApi(`/members/crew`);
      setMyMember(getMemberData.data);
    };
    getMembers();
  }, []);

  return (
    <div className="mainpage-highest-container">
      <MainHeader needStepper={false} step={step} setStep={setStep} />
      <div className="wave-container">
        <div className="wave -one" />
        <div className="wave -two" />
        <div className="wave -three" />
      </div>
      <div className="main-page">
        <span className="user-name">{myInfo.memberNickname}</span>
        <span className="user-ini">`s INI</span>
        <div className="project-info">
          <div className="project-div">
            <h2 className="project-info-title">내 프로젝트 수</h2>
            <h2>{getMyInfo.projectCount} 개</h2>
          </div>
          <div className="project-div1">
            <h2 className="project-info-title">함께 했던 팀원</h2>
            <div className="main-members-container">
              {myMember.map((content, idx) => {
                return (
                  <div key={idx} className="main-member-container">
                    {content === null ? (
                      <div>
                        <span>함께한 팀원이 없습니다.</span>
                      </div>
                    ) : content.memberProfileImg === null ? (
                      <div className="main-member">
                        <div className="main-member-img">
                          <FontAwesomeIcon
                            icon={faOtter}
                            className="member-default-img"
                          />
                        </div>
                        <p className="main-member-name">
                          {content.memberNickname}
                        </p>
                      </div>
                    ) : (
                      <div className="main-member">
                        <img
                          src={content.memberProfileImg}
                          alt=""
                          className="main-member-img"
                        />
                        <p>{content.memberNickname}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="project-jira-div">
            <div className="jira-info-title-container">
              <h2 className="project-jira-info-title">내 Jira 정보</h2>
              {jiraEdit ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="jira-edit-button"
                  onClick={onJiraSubmit}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPen}
                  className="jira-edit-button"
                  onClick={() => setJiraEdit(true)}
                />
              )}
            </div>
            <div className="members">
              <input
                type="email"
                onChange={inputJiraMail}
                placeholder="jira 이메일을 입력해주세요."
                readOnly={!jiraEdit}
                disabled={!jiraEdit}
                required
              />
            </div>
          </div>
        </div>
        <section className="card-container">
          <div className="card-scroll">
            <div className="project-start-container">
              <Link to="/project/new" className="main-link-style">
                <div className="project-start">
                  <img src={CardLogo} alt="" className="card-logo" />
                  <span>새 프로젝트</span>
                </div>
              </Link>
            </div>
            <ProjectCard />
          </div>
        </section>
      </div>
    </div>
  );
}
