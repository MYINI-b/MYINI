export default function ProjectCard() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">프로젝트명</div>
      </div>
      <div className="card-body">
        <div className="card-body-header">
          <h1>프로젝트명</h1>
        </div>
        <div className="card-body-context">
          이 프로젝트는 1953년 영국에서부터 전해져와 이 글을 읽을 시 3명에게
          복사해서 보내지 않을 경우 수상하지 못합니다.
          <div className="members">
            <div className="member" />
            <div className="member" />
            <div className="member" />
          </div>
        </div>
      </div>
    </div>
  );
}
