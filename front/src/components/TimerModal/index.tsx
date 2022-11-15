import './style.scss';
import { useEffect } from 'react';
import Icon from 'assets/icon.png';

interface Props {
  text: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TimerModal({ text, setIsOpen }: Props) {
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  }, []);
  return (
    <div className="timermodal-empty" onClick={() => setIsOpen(false)}>
      <div className="timermodal-content" onClick={(e) => e.stopPropagation()}>
        <div className="img-box">
          <img src={Icon} alt="로고아이콘" />
        </div>
        <label className="timermodal-text">{text}</label>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="timermodal-submit"
        >
          확인
        </button>
      </div>
    </div>
  );
}
