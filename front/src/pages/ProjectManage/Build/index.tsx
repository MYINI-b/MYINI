import './style.scss';

import { RootState } from 'modules';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Accordion from './Accordion';
import Buttons from './SelectButton';
import Tabs from './Tabs';

export default function Build() {
  const { pid } = useSelector((state: RootState) => state.project);

  const [text, setText] = useState('');
  const [isChecked, setChecked] = useState(false);
  const handleTextArea = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(`${text}\nchecked? ${isChecked}`);
  };
  return (
    <div className="build-container">
      <h1 className="build-title">API 명세서</h1>
      <h2 className="build-project-title">project name</h2>
      <div className="build-main">
        <div className="init-container">
          <div className="title-item">INIT SETTING</div>
          <Tabs>
            <span className="tab-item" title="Spring Boot">
              <div className="item-row">
                <div className="button-item">
                  <div className="item-element">Project</div>
                  <Buttons>
                    <span title="Maven" />
                    <span title="Gradle" />
                  </Buttons>
                </div>
                <div className="button-item">
                  <div className="item-element">Java</div>
                  <Buttons>
                    <span title="19" />
                    <span title="17" />
                    <span title="11" />
                    <span title="8" />
                  </Buttons>
                </div>
                <div className="button-item">
                  <div className="item-element">Spring Boot</div>
                  <Buttons>
                    <span title="3.0.0" />
                    <span title="2.7.5" />
                    <span title="2.7.4" />
                    <span title="2.6.13" />
                  </Buttons>
                </div>
                <div className="button-item">
                  <div className="item-element">Packaging</div>
                  <Buttons>
                    <span title="Jar" />
                    <span title="War" />
                  </Buttons>
                </div>
              </div>
              <div>Metadata</div>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="입력..."
                  onChange={handleTextArea}
                />
              </form>
              <div className="dependency">Dependencies</div>
            </span>
            <span className="tab-item" title="React" />
          </Tabs>
        </div>
        <div className="confirm-code">
          <div className="confirm-title">CONFIRM CODE</div>
          <Accordion />
        </div>
      </div>
    </div>
  );
}
