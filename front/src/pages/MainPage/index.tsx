/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import MainHeader from 'components/MainHeader';
import ProjectCard from 'components/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { RootState } from 'modules/Reducers';

// types
import { MEMBER } from 'types/main';

// 3rd party
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faOtter,
  faFolderOpen,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';

// api
import { getApi } from 'api';
import Modal from './Modal';
import MemberModal from './MemberModal';
import JiraModal from './JiraModal';
import { authAxios } from '../../api/common';

import { Profile } from '../../modules/member';
import CardLogo from '../../assets/card-logo.png';
import './style.scss';

export default function MainPage() {
  const [step, setStep] = useState(0);
  const [myMember, setMyMember] = useState<MEMBER[]>([]);
  const [myInfo, setMyInfo] = useState<{
    memberEmail: string;
    memberId: number;
    memberNickname: string;
    memberProfileImg: string;
    projectCount: number;
    memberJiraEmail: string;
  }>({
    memberEmail: '',
    memberId: -1,
    memberNickname: '',
    memberProfileImg: '',
    projectCount: 0,
    memberJiraEmail: '',
  });

  // <=== modal open function
  const [pjtModalOpen, setPjtModalOpen] = useState(false);
  const modalClose = () => {
    setPjtModalOpen(!pjtModalOpen);
  };

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const modalMemberClose = () => {
    setMemberModalOpen(!memberModalOpen);
  };

  const [jiraModalOpen, setJiraModalOpen] = useState(false);
  const modalJiraClose = () => {
    setJiraModalOpen(!jiraModalOpen);
  };
  // ===> modal open function
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
            memberJiraEmail: res.data.memberJiraEmail,
          };
          setMyInfo(data);
          dispatch(
            Profile(
              data.memberEmail,
              data.memberId,
              data.memberNickname,
              data.memberProfileImg,
              data.projectCount,
              data.memberJiraEmail,
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
          <div className="main-project-div">
            <div className="project-title-div">
              <h2 className="project-info-title">내 프로젝트 수</h2>
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="projects-detail-btn"
                onClick={modalClose}
              />
              {pjtModalOpen && <Modal modalClose={modalClose} />}
            </div>
            <h2>{getMyInfo.projectCount} 개</h2>
          </div>
          <div className="project-div1">
            <div className="project-div1-title">
              <h2 className="project-info-title">함께 했던 팀원</h2>
              <FontAwesomeIcon
                icon={faAddressBook}
                className="projects-detail-btn"
                onClick={modalMemberClose}
              />
              {memberModalOpen && (
                <MemberModal modalMemberClose={modalMemberClose} />
              )}
            </div>
            <div className="main-members-container">
              {myMember.map((content: any, idx: number) => {
                return (
                  <div key={idx} className="main-member-container">
                    {content === null ? (
                      <div>
                        <span>함께한 팀원이 없습니다.</span>
                      </div>
                    ) : (
                      <div className="main-member" key={idx}>
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="project-jira-div">
            <div className="jira-info-title-container">
              <h2 className="project-jira-info-title">내 Jira 정보</h2>
              <FontAwesomeIcon
                icon={faPen}
                className="jira-edit-button"
                onClick={modalJiraClose}
              />
              {jiraModalOpen && <JiraModal modalJiraClose={modalJiraClose} />}
            </div>
            <div className="project-jira-info-content">
              {myInfo.memberJiraEmail === '' ? (
                <h4>jira 이메일을 입력해주세요.</h4>
              ) : (
                <h4>{myInfo.memberJiraEmail}</h4>
              )}
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
            <div className="main-project-cards">
              <ProjectCard />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
