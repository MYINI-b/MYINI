import './style.scss';
import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

import { ELEMENTPOS } from 'types/Requirement';
import TableRow from './TableRow';
import CategoryListModal from './CategoryListModal';

export default function Requirement() {
  const [step, setStep] = useState(1);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');
  const [categories, setCategories] = useState(['회원', '프로젝트', 'ERD']);
  const [clickElementPos, setClickElementPos] = useState<ELEMENTPOS>({
    x: 0,
    y: 0,
    width: 0,
  });
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

  const closeCategoryList = useCallback(() => {
    setIsCategoryListOpen(false);
  }, []);

  const openCategoryList = useCallback((e: any) => {
    setIsCategoryListOpen(true);
    setClickElementPos({
      y: e.target.getBoundingClientRect().top + 40,
      x: e.target.getBoundingClientRect().left,
      width: e.target.offsetWidth,
    });
  }, []);

  return (
    <>
      <div className="requirement-container">
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
              onClick={openCategoryList}
            >
              카테고리
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
              return <TableRow row={e} key={e.id} />;
            })}
            <button className="table-more-button" type="button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </article>
        </section>
      </div>
      {isCategoryListOpen && (
        <CategoryListModal
          categories={categories}
          setCategories={setCategories}
          categoryInput={categoryInput}
          setCategoryInput={setCategoryInput}
          closeCategoryList={closeCategoryList}
          clickElementPos={clickElementPos}
        />
      )}
    </>
  );
}
