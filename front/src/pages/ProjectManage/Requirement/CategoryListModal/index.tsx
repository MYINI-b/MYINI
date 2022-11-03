import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useCallback, Dispatch, useRef, useEffect, useState } from 'react';

import './style.scss';
import { ELEMENTPOS, ROW } from 'types/Requirement';

interface Props {
  categories: string[];
  setCategories: Dispatch<React.SetStateAction<string[]>>;
  closeCategoryList: () => void;
  clickElementPos: ELEMENTPOS;
  rows: ROW[];
  setRows: Dispatch<React.SetStateAction<ROW[]>>;
  idx: number;
}

export default function CategoryListModal({
  categories,
  setCategories,
  closeCategoryList,
  clickElementPos,
  rows,
  setRows,
  idx,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [categoryInput, setCategoryInput] = useState('');

  const deleteCategory = useCallback(
    (idx: number) => {
      const copyCategories = [...categories];
      copyCategories.splice(idx, 1);
      setCategories(copyCategories);
    },
    [categories, setCategories],
  );

  const addNewCategory = (e: any) => {
    if (e.key === 'Enter') {
      setCategories([...categories, categoryInput]);
      setCategoryInput('');
      e.target.value = '';
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
      const copyRows = [...rows];
      copyRows[idx].category = cat;
      setRows(copyRows);
      closeCategoryList();
    },
    [rows, idx],
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
          {categories.map((e, i) => {
            return (
              <span
                className={`category-row ${
                  rows[idx].category === e && 'select'
                }`}
                key={i}
                onClick={() => selectCategory(e)}
              >
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
      </div>
    </div>
  );
}
