import React, { useState } from 'react';
import './style.scss';

export type initDependenciesListType = {
  name: string;
  description: string;
  id: string;
};

function Modal({
  modalClose,
  initDependenciesList,
  dependenciesData,
  getDependencies,
}: {
  modalClose: any;
  initDependenciesList: Array<initDependenciesListType>;
  dependenciesData: string[];
  getDependencies: any;
}) {
  const onCloseModal = (e: any) => {
    // console.log('e.target: ', e.target);
    // console.log('e.tarcurrentTargetget: ', e.currentTarget);
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  // Handle the onChange event of the select
  const getDependenciesData = (event: React.MouseEvent<HTMLLIElement>) => {
    console.log(initDependenciesList[event.currentTarget.value].id);
    const sampleData = dependenciesData;
    if (
      sampleData &&
      sampleData.includes(initDependenciesList[event.currentTarget.value].id)
    ) {
      for (let i = 0; i < sampleData.length; i++) {
        if (
          sampleData[i] === initDependenciesList[event.currentTarget.value].id
        ) {
          sampleData.splice(i, 1);
          i--;
        }
      }
    } else if (sampleData) {
      sampleData.push(initDependenciesList[event.currentTarget.value].id);
    }
    getDependencies(sampleData);
    // const { selectedOptions }: any =
    //   initDependenciesList[event.currentTarget.value];
    // const newDependenciesData = [];
    // for (let i = 0; selectedOptions && i < selectedOptions.length; i++) {
    //   newDependenciesData.push(
    //     initDependenciesList[event.currentTarget.value].id,
    //   );
    // }
    // console.log(newDependenciesData);
    // setDependenciesData(newDependenciesData);
    console.log(dependenciesData);
  };

  return (
    <div className="modal-container" onClick={onCloseModal}>
      <div className="modal">
        <div>
          <input placeholder="검색은 나중에..Web, Security, JPA, Actuator, Devtools..." />

          <button type="button" className="modal-button" onClick={modalClose}>
            {' '}
            Modal Close
          </button>
        </div>
        {/* <select
          multiple
          size={5}
          onChange={onChangeHandler}
          className="dependencies-select"
        >
          {initDependenciesList.map((item, idx) => (
            <option key={idx} value={item.id} className="dependencies-button">
              <div className="dependencies-name">{item.name}</div>
              <div className="dependencies-description">{item.description}</div>
            </option>
          ))}
        </select> */}

        <div className="dependencies-select">
          <ul className="dependencies-ul">
            {initDependenciesList.map((item, idx) => (
              <li
                key={idx}
                onClick={getDependenciesData}
                value={idx}
                className="dependencies-button"
              >
                <div className="dependencies-name">{item.name}</div>
                {/* <div className="dependencies-description">
                  {item.description}
                </div> */}
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Modal;
