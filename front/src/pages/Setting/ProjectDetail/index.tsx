import './style.scss';

export function DetailInfo(props: any) {
  const { detailinfo } = props;
  return (
    <div className="detail-info">
      <div className="project-info">프로젝트 설명</div>
      <div className="detail-word">{detailinfo}</div>
    </div>
  );
}
