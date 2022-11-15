import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useCallback } from 'react';
import { deleteApi, getApi } from 'api';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

// types
import { MEMBER } from 'types/main';

function MemberModal({ modalMemberClose }: { modalMemberClose: any }) {
  const [memberList, setMemberList] = useState<MEMBER[]>([]);

  useEffect(() => {
    const fetchMember = async () => {
      const getMemberDatas: any = await getApi(`/members/crew`);
      setMemberList(getMemberDatas.data);
    };
    fetchMember();
  }, []);

  const onCloseModal = (e: any) => {
    if (e.target === e.currentTarget) {
      modalMemberClose();
    }
  };

  return (
    <div className="modal-pjt-container" onClick={onCloseModal}>
      <div className="modal-pjt-detail">
        <div className="modal-pjt-button-wrapper">
          <FontAwesomeIcon
            icon={faXmark}
            className="modal-pjt-button-close"
            onClick={modalMemberClose}
          />
        </div>
        <div className="modal-pjt-title">
          <h2>함께한 팀원</h2>
        </div>
        <div className="modal-pjt-content">
          {memberList.map((content) => {
            return (
              <div key={content.memberId} className="modal-pjt-content-detail">
                <span>{content.memberNickname}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MemberModal;
