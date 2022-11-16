import './style.scss';
import { useEffect } from 'react';
import Icon from 'assets/icon.png';

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}
export default function TextModal({ text, setText }: Props) {
  const onOkClick = () => {
    setText('');
    window.location.href = '/';
  };
  return (
    <div className="textmodal-empty" onClick={onOkClick}>
      <div className="textmodal-content" onClick={(e) => e.stopPropagation()}>
        <div className="img-box">
          <img src={Icon} alt="로고아이콘" />
        </div>
        <label className="textmodal-text">{text}</label>
        <button type="button" onClick={onOkClick} className="textmodal-submit">
          확인
        </button>
      </div>
    </div>
  );
}
