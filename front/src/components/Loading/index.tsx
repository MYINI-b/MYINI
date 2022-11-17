import './style.scss';
import LoadingGif from 'assets/loading.gif';

export default function Loading() {
  return (
    <div className="loading-empty">
      <h1>잠시만 기다려주세요!</h1>
      <img src={LoadingGif} alt="로딩 gif" />
    </div>
  );
}
