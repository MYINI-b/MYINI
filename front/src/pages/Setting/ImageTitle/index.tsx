import './style.scss';

interface Props {
  img: string;
  title: string;
  onTitleChange: (e: any) => void;
}

export default function ProjectImage({ img, title, onTitleChange }: Props) {
  return (
    <div className="title-img">
      <img className="profile-image" src={img} alt="profile" />
      <div className="project-info-container">
        <div className="project-detail-info-title">프로젝트명</div>
        <input
          type="text"
          value={title}
          className="project-detail-title"
          onChange={onTitleChange}
        />
      </div>
    </div>
  );
}
