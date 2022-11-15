import './style.scss';

import { useState, useEffect } from 'react';
import { getApi } from 'api';
import axios from 'axios';
import { RootState } from 'modules/Reducers';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import Accordion1 from './Accor';
import {
  editJvm,
  editLang,
  editPack,
  editPlat,
  editType,
} from '../../../modules/build';

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

export default function Build({ pid, store }: Props) {
  const { springJvm, springLang, springPack, springPlat, springType } =
    useSelector((state: RootState) => state.build);
  const dispatch = useDispatch();

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
  const getDependencies = () => {
    setDependenciesData(dependenciesData);
  };

  const radioHandlerSelectJvm = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(editJvm(event.target.id));
  };
  const radioHandlerSelectLanguage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(editLang(event.target.id));
  };
  const radioHandlerSelectPackaging = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(editPack(event.target.id));
  };
  const radioHandlerSelectPlatform = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(editPlat(event.target.id));
  };
  const radioHandlerSelectType = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(editType(event.target.id));
  };
  console.log(springType, springLang, springPack, springPlat, springType);
  const radioHandlerDependencies = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInitDependencies(event.target.value);
  };
  const getProjectDetail = async () => {
    const ConfirmCode: any = await getApi(
      `/initializers/${pid}/previews?springType=${springType}&springLanguage=${springLang}&springPlatformVersion=${springPlat}&springPackaging=${springPack}&springJvmVersion=${springJvm}&springGroupId=${textGroup}&springArtifactId=${textArtifact}&springName=${textName}&springDescription=${textDescription}&springPackageName=${textPackage}&springDependencyName=${dependenciesData}`,
    );
    console.log(ConfirmCode);
    setConfirmData(ConfirmCode.data);
  };
  const downloadCode = async () => {
    await axios({
      url: `/initializers/${pid}?springType=${springType}&springLanguage=${springLang}&springPlatformVersion=${springPlat}&springPackaging=${springPack}&springJvmVersion=${springJvm}&springGroupId=${textGroup}&springArtifactId=${textArtifact}&springName=${textName}&springDescription=${textDescription}&springPackageName=${textPackage}&springDependencyName=${dependenciesData}`,
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
  };

  return (
    <div className="build-container">
      <h1 className="build-title">API 명세서</h1>
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
                              checked={springJvm === items.id}
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
                                checked={springLang === items.id}
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
                                checked={springPack === items.id}
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
                                checked={springPlat === items.id}
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
                              checked={springType === items.id}
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
