import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useCallback, Dispatch, useRef, useEffect } from 'react';

import './style.scss';

interface ElementPos {
  x: number;
  y: number;
  width: number;
}

interface Props {
  categories: string[];
  setCategories: Dispatch<React.SetStateAction<string[]>>;
  categoryInput: string;
  setCategoryInput: Dispatch<React.SetStateAction<string>>;
  closeCategoryList: () => void;
  clickElementPos: ElementPos;
}

export default function CategoryListModal({
  categories,
  setCategories,
  categoryInput,
  setCategoryInput,
  closeCategoryList,
  clickElementPos,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

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
                className="category-row"
                key={i}
                onClick={(e) => e.stopPropagation()}
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
