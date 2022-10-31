import './style.scss';

export function ProjectLink(props: any) {
  const { gitlink, notionlink, jiralink, figmalink } = props;
  return (
    <div className="project-link">
      <div className="link-control">링크관리</div>
      <div>
        <div className="detail-word">
          <img
            className="image-icon"
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="git"
          />
          <a
            className="icon-link"
            href={gitlink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {gitlink}
          </a>
        </div>
        <div className="detail-word">
          <img
            className="image-icon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GvYRs1UzRDOE2WycbFmOCq_nnxhEYlf3nQ&usqp=CAU"
            alt="jira"
          />
          <a
            className="icon-link"
            href={jiralink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {jiralink}
          </a>
        </div>
        <div className="detail-word">
          <img
            className="image-icon"
            src="https://img.icons8.com/ios/500/notion.png"
            alt="notion"
          />
          <a
            className="icon-link"
            href={notionlink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {notionlink}
          </a>
        </div>
        <div className="detail-word">
          <img
            className="image-icon"
            src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
            alt="figma"
          />
          <a
            className="icon-link"
            href={figmalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {figmalink}
          </a>
        </div>
      </div>
    </div>
  );
}
