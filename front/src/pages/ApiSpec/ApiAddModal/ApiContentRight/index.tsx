import './style.scss';

interface Props {
  dataType: string[];
  objDataType: any[];
}

export default function ApiContentRight({ dataType, objDataType }: Props) {
  return (
    <div className="api-add-content-right">
      <section className="content-section">
        <h1 className="content-right-title">REQUEST BODY</h1>
        <div className="content-right-box">
          <div className="content-right-boxtitle-wrapper">
            <h3 className="content-right-boxtitle static">자료형</h3>
            <h3 className="content-right-boxtitle">변수명</h3>
          </div>
          <div className="content-right-boxcontent-wrapper">
            <div className="content-right-normal-boxcontent">
              <div className="datatype-wrapper">
                <div className="datatype-block" />
              </div>
              <input
                type="text"
                className="content-right-boxcontent-input"
                placeholder="변수명을 입력해주세요"
              />
            </div>
            <div className="content-right-detail-boxcontent">asd</div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h1 className="content-right-title">RESPONSE BODY</h1>
        <div className="content-right-box">
          <div className="content-right-boxtitle-wrapper">
            <h3 className="content-right-boxtitle static">자료형</h3>
            <h3 className="content-right-boxtitle">변수명</h3>
          </div>
          <div className="content-right-boxcontent-wrapper">
            <div className="content-right-normal-boxcontent">
              <div className="datatype-wrapper">
                <input type="text" className="datatype-block" value="Striang" />
              </div>
              <input
                type="text"
                className="content-right-boxcontent-input"
                placeholder="변수명을 입력해주세요"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
