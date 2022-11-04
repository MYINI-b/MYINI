/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import axios from 'axios';
import MainHeader from 'components/MainHeader';
import ProjectCard from 'components/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'modules';
import { authAxios, getMemberAxios } from '../../api/common';
import { Profile } from '../../modules/member';
import CardLogo from '../../assets/card-logo.png';
import './style.scss';

export default function MainPage() {
  const [step, setStep] = useState(0);

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

  const [myMember, setMyMember] = useState<any>([]);

  const dispatch = useDispatch();

  const getMyInfo = useSelector((state: RootState) => state.member);
  useEffect(() => {
    const fetchData = async () => {
      await authAxios
        .get('members')
        .then((res) => {
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
      await getMemberAxios('/members/crew');
    };
    getMembers();
    console.log(getMembers, 'asdasd');
    // setMyMember(getMemberAxios(url));
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
            <div className="members">
              <div className="member" />
            </div>
          </div>
        </div>
        <section className="card-container">
          <div className="card-scroll">
            <div className="project-start-container">
              <Link to="/projectmanage" className="main-link-style">
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
