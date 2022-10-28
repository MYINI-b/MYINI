import './style.scss';

export function ProjectMember(props: any) {
  const { member } = props;
  return (
    <div className="project-member">
      <div className="member-control">팀원관리</div>
      <div className="member-scroll">
        {member.map((mem: any) => (
          <div key={mem.id} className="team-member">
            <img className="profile-image" src={mem.img} alt="profile" />
            <div className="profile-name">{mem.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
