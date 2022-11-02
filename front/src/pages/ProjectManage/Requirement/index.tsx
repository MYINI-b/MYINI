import './style.scss';
import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

import { ELEMENTPOS, ROW } from 'types/Requirement';
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
  const [rows, setRows] = useState<ROW[]>([]);

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

  const addTableRow = useCallback(() => {
    const copyRows = [...rows];
    copyRows.push({
      id: 1,
      category: '',
      requirement: '',
      description: '',
      division: '',
      manager: '',
      importance: 0,
      point: 0,
    });
    setRows(copyRows);
  }, [rows]);

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
            {rows.map((e, i: number) => {
              return <TableRow row={e} key={i} setRows={setRows} />;
            })}
            <button
              className="table-more-button"
              type="button"
              onClick={addTableRow}
            >
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
