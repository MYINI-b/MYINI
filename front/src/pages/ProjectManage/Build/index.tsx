import './style.scss';

import { useState, useEffect } from 'react';
import { postApi, getApi } from 'api';
import Modal from './Modal';
import Accordion1 from './Accor';

export type AccordionType = {
  id: number;
  title: string;
  body: string;
  idx: number;
};

export type initDependenciesListType = {
  name: string;
  description: string;
  id: string;
};

export default function Build() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  const [textGroup, setTextGroup] = useState('');
  const [textArtifact, setTextArtifact] = useState('');
  const [textName, setTextName] = useState('');
  const [textDescription, setTextDescription] = useState('');
  const [textPackage, setTextPackage] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [confirmData, setConfirmData] = useState([]);
  const [buildStart, setBuildStart] = useState([]);

  const [initSelectJvm, setInitSelectJvm] = useState<string>('17');
  const [initSelectJvmList, setInitSelectJvmList] = useState([]);
  const [initSelectLanguage, setInitSelectLanguage] = useState<string>('java');
  const [initSelectLanguageList, setInitSelectLanguageList] = useState([]);
  const [initSelectPackaging, setInitSelectPackaging] = useState<string>('jar');
  const [initSelectPackagingList, setInitSelectPackagingList] = useState([]);
  const [initSelectPlatform, setInitSelectPlatform] =
    useState<string>('2.7.5.RELEASE');
  const [initSelectPlatformList, setInitSelectPlatformList] = useState([]);
  const [initSelectType, setInitSelectType] =
    useState<string>('gradle-project');
  const [initSelectTypeList, setInitSelectTypeList] = useState([]);
  const [initDependencies, setInitDependencies] = useState<string>();
  const [initDependenciesList, setInitDependenciesList] =
    useState<initDependenciesListType>();
  const radioHandlerSelectJvm = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInitSelectJvm(event.target.id);
  };
  const radioHandlerSelectLanguage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInitSelectLanguage(event.target.id);
  };
  const radioHandlerSelectPackaging = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInitSelectPackaging(event.target.id);
  };
  const radioHandlerSelectPlatform = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInitSelectPlatform(event.target.id);
  };
  const radioHandlerSelectType = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInitSelectType(event.target.id);
  };
  const radioHandlerDependencies = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInitDependencies(event.target.value);
  };
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
      // console.log(ConfirmCode.data);
      setConfirmData(ConfirmCode.data);
    };
    getProjectDetail();
  }, []);

  useEffect(() => {
    const buildProcess = async () => {
      const BuildSet: any = await getApi(
        `https://k7b203.p.ssafy.io/api/initializers/downloads`,
      );
      // setConfirmData(BuildSet.data);
    };
    buildProcess();
  }, []);

  useEffect(() => {
    const initSettings = async () => {
      const InitSet: any = await getApi(
        `https://k7b203.p.ssafy.io/api/initializers/settings`,
      );
      console.log(InitSet);
      setInitSelectJvmList(
        InitSet.data['single-select'].spring_jvm_version.values,
      );
      setInitSelectLanguageList(
        InitSet.data['single-select'].spring_language.values,
      );
      setInitSelectPackagingList(
        InitSet.data['single-select'].spring_packaging.values,
      );
      setInitSelectPlatformList(
        InitSet.data['single-select'].spring_platform_version.values,
      );
      setInitSelectTypeList(InitSet.data['single-select'].spring_type.values);
      setInitDependenciesList(InitSet.data.dependencies);
    };
    initSettings();
  }, []);

  const handleTextGroupArea = (e: any) => {
    setTextGroup(e.target.value);
  };
  const handleTextArtifactArea = (e: any) => {
    setTextArtifact(e.target.value);
  };
  const handleTextNameArea = (e: any) => {
    setTextName(e.target.value);
  };
  const handleTextDescriptionArea = (e: any) => {
    setTextDescription(e.target.value);
  };
  const handleTextPackageArea = (e: any) => {
    setTextPackage(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // alert(`${text}\nchecked? ${isChecked}`);
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

  console.log(textGroup, 1);
  console.log(textArtifact, 2);
  console.log(textName, 3);
  console.log(textDescription, 4);
  console.log(textPackage, 5);
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
                <div className="single-select">
                  <div className="container">
                    {initSelectJvmList ? (
                      <div className="radio-set">
                        {initSelectJvmList.map((items: any, index: number) => (
                          <p key={index}>
                            <input
                              className="radio-input"
                              type="radio"
                              name="Jvm"
                              value={items.name}
                              id={items.id}
                              onChange={radioHandlerSelectJvm}
                            />
                            <label htmlFor={items.id} className="radio-field">
                              {items.name}
                            </label>
                          </p>
                        ))}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="container">
                    {initSelectLanguageList ? (
                      <div className="radio-set">
                        {initSelectLanguageList.map(
                          (items: any, index: number) => (
                            <p key={index}>
                              <input
                                className="radio-input"
                                type="radio"
                                name="Language"
                                value={items.name}
                                id={items.id}
                                onChange={radioHandlerSelectLanguage}
                              />
                              <label htmlFor={items.id} className="radio-field">
                                {items.name}
                              </label>
                            </p>
                          ),
                        )}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="container">
                    {initSelectPackagingList ? (
                      <div className="radio-set">
                        {initSelectPackagingList.map(
                          (items: any, index: number) => (
                            <p key={index}>
                              <input
                                className="radio-input"
                                type="radio"
                                name="Packaging"
                                value={items.name}
                                id={items.id}
                                onChange={radioHandlerSelectPackaging}
                              />
                              <label htmlFor={items.id} className="radio-field">
                                {items.name}
                              </label>
                            </p>
                          ),
                        )}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="container">
                    {initSelectPlatformList ? (
                      <div className="radio-set">
                        {initSelectPlatformList.map(
                          (items: any, index: number) => (
                            <p key={index}>
                              <input
                                className="radio-input"
                                type="radio"
                                name="Platform"
                                value={items.name}
                                id={items.id}
                                onChange={radioHandlerSelectPlatform}
                              />
                              <label htmlFor={items.id} className="radio-field">
                                {items.name}
                              </label>
                            </p>
                          ),
                        )}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="container">
                    {initSelectTypeList ? (
                      <div className="radio-set">
                        {initSelectTypeList.map((items: any, index: number) => (
                          <p key={index}>
                            <input
                              className="radio-input"
                              type="radio"
                              name="Type"
                              value={items.name}
                              id={items.id}
                              onChange={radioHandlerSelectType}
                            />
                            <label htmlFor={items.id} className="radio-field">
                              {items.name}
                            </label>
                          </p>
                        ))}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="metadata">Metadata</div>
            <div className="project-metadata">
              <div className="metadata-name">Group</div>
              <form onSubmit={handleSubmit} className="submit-box">
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="com.example"
                  onChange={handleTextGroupArea}
                />
              </form>
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Artifact</div>
              <form onSubmit={handleSubmit} className="submit-box">
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="demo"
                  onChange={handleTextArtifactArea}
                />
              </form>
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Name</div>
              <form onSubmit={handleSubmit} className="submit-box">
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="demo"
                  onChange={handleTextNameArea}
                />
              </form>
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Description</div>
              <form onSubmit={handleSubmit} className="submit-box">
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="Demo project for Spring Boot"
                  onChange={handleTextDescriptionArea}
                />
              </form>
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Package name</div>
              <form onSubmit={handleSubmit} className="submit-box">
                <textarea
                  className="text-box"
                  rows={5}
                  placeholder="com.example.demo"
                  onChange={handleTextPackageArea}
                />
              </form>
            </div>
            <div className="dependency">Dependencies</div>
          </span>
          <span className="tab-item" title="React" />
          <button type="button" onClick={modalClose}>
            Click
          </button>
          {modalOpen && initDependenciesList && (
            <Modal
              modalClose={modalClose}
              initDependenciesList={initDependenciesList}
            />
          )}
        </div>
        <div className="confirm-code">
          <div className="confirmcode-title">CONFIRM CODE</div>
          <Accordion1 items={accordionItems} />
          <button type="submit" className="build-project-button">
            Build Project
          </button>
        </div>
      </div>
    </div>
  );
}
