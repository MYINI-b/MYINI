import './style.scss';
import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { ROW } from 'types/Requirement';

import TableRow from './TableRow';

export default function Requirement() {
  const [rows, setRows] = useState<ROW[]>([]);

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
          <h5 className="table-col title one-half category-container">
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
            return (
              <TableRow row={e} key={i} rows={rows} setRows={setRows} idx={i} />
            );
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
  );
}
