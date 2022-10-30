import './style.scss';

export function ProjectPeriod(props: any) {
  const { period } = props;
  return (
    <div className="project-period">
      <div className="period-length">프로젝트 기간</div>
      <div className="detail-word">{period}</div>
    </div>
  );
}
