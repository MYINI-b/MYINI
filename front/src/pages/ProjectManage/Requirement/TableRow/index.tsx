import { useState, Dispatch, useCallback, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faGripLines,
} from '@fortawesome/free-solid-svg-icons';
import { ROW, ELEMENTPOS } from 'types/Requirement';
import { MOUSEPOS } from 'types/ApiSpec';

import useInput from 'hooks/useInput';
import CategoryListModal from '../CategoryListModal';
import RowModal from '../RowModal';

interface Props {
  row: ROW;
  rows: ROW[];
  setRows: Dispatch<React.SetStateAction<ROW[]>>;
  idx: number;
}

export default function TableRow({ row, rows, setRows, idx }: Props) {
  const requireContainer =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const contentContainer =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const [isRowModalOpen, setIsRowModalOpen] = useState(false);
  const [clickMousePos, setClickMousePos] = useState<MOUSEPOS>({ x: 0, y: 0 });
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [isRequireEdit, setIsRequireEdit] = useState(false);
  const [requirement, onRequirementChange] = useInput('');
  const [categories, setCategories] = useState(['회원', '프로젝트', 'ERD']);
  const [clickElementPos, setClickElementPos] = useState<ELEMENTPOS>({
    x: 0,
    y: 0,
    width: 0,
  });

  const onRightClick = (e: any) => {
    e.preventDefault();
    setClickMousePos({ x: e.clientX, y: e.clientY });
    setIsRowModalOpen(true);
  };

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

  const focusOutRequirement = useCallback(() => {
    setIsRequireEdit(false);
    const copyRows = [...rows];
    copyRows[idx].requirement = requirement;
    setRows(copyRows);
  }, [rows, idx]);

  useEffect(() => {
    if (requireContainer.current)
      requireContainer.current.addEventListener(
        'focusout',
        focusOutRequirement,
      );
    return () => {
      if (requireContainer.current)
        requireContainer.current.removeEventListener(
          'focusout',
          focusOutRequirement,
        );
    };
  }, [isRequireEdit]);

  return (
    <div className="table-row" onContextMenu={onRightClick}>
      <span className="table-col content one">{row.id}</span>
      <span className="table-col content one-half" onClick={openCategoryList}>
        <div className="desc-block" onClick={(e) => e.stopPropagation()}>
          {row.category}
        </div>
      </span>
      {isRequireEdit ? (
        <textarea
          value={requirement}
          ref={requireContainer}
          onChange={onRequirementChange}
          className="table-col content one-half textarea"
        />
      ) : (
        <span
          className="table-col content one-half"
          onDoubleClick={() => setIsRequireEdit(true)}
        >
          {row.requirement}
        </span>
      )}

      <span className="table-col content two">{row.description}</span>
      <span className="table-col content one">
        <div className={`desc-block ${row.division}`}>{row.division}</div>
      </span>
      <span className="table-col content one">{row.manager}</span>
      <span className="table-col content one">
        {row.importance === 1 ? (
          <div className="double-chevron">
            <FontAwesomeIcon icon={faChevronUp} />
            <FontAwesomeIcon icon={faChevronUp} />
          </div>
        ) : row.importance === 2 ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : row.importance === 3 ? (
          <FontAwesomeIcon icon={faGripLines} />
        ) : row.importance === 4 ? (
          <FontAwesomeIcon icon={faChevronDown} />
        ) : row.importance === 5 ? (
          <div className="double-chevron">
            <FontAwesomeIcon icon={faChevronDown} />
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        ) : (
          ''
        )}
      </span>
      <span className="table-col content one">{row.point}</span>

      {isRowModalOpen && (
        <RowModal
          setIsRowModalOpen={setIsRowModalOpen}
          clickMousePos={clickMousePos}
        />
      )}

      {isCategoryListOpen && (
        <CategoryListModal
          categories={categories}
          setCategories={setCategories}
          closeCategoryList={closeCategoryList}
          clickElementPos={clickElementPos}
          rows={rows}
          setRows={setRows}
          idx={idx}
        />
      )}
    </div>
  );
}
