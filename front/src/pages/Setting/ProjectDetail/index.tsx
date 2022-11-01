import './style.scss';

export function DetailInfo(props: any) {
  const { detailinfo } = props;
  return (
    <div className="detail-info">
      <div className="project-detail-info-title">프로젝트 설명</div>
      <textarea
        className="project-info-desc"
        value={detailinfo}
        onChange={() => {}}
      />
    </div>
  );
}
