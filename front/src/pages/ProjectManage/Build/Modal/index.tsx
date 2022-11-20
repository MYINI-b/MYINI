import React, { useState, useEffect, useCallback } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export type initDependenciesListType = {
  name: string;
  description: string;
  id: string;
};

interface Props {
  pid: string;
  store: any;
}

function Modal({
  modalClose,
  initDependenciesList,
  selectObj,
  getDependencies,
}: {
  modalClose: any;
  initDependenciesList: Array<initDependenciesListType>;
  selectObj: any;
  getDependencies: any;
}) {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [keyword, setKeyword] = useState('');

  const onCloseModal = (e: any) => {
    // console.log('e.target: ', e.target);
    // console.log('e.tarcurrentTargetget: ', e.currentTarget);
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  const autoData = ['web', 'jpa', 'lombok', 'devtools', 'validation'];
  // Handle the onChange event of the select
  const getDependenciesData = useCallback(
    (item: any) => {
      console.log(item);
      const sampleData = [...selectObj.depDatas];
      const findIdx = sampleData.findIndex((x: any) => x === item.id);
      console.log(findIdx);
      if (findIdx >= 0) {
        sampleData.splice(findIdx, 1);
      } else {
        sampleData.push(item.id);
      }
      console.log(sampleData);
      getDependencies(sampleData);
    },
    [selectObj, initDependenciesList],
  );

  const onKeywordChange = useCallback(
    (e: any) => {
      const lowerKeyword = e.target.value.toLowerCase();
      setKeyword(e.target.value);
      const copyArr: any[] = [...initDependenciesList].filter(
        (item: any) => item.name.toLowerCase().indexOf(lowerKeyword) >= 0,
      );
      if (e.target.value === '') setSearchResult([...initDependenciesList]);
      else setSearchResult(copyArr);
    },
    [keyword],
  );

  useEffect(() => {
    setSearchResult([...initDependenciesList]);
  }, []);
  return (
    <div className="modal-container" onClick={onCloseModal}>
      <div className="modal">
        <div className="buildmodal-title-wrapper">
          <input
            placeholder="검색어를 입력하세요."
            onChange={onKeywordChange}
            value={keyword}
          />

          <button
            type="button"
            className="buildmodal-button"
            onClick={modalClose}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>

        <div className="dependencies-select">
          <ul className="dependencies-ul">
            {searchResult.map(
              (item, idx) =>
                !autoData.includes(item.id) && (
                  <li
                    key={idx}
                    onClick={() => getDependenciesData(item)}
                    value={idx}
                    className={`dependencies-button ${
                      selectObj.depDatas.includes(item.id) && 'select'
                    }`}
                  >
                    <div className="dependencies-name">{item.name}</div>
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Modal;
