import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useCallback, Dispatch, useRef } from 'react';
import './style.scss';
import DefaultProfile from 'assets/default-profile.png';
import { profile } from 'console';

interface Props {
  img: string;
  setImg: Dispatch<React.SetStateAction<string>>;
  title: string;
  onTitleChange: (e: any) => void;
}

export default function ProjectImage({
  img,
  setImg,
  title,
  onTitleChange,
}: Props) {
  const fileInput = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isEdit, setIsEdit] = useState(false);

  const onSubmitClick = useCallback(() => {
    setIsEdit(false);
  }, []);

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
        if (reader.result && typeof reader.result === 'string')
          setImg(reader.result);
        formData.append('file', profileImg);

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
          src={img === '' ? DefaultProfile : img}
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
        <div className="project-edit-button-wrapper">
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
        <div className="project-detail-container">
          <div className="project-detail-info-title">프로젝트명</div>
          <input
            type="text"
            value={title}
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
