import { useState, Dispatch, useCallback, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faGripLines,
} from '@fortawesome/free-solid-svg-icons';
import { ROW, ELEMENTPOS } from 'types/Requirement';
import { MOUSEPOS } from 'types/ApiSpec';
import { IMPORTANCE_TEXT } from 'constants/index';

import useInput from 'hooks/useInput';
import Highest from 'assets/highest.png';
import Lowest from 'assets/lowest.png';
import CategoryListModal from '../CategoryListModal';
import RowModal from '../RowModal';
import DivisionModal from '../DivisionModal';
import ManagerModal from '../ManagerModal';
import ImportanceModal from '../ImportanceModal';

interface Props {
  row: ROW;
  rows: ROW[];
  setRows: Dispatch<React.SetStateAction<ROW[]>>;
  idx: number;
}

export default function TableRow({ row, rows, setRows, idx }: Props) {
  const requireContainer =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const descContainer = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const [isRowModalOpen, setIsRowModalOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isImportanceOpen, setIsImportanceOpen] = useState(false);
  const [clickMousePos, setClickMousePos] = useState<MOUSEPOS>({ x: 0, y: 0 });
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [isRequireEdit, setIsRequireEdit] = useState(false);
  const [isDescEdit, setIsDescEdit] = useState(false);
  const [isDivisionOpen, setIsDivisionOpen] = useState(false);
  const [requirement, onRequirementChange] = useInput('');
  const [desc, onDescChange] = useInput('');
  const [categories, setCategories] = useState<string[]>([]);
  const [managers, setManagers] = useState<string[]>([]);
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

  const closeManagerModal = useCallback(() => {
    setIsManagerOpen(false);
  }, []);

  const openCategoryList = useCallback((e: any) => {
    setIsCategoryListOpen(true);
    setClickElementPos({
      y: e.target.getBoundingClientRect().top + 40,
      x: e.target.getBoundingClientRect().left,
      width: e.target.offsetWidth,
    });
  }, []);

  const openManagerList = useCallback((e: any) => {
    setIsManagerOpen(true);
    setClickElementPos({
      y: e.target.getBoundingClientRect().top + 40,
      x: e.target.getBoundingClientRect().left,
      width: e.target.offsetWidth,
    });
  }, []);

  const openDivisionList = useCallback((e: any) => {
    setIsDivisionOpen(true);
    setClickElementPos({
      y: e.target.getBoundingClientRect().top + 40,
      x: e.target.getBoundingClientRect().left,
      width: e.target.offsetWidth,
    });
  }, []);

  const openImportanceList = useCallback((e: any) => {
    setIsImportanceOpen(true);
    setClickElementPos({
      y: e.target.getBoundingClientRect().top + 40,
      x: e.target.getBoundingClientRect().left,
      width: e.target.offsetWidth,
    });
  }, []);

  const focusOutDesc = useCallback(() => {
    const copyRows = [...rows];
    copyRows[idx].description = desc;
    setRows(copyRows);
    setIsDescEdit(false);
  }, [rows, idx, desc]);

  const focusOutRequirement = useCallback(() => {
    const copyRows = [...rows];
    copyRows[idx].requirement = requirement;
    setRows(copyRows);
    setIsRequireEdit(false);
  }, [rows, idx, requirement]);

  useEffect(() => {
    if (requireContainer.current)
      requireContainer.current.addEventListener(
        'focusout',
        focusOutRequirement,
      );

    const copyRows = [...rows];
    copyRows[idx].requirement = requirement;

    setRows(copyRows);
    return () => {
      if (requireContainer.current)
        requireContainer.current.removeEventListener(
          'focusout',
          focusOutRequirement,
        );
    };
  }, [isRequireEdit]);

  useEffect(() => {
    if (descContainer.current)
      descContainer.current.addEventListener('focusout', focusOutDesc);

    const copyRows = [...rows];
    copyRows[idx].description = desc;

    setRows(copyRows);
    return () => {
      if (descContainer.current)
        descContainer.current.removeEventListener('focusout', focusOutDesc);
    };
  }, [isDescEdit]);

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
      {isDescEdit ? (
        <textarea
          value={desc}
          ref={descContainer}
          onChange={onDescChange}
          className="table-col content two textarea"
        />
      ) : (
        <span
          className="table-col content two"
          onDoubleClick={() => setIsDescEdit(true)}
        >
          {row.description}
        </span>
      )}
      <span className="table-col content one" onClick={openDivisionList}>
        <div
          className={`desc-block ${row.division}`}
          onClick={(e) => e.stopPropagation()}
        >
          {row.division}
        </div>
      </span>
      <span className="table-col content one" onClick={openManagerList}>
        {row.manager}
      </span>
      <span className="table-col content one" onClick={openImportanceList}>
        {row.importance === 1 ? (
          <div className="double-chevron" onClick={(e) => e.stopPropagation()}>
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
          <div className="double-chevron" onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faChevronDown} />
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        ) : (
          ''
        )}
        &nbsp;&nbsp;{IMPORTANCE_TEXT[row.importance]}
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

      {isDivisionOpen && (
        <DivisionModal
          setIsDivisionOpen={setIsDivisionOpen}
          clickElementPos={clickElementPos}
          rows={rows}
          setRows={setRows}
          idx={idx}
        />
      )}

      {isManagerOpen && (
        <ManagerModal
          managers={managers}
          setManagers={setManagers}
          closeManagerModal={closeManagerModal}
          clickElementPos={clickElementPos}
          rows={rows}
          setRows={setRows}
          idx={idx}
        />
      )}

      {isImportanceOpen && (
        <ImportanceModal
          setIsImportanceOpen={setIsImportanceOpen}
          clickElementPos={clickElementPos}
          rows={rows}
          setRows={setRows}
          idx={idx}
        />
      )}
    </div>
  );
}
