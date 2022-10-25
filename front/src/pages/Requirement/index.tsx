import './style.scss';
import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

import TableRow from './TableRow';
import RowModal from './RowModal';

export default function Requirement() {
  const [isRowModalOpen, setIsRowModalOpen] = useState(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');
  const [categories, setCategories] = useState(['회원', '프로젝트', 'ERD']);
  const rows = [
    {
      id: 1,
      category: '회원',
      requirement: '로그인을 한다',
      description:
        '로그인모달창을 만든다. 내용을 몇 줄이나 적어야 할지 모르겠는데 그냥 계속 이렇게 늘어나게 만들면 되려나',
      division: 'FE',
      manager: '한윤석',
      importance: 1,
      point: 4,
    },
    {
      id: 2,
      category: '회원',
      requirement: '로그인을 한다',
      description:
        '로그인모달창을 만든다. 내용을 몇 줄이나 적어야 할지 모르겠는데 그냥 계속 이렇게 늘어나게 만들면 되려나',
      division: 'FE',
      manager: '한윤석',
      importance: 2,
      point: 4,
    },
    {
      id: 3,
      category: '회원',
      requirement: '로그인을 한다',
      description:
        '로그인모달창을 만든다. 내용을 몇 줄이나 적어야 할지 모르겠는데 그냥 계속 이렇게 늘어나게 만들면 되려나',
      division: 'FE',
      manager: '한윤석',
      importance: 3,
      point: 4,
    },
    {
      id: 4,
      category: '회원',
      requirement: '로그인을 한다',
      description:
        '로그인모달창을 만든다. 내용을 몇 줄이나 적어야 할지 모르겠는데 그냥 계속 이렇게 늘어나게 만들면 되려나',
      division: 'FE',
      manager: '한윤석',
      importance: 4,
      point: 4,
    },
    {
      id: 5,
      category: '회원',
      requirement: '로그인을 한다',
      description:
        '로그인모달창을 만든다. 내용을 몇 줄이나 적어야 할지 모르겠는데 그냥 계속 이렇게 늘어나게 만들면 되려나',
      division: 'FE',
      manager: '한윤석',
      importance: 5,
      point: 4,
    },
    {
      id: 6,
      category: '회원',
      requirement: '로그인을 한다',
      description:
        '로그인모달창을 만든다. 내용을 몇 줄이나 적어야 할지 모르겠는데 그냥 계속 이렇게 늘어나게 만들면 되려나',
      division: 'FE',
      manager: '한윤석',
      importance: 1,
      point: 4,
    },
    {
      id: 7,
      category: '회원',
      requirement: '로그인을 한다',
      description:
        '로그인모달창을 만든다. 내용을 몇 줄이나 적어야 할지 모르겠는데 그냥 계속 이렇게 늘어나게 만들면 되려나',
      division: 'FE',
      manager: '한윤석',
      importance: 1,
      point: 4,
    },
  ];

  const addNewCategory = (e: any) => {
    if (e.key === 'Enter') {
      setCategories([...categories, categoryInput]);
      setCategoryInput('');
      e.target.value = '';
    }
  };

  const onChangeCategoryInput = useCallback((e: any) => {
    setCategoryInput(e.target.value);
  }, []);

  const deleteCategory = useCallback(
    (idx: number) => {
      const copyCategories = [...categories];
      copyCategories.splice(idx, 1);
      setCategories(copyCategories);
    },
    [categories],
  );

  return (
    <>
      <div className="header" />
      <div className="requirement-container">
        <section className="requirement-stepper-container">
          <div className="stepper-btn-wrapper">
            <button type="button" className="stepper-btn">
              <span className="stepper-arrow left" />
            </button>
            <p className="stepper-btn-text">요구사항 명세서</p>
          </div>

          <div className="stepper-step-wrapper">s</div>

          <div className="stepper-btn-wrapper">
            <button type="button" className="stepper-btn">
              <span className="stepper-arrow right" />
            </button>
          </div>
        </section>

        <h1 className="requirement-title">요구사항명세서</h1>

        <section className="requirement-info-section">
          <h3 className="requirement-project-title">PROJECT NAME</h3>
          <button className="requirement-save-button" type="button">
            <FontAwesomeIcon icon={faSave} />
          </button>
        </section>

        <section className="requirement-table-section">
          <article className="table-title-article">
            <h5 className="table-col title one">ID</h5>
            <h5
              className="table-col title one-half category-container"
              onClick={() => setIsCategoryListOpen(true)}
              onKeyDown={() => {}}
            >
              카테고리
              {isCategoryListOpen && (
                <div className="category-list-container">
                  <input
                    type="text"
                    className="category-search-input"
                    placeholder="카테고리 등록"
                    onChange={onChangeCategoryInput}
                    onKeyDown={addNewCategory}
                  />
                  {categories.map((e, i) => {
                    return (
                      <span className="category-row" key={i}>
                        {e}
                        <FontAwesomeIcon
                          icon={faClose}
                          className="category-delete-button"
                          onClick={() => deleteCategory(i)}
                        />
                      </span>
                    );
                  })}
                </div>
              )}
            </h5>
            <h5 className="table-col title one-half">요구사항 명</h5>
            <h5 className="table-col title two">내용</h5>
            <h5 className="table-col title one">구분</h5>
            <h5 className="table-col title one">담당자</h5>
            <h5 className="table-col title one">중요도</h5>
            <h5 className="table-col title one">포인트</h5>
          </article>

          <article className="table-content-article">
            {rows.map((e) => {
              return (
                <TableRow
                  row={e}
                  setIsRowModalOpen={setIsRowModalOpen}
                  key={e.id}
                />
              );
            })}
            <button className="table-more-button" type="button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </article>
        </section>
      </div>

      {isRowModalOpen && <RowModal setIsRowModalOpen={setIsRowModalOpen} />}
    </>
  );
}
