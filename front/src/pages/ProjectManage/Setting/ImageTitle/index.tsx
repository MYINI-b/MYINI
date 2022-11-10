import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import './style.scss';
import DefaultProfile from 'assets/default-profile.png';

interface Props {
  store: any;
  pid: string;
  editProjectInfo: () => Promise<void>;
}

export default function ProjectImage({ store, pid, editProjectInfo }: Props) {
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isEdit, setIsEdit] = useState(false);

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
    editProjectInfo();
  }, [editProjectInfo]);

  const onTitleChange = useCallback(
    (e: any) => {
      store.pjt.title = e.target.value;
    },
    [store],
  );

  const onImgChange = useCallback((e: any) => {
    const profileImg = e.target.files[0];
    if (
      !profileImg ||
      (profileImg && profileImg.type.split('/')[0] !== 'image')
    )
      return;

    // 화면에 프로필 사진 표시
    const reader = new FileReader();
    const formData = new FormData();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        // 이미지 정상적으로 불러오면 변경하기
        formData.append('projectImg', profileImg);

        const dummyAccessToken =
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiUk9MRSI6IlJPTEVfVVNFUiIsImlhdCI6MTY2NzI2NTcyMywiZXhwIjoxNjY3ODcwNTIzfQ.WSa3oFZmJtaXSdsMM0V46FgRFY53zP5E1sydiorQwgI';
        const headers = {
          headers: {
            Authorization: `Bearer ${dummyAccessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        };

        await axios.patch(`/projects/${pid}/images`, formData, headers);
        if (reader.result && typeof reader.result === 'string')
          store.pjt.img = reader.result;
        // 유저 이미지 변경 api 전송
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }, []);

  return (
    <div className="title-img">
      <div className="profile-img-wrapper">
        <div
          className="profile-img-changer"
          onClick={() => fileInput.current.click()}
        >
          <FontAwesomeIcon icon={faImage} />
        </div>
        <img
          className="project-profile-img"
          src={store.pjt.img ? store.pjt.img : DefaultProfile}
          alt="profile"
        />
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          name="profile_img"
          onChange={onImgChange}
          ref={fileInput}
        />
      </div>

      <div className="project-info-container">
        <div className="project-detail-container">
          <div className="project-detail-info-title">
            프로젝트 명 &nbsp;
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
          <input
            type="text"
            value={store.pjt.title || ''}
            className={`project-detail-title ${isEdit && 'edit'}`}
            onChange={onTitleChange}
            readOnly={!isEdit}
            disabled={!isEdit}
          />
        </div>
      </div>
    </div>
  );
}
