import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { useSyncedStore } from '@syncedstore/react';

import { globalStore } from 'store/yjsStore';
import RowList from './RowList';

export default function Requirement() {
  const store = useSyncedStore(globalStore);

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

        <RowList store={store} />
      </section>
    </div>
  );
}
