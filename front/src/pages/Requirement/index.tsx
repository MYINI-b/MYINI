import './style.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';

export default function Requirement() {
  return (
    <>
      {' '}
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
            <h5 className="table-col one">ID</h5>
            <h5 className="table-col one-half">카테고리</h5>
            <h5 className="table-col one-half">요구사항 명</h5>
            <h5 className="table-col two">내용</h5>
            <h5 className="table-col one">구분</h5>
            <h5 className="table-col one">담당자</h5>
            <h5 className="table-col one">중요도</h5>
            <h5 className="table-col one">포인트</h5>
          </article>
        </section>
      </div>
    </>
  );
}
