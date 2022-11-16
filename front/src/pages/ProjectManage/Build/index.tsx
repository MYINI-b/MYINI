import './style.scss';

import { useState, useEffect, useCallback } from 'react';
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

interface Props {
  pid: string;
  store: any;
}
export interface selectObj {
  Jvm: string;
  Language: string;
  Packaging: string;
  Platform: string;
  Type: string;
  textGroup: string;
  textArtifact: string;
  textName: string;
  textDescription: string;
  textPackage: string;
  depDatas: string[];
}

export default function Build({ pid, store }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  const [isChecked, setChecked] = useState(false);
  const [confirmData, setConfirmData] = useState([]);
  const [buildStart, setBuildStart] = useState([]);

  const [initSelectJvmList, setInitSelectJvmList] = useState([]);
  const [initSelectLanguageList, setInitSelectLanguageList] = useState([]);
  const [initSelectPackagingList, setInitSelectPackagingList] = useState([]);
  const [initSelectPlatformList, setInitSelectPlatformList] = useState([]);
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
  const [selectObj, setSelectObj] = useState<selectObj>({
    Jvm: '',
    Language: '',
    Packaging: '',
    Platform: '',
    Type: '',
    textGroup: '',
    textArtifact: '',
    textName: '',
    textDescription: '',
    textPackage: '',
    depDatas: [],
  });
  const {
    Jvm,
    Language,
    Packaging,
    Platform,
    Type,
    textGroup,
    textArtifact,
    textName,
    textDescription,
    textPackage,
    depDatas,
  } = selectObj;

  const getDependencies = () => {
    setDependenciesData(dependenciesData);
  };

  const radioHandlerSelectJvm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
  };
  const radioHandlerSelectLanguage = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
  };
  const radioHandlerSelectPackaging = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
  };
  const radioHandlerSelectPlatform = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
  };
  const radioHandlerSelectType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
  };

  const radioHandlerDependencies = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInitDependencies(event.target.value);
  };
  const getProjectDetail = async () => {
    const ConfirmCode: any = await getApi(
      `/initializers/${pid}/previews?springType=${selectObj.Type}&springLanguage=${selectObj.Language}&springPlatformVersion=${selectObj.Platform}&springPackaging=${selectObj.Packaging}&springJvmVersion=${selectObj.Jvm}&springGroupId=${selectObj.textGroup}&springArtifactId=${selectObj.textArtifact}&springName=${selectObj.textName}&springDescription=${selectObj.textDescription}&springPackageName=${selectObj.textPackage}&springDependencyName=${dependenciesData}`,
    );
    console.log(ConfirmCode);
    setConfirmData(ConfirmCode.data);
  };
  const downloadCode = async () => {
    await axios({
      url: `/initializers/${pid}?springType=${selectObj.Type}&springLanguage=${selectObj.Language}&springPlatformVersion=${selectObj.Platform}&springPackaging=${selectObj.Packaging}&springJvmVersion=${selectObj.Jvm}&springGroupId=${selectObj.textGroup}&springArtifactId=${selectObj.textArtifact}&springName=${selectObj.textName}&springDescription=${selectObj.textDescription}&springPackageName=${selectObj.textPackage}&springDependencyName=${dependenciesData}`,
      method: 'GET',
      responseType: 'blob', // important
      data: 'data',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${store.pjt.textName}.zip`);
      document.body.appendChild(link);
      link.click();
    });
  };

  useEffect(() => {
    const initSettings = async () => {
      const InitSet: any = await getApi(`/initializers/settings`);
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
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
  };
  const handleTextArtifactArea = (e: any) => {
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
  };
  const handleTextNameArea = (e: any) => {
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
  };
  const handleTextDescriptionArea = (e: any) => {
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
  };
  const handleTextPackageArea = (e: any) => {
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="build-container">
      <h1 className="build-title">Project Build</h1>
      <h2 className="build-project-title">{store && store.pjt.title}</h2>
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
                              checked={selectObj.Jvm === items.id}
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
                                checked={selectObj.Language === items.id}
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
                                checked={selectObj.Packaging === items.id}
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
                                checked={selectObj.Platform === items.id}
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
                              checked={selectObj.Type === items.id}
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
                  name="textGroup"
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
                  name="textArtifact"
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
                  name="textName"
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
                  name="textDescription"
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
                  name="textPackage"
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
          <Accordion1 confirmData={confirmData} />
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
