import './style.scss';

export default function ProjectImage(props: any) {
  const { img, title } = props;
  return (
    <div className="title-img">
      <img className="profile-image" src={img} alt="profile" />
      <div>
        <div className="project-name">프로젝트명</div>
        <div className="project-title">{title}</div>
      </div>
    </div>
  );
}
