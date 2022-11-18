import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useCallback, Dispatch, useRef, useEffect, useState } from 'react';

import { RootState } from 'modules/Reducers';
import { useSelector } from 'react-redux';
import './style.scss';
import { deleteApi, postApi, putApi } from 'api';
import { ELEMENTPOS, ROW, CATEGORY } from 'types/Requirement';
import TimerModal from 'components/TimerModal';

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
  const [alertText, setAlertText] = useState('');
  const { pid } = useSelector((state: RootState) => state.project);

  const deleteCategory = useCallback(
    async (e: any, idx: number, cat: CATEGORY) => {
      e.stopPropagation();

      const deleteResp: any = await deleteApi(
        `/requirementdocs/categories/${cat.id}`,
      );

      if (deleteResp.status === 200) {
        store.pjt.rows.forEach((row: ROW) => {
          if (
            row.category !== undefined &&
            row.category.id === store.pjt.categories[idx].id
          )
            e.category = undefined;
        });
        store.pjt.categories.splice(idx, 1);
      } else {
        setAlertText('이미 요구사항에서 사용하는 카테고리입니다.');
        return;
      }

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
        const { data }: any = await postApi(
          `/requirementdocs/${pid}/categories`,
          body,
        );

        const newCategoryObj = {
          name: body.categoryName,
          color: body.categoryColor,
          id: data.requirementCategoryId,
        };

        store.pjt.rows[idx].category = newCategoryObj;
        store.pjt.categories.push(newCategoryObj);

        selectCategory(newCategoryObj);
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
  const t = store.pjt.categories.length;
  useEffect(() => {
    modalContainer.current.style.left = `${clickElementPos.x}px`;
    modalContainer.current.style.top = `${clickElementPos.y}px`;
    modalContainer.current.style.width = `${clickElementPos.width}px`;

    if (clickElementPos.y + 40 + t * 28 >= window.innerHeight - 30 && t < 8) {
      modalContainer.current.style.top = `${
        clickElementPos.y - (t * 28 + 40)
      }px`;
    } else if (
      clickElementPos.y + 40 + t * 28 >= window.innerHeight - 30 &&
      t >= 8
    ) {
      modalContainer.current.style.top = `${clickElementPos.y - 250}px`;
      console.log(modalContainer.current.style.top);
    }
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

      {!!alertText && <TimerModal text={alertText} setText={setAlertText} />}
    </div>
  );
}
