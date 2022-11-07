import './style.scss';

import { useState, useEffect } from 'react';
import { postApi } from 'api';
import Buttons from './SelectButton';
import Modal from './Modal';
import Accordion1 from './Accor';

export type AccordionType = {
  id: number;
  title: string;
  body: string;
  idx: number;
};

export default function Build() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  const [text, setText] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [confirmData, setConfirmData] = useState([]);

  useEffect(() => {
    const getProjectDetail = async () => {
      const ConfirmCode: any = await postApi(
        `https://k7b203.p.ssafy.io/api/initializers/3/previews`,
        {
          spring_base_path: '/initializer/3/',
          spring_type: 'gradle-project',
          spring_language: 'java',
          spring_platform_version: '2.2.0.RELEASE',
          spring_packaging: 'jar',
          spring_jvm_version: '1.8',
          spring_group_id: 'com.example',
          spring_artifact_id: 'demo',
          spring_name: 'demo',
          spring_description: 'Demo%20project%20for%20Spring%20Boot',
          spring_package_name: 'com.example.demo',
          spring_dependency_name: 'web,jpa,lombok,devtools',
        },
      );
      console.log(ConfirmCode.data);
      setConfirmData(ConfirmCode.data);
    };
    getProjectDetail();
  }, []);

  const handleTextArea = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(`${text}\nchecked? ${isChecked}`);
  };
  const accordionItems = [
    {
      title: 'Controller',
      content: (
        <div className="confirm-total">
          {' '}
          {confirmData.map((items: any, index: number) => (
            <div key={index}>
              {items.fileCategory === 'controller' ? (
                <>
                  <div className="confirm-title">{items.fileName}</div>
                  <div className="confirm-content">{items.contents}</div>
                </>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Entity',
      content: (
        <div className="confirm-total">
          {' '}
          {confirmData.map((items: any, index: number) => (
            <div key={index}>
              {items.fileCategory === 'entity' ? (
                <>
                  <div className="confirm-title">{items.fileName}</div>
                  <div className="confirm-content">{items.contents}</div>
                </>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Repository',
      content: (
        <div className="confirm-total">
          {' '}
          {confirmData.map((items: any, index: number) => (
            <div key={index}>
              {items.fileCategory === 'repository' ? (
                <>
                  <div className="confirm-title">{items.fileName}</div>
                  <div className="confirm-content">{items.contents}</div>
                </>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Service',
      content: (
        <div className="confirm-total">
          {' '}
          {confirmData.map((items: any, index: number) => (
            <div key={index}>
              {items.fileCategory.slice(0, 7) === 'service' ? (
                <>
                  <div className="confirm-title">{items.fileName}</div>
                  <div className="confirm-content">{items.contents}</div>
                </>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Dto',
      content: (
        <div className="confirm-total">
          {' '}
          {confirmData.map((items: any, index: number) => (
            <div key={index}>
              {items.fileCategory === 'dto' ? (
                <>
                  <div className="confirm-title">{items.fileName}</div>
                  <div className="confirm-content">{items.contents}</div>
                </>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ),
    },
  ];

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
          <button type="button" onClick={modalClose}>
            Click
          </button>
          {modalOpen && <Modal modalClose={modalClose} />}
        </div>
        <div className="confirm-code">
          <div className="confirmcode-title">CONFIRM CODE</div>
          <Accordion1 items={accordionItems} />
        </div>
      </div>
    </div>
  );
}
