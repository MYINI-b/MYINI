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

import CategoryListModal from '../CategoryListModal';
import RowModal from '../RowModal';
import DivisionModal from '../DivisionModal';
import ManagerModal from '../ManagerModal';
import ImportanceModal from '../ImportanceModal';

interface Props {
  row: ROW;
  idx: number;
  store: any;
}

export default function TableRow({ row, idx, store }: Props) {
  const requireContainer =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const descContainer = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const pointContainer = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [isRowModalOpen, setIsRowModalOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isImportanceOpen, setIsImportanceOpen] = useState(false);
  const [clickMousePos, setClickMousePos] = useState<MOUSEPOS>({ x: 0, y: 0 });
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [isRequireEdit, setIsRequireEdit] = useState(false);
  const [isDescEdit, setIsDescEdit] = useState(false);
  const [isDivisionOpen, setIsDivisionOpen] = useState(false);
  const [isPointEdit, setIsPointEdit] = useState(false);

  const [clickElementPos, setClickElementPos] = useState<ELEMENTPOS>({
    x: 0,
    y: 0,
    width: 0,
  });

  const onRequirementChange = useCallback(
    (e: any) => {
      store.pjt.rows[idx].requirement = e.target.value;
    },
    [idx, store],
  );

  const onDescChange = useCallback(
    (e: any) => {
      store.pjt.rows[idx].description = e.target.value;
    },
    [idx, store],
  );

  const onPointChange = useCallback(
    (e: any) => {
      store.pjt.rows[idx].point = e.target.value;
    },
    [idx, store],
  );

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

  const openCategoryList = useCallback((e: any, isBlock: boolean) => {
    e.stopPropagation();
    setIsCategoryListOpen(true);
    setClickElementPos({
      y: isBlock
        ? e.target.parentElement.getBoundingClientRect().top + 40
        : e.target.getBoundingClientRect().top + 40,
      x: isBlock
        ? e.target.parentElement.getBoundingClientRect().left
        : e.target.getBoundingClientRect().left,
      width: isBlock
        ? e.target.parentElement.offsetWidth
        : e.target.offsetWidth,
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

  const openDivisionList = useCallback((e: any, isBlock: boolean) => {
    e.stopPropagation();
    setIsDivisionOpen(true);
    setClickElementPos({
      y: isBlock
        ? e.target.parentElement.getBoundingClientRect().top + 40
        : e.target.getBoundingClientRect().top + 40,
      x: isBlock
        ? e.target.parentElement.getBoundingClientRect().left
        : e.target.getBoundingClientRect().left,
      width: isBlock
        ? e.target.parentElement.offsetWidth
        : e.target.offsetWidth,
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
    setIsDescEdit(false);
  }, [store]);

  const focusOutRequirement = useCallback(() => {
    setIsRequireEdit(false);
  }, [store]);

  const focusOutPoint = useCallback(() => {
    setIsPointEdit(false);
  }, [store]);

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

  useEffect(() => {
    if (pointContainer.current)
      pointContainer.current.addEventListener('focusout', focusOutPoint);

    return () => {
      if (pointContainer.current)
        pointContainer.current.removeEventListener('focusout', focusOutPoint);
    };
  }, [isPointEdit]);

  useEffect(() => {
    if (descContainer.current)
      descContainer.current.addEventListener('focusout', focusOutDesc);

    return () => {
      if (descContainer.current)
        descContainer.current.removeEventListener('focusout', focusOutDesc);
    };
  }, [isDescEdit]);

  return (
    <div className="table-row" onContextMenu={onRightClick}>
      <span className="table-col content one">{idx + 1}</span>
      <span
        className="table-col content one-half"
        onClick={(e) => openCategoryList(e, false)}
      >
        <div
          className="desc-block"
          style={{
            backgroundColor:
              row.category === undefined ? '' : row.category.color,
          }}
          onClick={(e) => openCategoryList(e, true)}
        >
          {row.category === undefined ? '' : row.category.name}
        </div>
      </span>
      {isRequireEdit ? (
        <textarea
          value={row.requirement}
          ref={requireContainer}
          onChange={onRequirementChange}
          className="table-col content one-half textarea"
          autoFocus
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
          value={row.description}
          ref={descContainer}
          onChange={onDescChange}
          className="table-col content two textarea"
          autoFocus
        />
      ) : (
        <span
          className="table-col content two"
          onDoubleClick={() => setIsDescEdit(true)}
        >
          {row.description}
        </span>
      )}
      <span
        className="table-col content one"
        onClick={(e) => openDivisionList(e, false)}
      >
        <div
          className={`desc-block ${row.division}`}
          onClick={(e) => openDivisionList(e, true)}
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
      <span
        className="table-col content one"
        onDoubleClick={() => setIsPointEdit(true)}
      >
        {isPointEdit ? (
          <input
            type="number"
            value={row.point}
            onChange={onPointChange}
            className="point-input"
            ref={pointContainer}
            autoFocus
          />
        ) : (
          row.point
        )}
      </span>

      {isRowModalOpen && (
        <RowModal
          setIsRowModalOpen={setIsRowModalOpen}
          clickMousePos={clickMousePos}
          idx={idx}
          store={store}
        />
      )}

      {isCategoryListOpen && (
        <CategoryListModal
          closeCategoryList={closeCategoryList}
          clickElementPos={clickElementPos}
          idx={idx}
          store={store}
          row={row}
        />
      )}

      {isDivisionOpen && (
        <DivisionModal
          setIsDivisionOpen={setIsDivisionOpen}
          clickElementPos={clickElementPos}
          idx={idx}
          store={store}
        />
      )}

      {isManagerOpen && (
        <ManagerModal
          closeManagerModal={closeManagerModal}
          clickElementPos={clickElementPos}
          idx={idx}
          store={store}
        />
      )}

      {isImportanceOpen && (
        <ImportanceModal
          setIsImportanceOpen={setIsImportanceOpen}
          clickElementPos={clickElementPos}
          idx={idx}
          store={store}
        />
      )}
    </div>
  );
}
