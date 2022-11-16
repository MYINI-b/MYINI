import './style.scss';
import { useEffect } from 'react';
import Icon from 'assets/icon.png';

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}
export default function TimerModal({ text, setText }: Props) {
  useEffect(() => {
    setTimeout(() => {
      setText('');
    }, 1500);
  }, []);
  return (
    <div className="timermodal-empty" onClick={() => setText('')}>
      <div className="timermodal-content" onClick={(e) => e.stopPropagation()}>
        <div className="img-box">
          <img src={Icon} alt="로고아이콘" />
        </div>
        <label className="timermodal-text">{text}</label>
        <button
          type="button"
          onClick={() => setText('')}
          className="timermodal-submit"
        >
          확인
        </button>
      </div>
    </div>
  );
}
