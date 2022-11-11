import './style.scss';

import { useState, useEffect } from 'react';
import { getApi } from 'api';
import axios from 'axios';
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
  const [initDependenciesList, setInitDependenciesList] = useState([]);
  const [dependenciesData, setDependenciesData] = useState<string[]>([
    'web',
    'jpa',
    'lombok',
    'devtools',
    'validation',
  ]);
  const getDependencies = () => {
    setDependenciesData(dependenciesData);
  };

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

  const ConfirmCodeData = {
    springType: 'gradle-project',
    springLanguage: 'java',
    springPlatformVersion: '2.2.0.RELEASE',
    springPackaging: 'jar',
    springJvmVersion: '1.8',
    springGroupId: 'com.example',
    springArtifactId: 'demo',
    springName: 'demo',
    springDescription: 'Demo%20project%20for%20Spring%20Boot',
    springPackageName: 'com.example.demo',
    springDependencyName: 'web,jpa,lombok,devtools',
  };
  const getProjectDetail = async () => {
    const ConfirmCode: any = await getApi(
      `https://k7b203.p.ssafy.io/api/initializers/3/previews?springType=${initSelectType}&springLanguage=${initSelectLanguage}&springPlatformVersion=${initSelectPlatform}&springPackaging=${initSelectPackaging}&springJvmVersion=${initSelectJvm}&springGroupId=${textGroup}&springArtifactId=${textArtifact}&springName=${textName}&springDescription=${textDescription}&springPackageName=${textPackage}&springDependencyName=${dependenciesData}`,
    );
    console.log(ConfirmCode);
    setConfirmData(ConfirmCode.data);
  };

  const downloadCode = async () => {
    await axios({
      url: `https://k7b203.p.ssafy.io/api/initializers/3?springType=${initSelectType}&springLanguage=${initSelectLanguage}&springPlatformVersion=${initSelectPlatform}&springPackaging=${initSelectPackaging}&springJvmVersion=${initSelectJvm}&springGroupId=${textGroup}&springArtifactId=${textArtifact}&springName=${textName}&springDescription=${textDescription}&springPackageName=${textPackage}&springDependencyName=${dependenciesData}`,
      method: 'GET',
      responseType: 'blob', // important
      data: 'data',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${textName}.zip`);
      document.body.appendChild(link);
      link.click();
    });
  };

  // useEffect(() => {
  //   const buildProcess = async () => {
  //     const BuildSet: any = await getApi(
  //       `https://k7b203.p.ssafy.io/api/initializers/3?springType=gradle-project&springLanguage=java&springPlatformVersion=2.2.0.RELEASE&springPackaging=jar&springJvmVersion=1.8&springGroupId=com.example&springArtifactId=demo&springName=aaa&springDescription=Demo%20project%20for%20Spring%20Boot&springPackageName=com.example.demo&springDependencyName=web,jpa,lombok,devtools`,
  //     );
  //     console.log(BuildSet);
  //     // setConfirmData(BuildSet.data);
  //   };
  //   buildProcess();
  // }, []);

  useEffect(() => {
    const initSettings = async () => {
      const InitSet: any = await getApi(
        `https://k7b203.p.ssafy.io/api/initializers/settings`,
      );
      console.log(InitSet.data);
      setInitSelectJvmList(
        InitSet.data['single-select'].springJvmVersion.values,
      );
      setInitSelectLanguageList(
        InitSet.data['single-select'].springLanguage.values,
      );
      setInitSelectPackagingList(
        InitSet.data['single-select'].springPackaging.values,
      );
      setInitSelectPlatformList(
        InitSet.data['single-select'].springPlatformVersion.values,
      );
      setInitSelectTypeList(InitSet.data['single-select'].springType.values);
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

  // console.log(textGroup, 1);
  // console.log(textArtifact, 2);
  // console.log(textName, 3);
  // console.log(textDescription, 4);
  // console.log(textPackage, 5);
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
                        <div className="radio-title">Jvm version</div>
                        {initSelectJvmList.map((items: any, index: number) => (
                          <p key={index} className="radio-content">
                            <input
                              className="radio-input"
                              type="radio"
                              name="Jvm"
                              value={items.name}
                              id={items.id}
                              onChange={radioHandlerSelectJvm}
                              checked={initSelectJvm === items.id}
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
                        <div className="radio-title">Language</div>
                        {initSelectLanguageList.map(
                          (items: any, index: number) => (
                            <p key={index} className="radio-content">
                              <input
                                className="radio-input"
                                type="radio"
                                name="Language"
                                value={items.name}
                                id={items.id}
                                onChange={radioHandlerSelectLanguage}
                                checked={initSelectLanguage === items.id}
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
                        <div className="radio-title">Packaging</div>
                        {initSelectPackagingList.map(
                          (items: any, index: number) => (
                            <p key={index} className="radio-content">
                              <input
                                className="radio-input"
                                type="radio"
                                name="Packaging"
                                value={items.name}
                                id={items.id}
                                onChange={radioHandlerSelectPackaging}
                                checked={initSelectPackaging === items.id}
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
                        <div className="radio-title">Platform Version</div>
                        {initSelectPlatformList.map(
                          (items: any, index: number) => (
                            <p key={index} className="radio-content">
                              <input
                                className="radio-input"
                                type="radio"
                                name="Platform"
                                value={items.name}
                                id={items.id}
                                onChange={radioHandlerSelectPlatform}
                                checked={initSelectPlatform === items.id}
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
                        <div className="radio-title">Type</div>
                        {initSelectTypeList.map((items: any, index: number) => (
                          <p key={index} className="radio-content">
                            <input
                              className="radio-input"
                              type="radio"
                              name="Type"
                              value={items.name}
                              id={items.id}
                              onChange={radioHandlerSelectType}
                              checked={initSelectType === items.id}
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
            <div className="dependency-container">
              <div className="dependency">Dependencies</div>
              <button
                type="button"
                onClick={modalClose}
                className="dependency-button"
              >
                Add
              </button>
            </div>
          </span>
          {modalOpen && initDependenciesList && (
            <Modal
              modalClose={modalClose}
              initDependenciesList={initDependenciesList}
              dependenciesData={dependenciesData}
              getDependencies={getDependencies}
            />
          )}
          <div className="dependency-items">
            {dependenciesData &&
              dependenciesData.map((dependencyData, idx) => (
                <span key={idx} className="dependencies-data">
                  {dependencyData}
                </span>
              ))}
          </div>
          <button
            type="submit"
            className="build-project-button"
            onClick={getProjectDetail}
          >
            Build
          </button>
        </div>
        <div className="confirm-code">
          <div className="confirmcode-title">CONFIRM CODE</div>
          <Accordion1 items={accordionItems} />
          <button
            type="submit"
            className="build-project-button"
            onClick={downloadCode}
          >
            Build Project
          </button>
        </div>
      </div>
    </div>
  );
}
