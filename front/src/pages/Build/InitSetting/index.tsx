import './style.scss';
import { useState } from 'react';
import Tabs from '../Tabs';
import Buttons from '../SelectButton';

export default function InitSetting() {
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
        <span className="tab-item" title="React">
          <div className="item-row">
            <div className="button-item">
              <div className="item-element">Languages</div>
              <Buttons>
                <span title="JS" />
                <span title="TS" />
              </Buttons>
            </div>
            <div className="button-item">
              <div className="item-element">Eslint/Prettier</div>
              <Buttons>
                <span title="on" />
                <span title="off" />
              </Buttons>
            </div>
            <div className="button-item">
              <div className="item-element">Router</div>
              <Buttons>
                <span title="on" />
                <span title="off" />
              </Buttons>
            </div>
            <div className="button-item">
              <div className="item-element">Redux</div>
              <Buttons>
                <span title="on" />
                <span title="off" />
              </Buttons>
            </div>
          </div>
        </span>
      </Tabs>
    </div>
  );
}
