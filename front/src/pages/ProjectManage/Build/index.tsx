import './style.scss';

import { useState, useEffect, useCallback } from 'react';
import { getApi } from 'api';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Loading from 'components/Loading';
import TimerModal from 'components/TimerModal';
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

  const [confirmData, setConfirmData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertText, setAlertText] = useState('');

  const [initSelectJvmList, setInitSelectJvmList] = useState([]);
  const [initSelectLanguageList, setInitSelectLanguageList] = useState([]);
  const [initSelectPackagingList, setInitSelectPackagingList] = useState([]);
  const [initSelectPlatformList, setInitSelectPlatformList] = useState([]);
  const [initSelectTypeList, setInitSelectTypeList] = useState([]);
  const [initDependenciesList, setInitDependenciesList] = useState([]);

  const [selectObj, setSelectObj] = useState<selectObj>({
    Jvm: '17',
    Language: 'java',
    Packaging: 'jar',
    Platform: '2.7.5.RELEASE',
    Type: 'gradle-project',
    textGroup: 'springGroup',
    textArtifact: '',
    textName: '',
    textDescription: 'springDescription',
    textPackage: 'com.springGroupId.',
    depDatas: ['web', 'jpa', 'lombok', 'devtools', 'validation'],
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

  const getDependencies = (newDepData: any[]) => {
    setSelectObj({ ...selectObj, depDatas: newDepData });
  };

  const radioHandlerSelectJvm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, id } = e.target;
    setSelectObj({ ...selectObj, [name]: id });
    store.pjt.Jvm = selectObj.Jvm;
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

  const getProjectDetail = async (e: any) => {
    e.preventDefault();
    const ConfirmCode: any = await getApi(
      `/initializers/${pid}/previews?springType=${selectObj.Type}&springLanguage=${selectObj.Language}&springPlatformVersion=${selectObj.Platform}&springPackaging=${selectObj.Packaging}&springJvmVersion=${selectObj.Jvm}&springGroupId=${selectObj.textGroup}&springArtifactId=${selectObj.textArtifact}&springName=${selectObj.textName}&springDescription=${selectObj.textDescription}&springPackageName=${selectObj.textPackage}&springDependencyName=${selectObj.depDatas}`,
    );
    console.log(ConfirmCode);
    setConfirmData(ConfirmCode.data);
    window.scrollTo({
      top: parseInt(`${window.scrollY + 100}`, 10),
      left: 0,
      behavior: 'smooth',
    });
  };
  const downloadCode = async () => {
    setIsLoading(true);
    await axios({
      url: `/initializers/${pid}?springType=${selectObj.Type}&springLanguage=${selectObj.Language}&springPlatformVersion=${selectObj.Platform}&springPackaging=${selectObj.Packaging}&springJvmVersion=${selectObj.Jvm}&springGroupId=${selectObj.textGroup}&springArtifactId=${selectObj.textArtifact}&springName=${selectObj.textName}&springDescription=${selectObj.textDescription}&springPackageName=${selectObj.textPackage}&springDependencyName=${selectObj.depDatas}`,
      method: 'GET',
      responseType: 'blob', // important
      data: 'data',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${store.pjt.textName}.zip`);
        document.body.appendChild(link);
        link.click();
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setAlertText('다운로드 중 에러가 발생했습니다!');
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
    const { name, value } = e.target;
    const substr = value.substring(4);
    setSelectObj({
      ...selectObj,
      [name]: substr,
      textPackage: `com.${substr}.${selectObj.textName}`,
    });
  };
  const handleTextArtifactNameArea = (e: any) => {
    const { name, value } = e.target;
    setSelectObj({
      ...selectObj,
      textName: value,
      textArtifact: value,
      textPackage: `com.${selectObj.textGroup}.${value}`,
    });
  };

  const handleTextPackage = (e: any) => {
    const { name, value } = e.target;
    setSelectObj({
      ...selectObj,
      textPackage: value,
    });
  };

  const handleTextDescriptionArea = (e: any) => {
    const { name, value } = e.target;
    setSelectObj({ ...selectObj, [name]: value });
  };

  return (
    <div className="build-container">
      <h1 className="build-title">PROJECT BUILD</h1>
      <h2 className="build-project-title">{store && store.pjt.title}</h2>
      <div className="build-main">
        <form className="init-container" onSubmit={getProjectDetail}>
          <div className="title-item">INIT SETTING</div>
          <span className="tab-item" title="Spring Boot">
            <div className="button-item">
              <div className="single-select">
                <div className="container">
                  {initSelectJvmList ? (
                    <div className="radio-set">
                      <div className="radio-title">Jvm Version</div>
                      <div className="radio-content-list">
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
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="container">
                  {initSelectLanguageList ? (
                    <div className="radio-set">
                      <div className="radio-title">Language</div>
                      <div className="radio-content-list">
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
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="container">
                  {initSelectPackagingList ? (
                    <div className="radio-set">
                      <div className="radio-title">Packaging</div>
                      <div className="radio-content-list">
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
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="container">
                  {initSelectPlatformList ? (
                    <div className="radio-set">
                      <div className="radio-title">Platform Version</div>
                      <div className="radio-content-list">
                        {initSelectPlatformList.map(
                          (items: any, index: number) => (
                            <p key={index} className="radio-content lines">
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
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="container">
                  {initSelectTypeList ? (
                    <div className="radio-set">
                      <div className="radio-title">Type</div>
                      <div className="radio-content-list">
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
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
            <div className="metadata">Metadata</div>
            <div className="project-metadata">
              <div className="metadata-name">Group</div>
              <input
                type="text"
                className="text-box"
                placeholder="com.example"
                onChange={handleTextGroupArea}
                value={`com.${selectObj.textGroup}`}
                name="textGroup"
                required
              />
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Artifact</div>
              <input
                type="text"
                className="text-box"
                placeholder="springArtifactId"
                onChange={handleTextArtifactNameArea}
                value={selectObj.textArtifact}
                name="textArtifact"
                required
              />
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Name</div>
              <input
                type="text"
                className="text-box"
                placeholder="springName"
                onChange={handleTextArtifactNameArea}
                value={selectObj.textName}
                name="textName"
                required
              />
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Description</div>
              <input
                type="text"
                className="text-box"
                placeholder="Spring Description for Spring Boot"
                onChange={handleTextDescriptionArea}
                value={selectObj.textDescription}
                name="textDescription"
                required
              />
            </div>
            <div className="project-metadata">
              <div className="metadata-name">Package name</div>
              <input
                type="text"
                className="text-box"
                placeholder="com.example.demo"
                name="textPackage"
                onChange={handleTextPackage}
                value={selectObj.textPackage}
                required
              />
            </div>
            <div className="dependency-container">
              <div className="dependency">Dependencies</div>
              <FontAwesomeIcon
                icon={faPlus}
                onClick={modalClose}
                className="dependency-button"
              />
            </div>
          </span>
          {modalOpen && initDependenciesList && (
            <Modal
              modalClose={modalClose}
              initDependenciesList={initDependenciesList}
              selectObj={selectObj}
              getDependencies={getDependencies}
            />
          )}
          <div className="dependency-items">
            {selectObj.depDatas.map((dependencyData, idx: number) => (
              <span key={idx} className="dependencies-data">
                {dependencyData}
              </span>
            ))}
          </div>

          <button type="submit" className="build-project-button">
            Build
          </button>
        </form>
        <div className="confirm-code">
          <div className="title-item">CONFIRM CODE</div>
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
      {isLoading && <Loading />}

      {!!alertText && <TimerModal text={alertText} setText={setAlertText} />}
    </div>
  );
}
