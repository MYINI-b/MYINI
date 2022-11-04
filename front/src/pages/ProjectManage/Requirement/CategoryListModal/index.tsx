import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useCallback, Dispatch, useRef, useEffect, useState } from 'react';

import './style.scss';
import { ELEMENTPOS, ROW } from 'types/Requirement';

interface Props {
  closeCategoryList: () => void;
  clickElementPos: ELEMENTPOS;
  idx: number;
  store: any;
}

export default function CategoryListModal({
  closeCategoryList,
  clickElementPos,
  idx,
  store,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [categoryInput, setCategoryInput] = useState('');

  const deleteCategory = useCallback(
    (e: any, idx: number) => {
      e.stopPropagation();
      store.pjt.rows.forEach((e: ROW) => {
        if (e.category === store.pjt.categories[idx]) e.category = '';
      });
      store.pjt.categories.splice(idx, 1);
      closeCategoryList();
    },
    [store],
  );

  const addNewCategory = (e: any) => {
    if (e.key === 'Enter') {
      store.pjt.rows[idx].category = categoryInput;
      if (store.pjt.categories === undefined) store.pjt.categories = [];
      store.pjt.categories.push(categoryInput);
      setCategoryInput('');
      closeCategoryList();
    }
  };

  const onChangeCategoryInput = useCallback(
    (e: any) => {
      setCategoryInput(e.target.value);
    },
    [setCategoryInput],
  );

  const selectCategory = useCallback(
    (cat: string) => {
      store.pjt.rows[idx].category = cat;
      closeCategoryList();
    },
    [store, idx],
  );

  useEffect(() => {
    modalContainer.current.style.left = `${clickElementPos.x}px`;
    modalContainer.current.style.top = `${clickElementPos.y}px`;
    modalContainer.current.style.width = `${clickElementPos.width}px`;
  }, [clickElementPos]);

  return (
    <div className="category-list-empty" onClick={closeCategoryList}>
      <div
        className="category-list-container"
        onClick={(e) => e.stopPropagation()}
        ref={modalContainer}
      >
        <div className="category-list-overflow">
          <input
            type="text"
            className="category-search-input"
            placeholder="카테고리 등록"
            onChange={onChangeCategoryInput}
            onKeyDown={addNewCategory}
            onClick={(e) => e.stopPropagation()}
          />
          {store.pjt.categories &&
            store.pjt.categories.map((e: string, i: number) => {
              return (
                <span
                  className={`category-row ${
                    store.pjt.rows[idx].category === e && 'select'
                  }`}
                  key={i}
                  onClick={() => selectCategory(e)}
                >
                  {e}
                  <FontAwesomeIcon
                    icon={faClose}
                    className="category-delete-button"
                    onClick={(e: any) => deleteCategory(e, i)}
                  />
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}
