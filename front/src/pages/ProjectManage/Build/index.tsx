import './style.scss';

import { useState } from 'react';
import { getApi } from 'api';
import Accordion from './Accordion';
import Buttons from './SelectButton';
import Modal from './Modal';

export default function Build() {
  const [modalOpen, setModalOpen] = useState(false)
  const modalClose = () => {
      setModalOpen(!modalOpen)

  }
  
  const [text, setText] = useState('');
  const [isChecked, setChecked] = useState(false);
  const handleTextArea = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(`${text}\nchecked? ${isChecked}`);
  };
  // https://k7b203.p.ssafy.io/api/initializers/{projectid}/preview
  return (
    <div className="build-container">
      <h1 className="build-title">API 명세서</h1>
      <h2 className="build-project-title">project name</h2>
      <div className="build-main">
        <div className="init-container">
          <div className="title-item">INIT SETTING</div>
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
                <div className="item-element">Language</div>
                <Buttons>
                  <span title="Java" />
                  <span title="Kotlin" />
                  <span title="Groovy" />
                </Buttons>
              </div>
              <div className="button-item">
                <div className="item-element">Spring Boot</div>
                <Buttons>
                  <span title="3.0.0" />
                  <span title="2.7.6" />
                  <span title="2.7.5" />
                  <span title="2.6.14" />
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
            <div className="metadata">Metadata</div>
            <div className="project-metadata">
              <div className="metadata-name">Group</div>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="com.example"
                  onChange={handleTextArea}
                />
              </form>
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Artifact</div>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="demo"
                  onChange={handleTextArea}
                />
              </form>
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Name</div>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="demo"
                  onChange={handleTextArea}
                />
              </form>
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Description</div>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="Demo project for Spring Boot"
                  onChange={handleTextArea}
                />
              </form>
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Package name</div>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="com.example.demo"
                  onChange={handleTextArea}
                />
              </form>
            </div>
            <div className="dependency">Dependencies</div>
          </span>
          <span className="tab-item" title="React" />
          <button onClick={modalClose}>Click</button>
          { modalOpen && <Modal modalClose={modalClose}></Modal>}
        </div>
        <div className="confirm-code">
          <div className="confirm-title">CONFIRM CODE</div>
          <Accordion />
        </div>
      </div>
    </div>
  );
}
