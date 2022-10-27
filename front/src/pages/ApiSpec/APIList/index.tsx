import './style.scss';

interface API {
  id: number;
  name: string;
  url: string;
  method: string;
  code: number;
}

interface Props {
  controllers: string[];
  controllerIdx: number;
  apis: API[][];
}

export default function APIList({ controllers, controllerIdx, apis }: Props) {
  return (
    <section className="apilist-container">
      <p className="controller-desc">
        Description : 회원관리에 사용되는 컨트롤러 입니다.
      </p>
      <p className="controller-desc">BaseUrl : /user</p>
      <article className="api-table-wrapper">
        <div className="api-table-row">
          <div className="api-table-col one" />
          <h3 className="api-table-col two title">ID</h3>
          <h3 className="api-table-col three title">이름</h3>
          <h3 className="api-table-col three title">URL</h3>
          <h3 className="api-table-col two title">메소드</h3>
          <h3 className="api-table-col two title">코드</h3>
        </div>

        <div className="api-table-tbody">
          <div className="api-table-overflow">
            {apis[controllerIdx].map((api) => {
              return (
                <div className="api-table-row content" key={api.id}>
                  <div className="api-table-col one" />
                  <h3 className="api-table-col two">{`${controllers[controllerIdx]}-${api.id}`}</h3>
                  <h3 className="api-table-col three">{api.name}</h3>
                  <h3 className="api-table-col three">{api.url}</h3>
                  <h3 className="api-table-col two">
                    <span className={`api-method-block ${api.method}`}>
                      {api.method}
                    </span>
                  </h3>
                  <h3 className="api-table-col two">{api.code}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
}
