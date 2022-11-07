import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useCallback, Dispatch, useRef, useEffect, useState } from 'react';

import './style.scss';
import { deleteApi, postApi, putApi } from 'api';
import { ELEMENTPOS, ROW, CATEGORY } from 'types/Requirement';

interface Props {
  closeCategoryList: () => void;
  clickElementPos: ELEMENTPOS;
  idx: number;
  store: any;
  row: ROW;
}

export default function CategoryListModal({
  closeCategoryList,
  clickElementPos,
  idx,
  store,
  row,
}: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [categoryInput, setCategoryInput] = useState('');
  const { pid } = useParams();

  const deleteCategory = useCallback(
    async (e: any, idx: number, cat: CATEGORY) => {
      e.stopPropagation();

      await deleteApi(`/requirementdocs/categories/${cat.id}`);

      store.pjt.rows.forEach((row: ROW) => {
        if (
          row.category !== undefined &&
          row.category.id === store.pjt.categories[idx].id
        )
          e.category = undefined;
      });
      store.pjt.categories.splice(idx, 1);
      closeCategoryList();
    },
    [store],
  );

  const addNewCategory = useCallback(
    async (e: any) => {
      if (e.key === 'Enter') {
        const body = {
          categoryName: categoryInput,
          categoryColor: `#${Math.round(Math.random() * 0xffffff).toString(
            16,
          )}`,
        };
        const resp: any = await postApi(
          `/requirementdocs/${pid}/categories`,
          body,
        );

        store.pjt.rows[idx].category = body;
        store.pjt.categories.push(body);

        setCategoryInput('');
        closeCategoryList();
      }
    },
    [store, categoryInput],
  );

  const onChangeCategoryInput = useCallback(
    (e: any) => {
      setCategoryInput(e.target.value);
    },
    [setCategoryInput],
  );

  const selectCategory = useCallback(
    async (cat: CATEGORY) => {
      const reqId = row.id;
      const body = {
        categoryId: cat.id,
      };
      const { data }: any = await putApi(
        `/requirementdocs/requirements/${reqId}/categories`,
        body,
      );

      console.log(data);

      store.pjt.rows[idx].category = { ...cat };
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
            store.pjt.categories.map((cat: CATEGORY, i: number) => {
              return (
                <span
                  className={`category-row ${
                    store.pjt.rows[idx].category === cat.name && 'select'
                  }`}
                  key={i}
                  onClick={() => selectCategory(cat)}
                >
                  {cat.name}
                  <FontAwesomeIcon
                    icon={faClose}
                    className="category-delete-button"
                    onClick={(e: any) => deleteCategory(e, i, cat)}
                  />
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}
