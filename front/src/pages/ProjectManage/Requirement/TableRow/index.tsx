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
import { putApi } from 'api';

import CategoryListModal from '../CategoryListModal';
import RowModal from '../RowModal';
import DivisionModal from '../DivisionModal';
import ManagerModal from '../ManagerModal';
import ImportanceModal from '../ImportanceModal';

interface Props {
  row: ROW;
  idx: number;
  store: any;
  pid: string;
}

export default function TableRow({ row, idx, store, pid }: Props) {
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
        ? e.target.parentElement.getBoundingClientRect().top + 35
        : e.target.getBoundingClientRect().top + 35,
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
      y: e.target.getBoundingClientRect().top + 35,
      x: e.target.getBoundingClientRect().left,
      width: e.target.offsetWidth,
    });
  }, []);

  const openDivisionList = useCallback((e: any, isBlock: boolean) => {
    e.stopPropagation();
    setIsDivisionOpen(true);
    setClickElementPos({
      y: isBlock
        ? e.target.parentElement.getBoundingClientRect().top + 35
        : e.target.getBoundingClientRect().top + 35,
      x: isBlock
        ? e.target.parentElement.getBoundingClientRect().left
        : e.target.getBoundingClientRect().left,
      width: isBlock
        ? e.target.parentElement.offsetWidth
        : e.target.offsetWidth,
    });
  }, []);

  const openImportanceList = useCallback((e: any, isBlock: boolean) => {
    e.stopPropagation();
    e.preventDefault();
    setIsImportanceOpen(true);
    console.log(e.target);
    setClickElementPos({
      y: isBlock
        ? e.target.parentElement.getBoundingClientRect().top + 35
        : e.target.getBoundingClientRect().top + 35,
      x: isBlock
        ? e.target.parentElement.getBoundingClientRect().left
        : e.target.getBoundingClientRect().left,
      width: isBlock
        ? e.target.parentElement.offsetWidth
        : e.target.offsetWidth,
    });
  }, []);

  const focusOutRequirement = useCallback(async () => {
    const body = {
      requirementName: store.pjt.rows[idx].requirement,
    };
    await putApi(`/requirementdocs/requirements/${row.id}/names`, body);
    setIsRequireEdit(false);
  }, [store, row]);

  const focusOutDesc = useCallback(async () => {
    const body = {
      requirementContent: store.pjt.rows[idx].description,
    };
    await putApi(`/requirementdocs/requirements/${row.id}/contents`, body);
    setIsDescEdit(false);
  }, [store, row]);

  const focusOutPoint = useCallback(async () => {
    const body = {
      requirementStoryPoint: store.pjt.rows[idx].point,
    };
    await putApi(`/requirementdocs/requirements/${row.id}/storypoints`, body);
    setIsPointEdit(false);
  }, [store, row]);

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
          placeholder="요구사항 명"
          autoFocus
        />
      ) : (
        <span
          className={`table-col content one-half ${
            row.requirement === '' && 'empty'
          }`}
          onDoubleClick={() => setIsRequireEdit(true)}
        >
          {row.requirement || '요구사항 명'}
        </span>
      )}
      {isDescEdit ? (
        <textarea
          value={row.description}
          ref={descContainer}
          onChange={onDescChange}
          className="table-col content two textarea"
          placeholder="요구사항 내용을 설명해주세요"
          autoFocus
        />
      ) : (
        <span
          className={`table-col content two ${
            row.description === '' && 'empty'
          }`}
          onDoubleClick={() => setIsDescEdit(true)}
        >
          {row.description || '요구사항 내용을 설명해주세요'}
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
      <span
        className={`table-col content one ${row.manager === '' && 'empty'}`}
        onClick={openManagerList}
      >
        {row.manager || '담당자가 없습니다.'}
      </span>
      <span
        className="table-col content one"
        onClick={(e) => openImportanceList(e, false)}
      >
        {row.importance === 1 ? (
          <div className="double-chevron" onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faChevronUp} className="imp1" />
            <FontAwesomeIcon icon={faChevronUp} className="imp2" />
          </div>
        ) : row.importance === 2 ? (
          <FontAwesomeIcon
            icon={faChevronUp}
            onClick={(e) => e.stopPropagation()}
            className="imp2"
          />
        ) : row.importance === 3 ? (
          <FontAwesomeIcon
            icon={faGripLines}
            onClick={(e) => e.stopPropagation()}
            className="imp3"
          />
        ) : row.importance === 4 ? (
          <FontAwesomeIcon
            icon={faChevronDown}
            onClick={(e) => e.stopPropagation()}
            className="imp4"
          />
        ) : row.importance === 5 ? (
          <div className="double-chevron" onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon icon={faChevronDown} className="imp4" />
            <FontAwesomeIcon icon={faChevronDown} className="imp5" />
          </div>
        ) : (
          ''
        )}
        {/* &nbsp;&nbsp;{IMPORTANCE_TEXT[row.importance]} */}
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
          pid={pid}
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
          rowId={row.id}
        />
      )}

      {isManagerOpen && (
        <ManagerModal
          closeManagerModal={closeManagerModal}
          clickElementPos={clickElementPos}
          idx={idx}
          store={store}
          rowId={row.id}
        />
      )}

      {isImportanceOpen && (
        <ImportanceModal
          setIsImportanceOpen={setIsImportanceOpen}
          clickElementPos={clickElementPos}
          idx={idx}
          store={store}
          rowId={row.id}
        />
      )}
    </div>
  );
}
