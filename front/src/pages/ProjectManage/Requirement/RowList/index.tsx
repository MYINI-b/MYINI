import { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ROW } from 'types/Requirement';
import TableRow from '../TableRow';

interface Props {
  rows: ROW[];
  setRows: React.Dispatch<React.SetStateAction<ROW[]>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  managers: string[];
  setManagers: React.Dispatch<React.SetStateAction<string[]>>;
  store: any;
}

export default function RowList({
  rows,
  setRows,
  categories,
  setCategories,
  managers,
  setManagers,
  store,
}: Props) {
  const addTableRow = useCallback(() => {
    store.pjt.rows.push({
      category: '',
      requirement: '',
      description: '',
      division: '',
      manager: '',
      importance: 3,
      point: 0,
    });
  }, [store]);

  useEffect(() => {
    if (store.pjt.rows !== undefined) setRows(store.pjt.rows);
  }, [store.pjt.rows]);

  return (
    <article className="table-content-article">
      {!!store.pjt.rows.length &&
        store.pjt.rows.map((e: ROW, i: number) => {
          return (
            <TableRow
              row={e}
              key={i}
              rows={rows}
              setRows={setRows}
              idx={i}
              categories={categories}
              setCategories={setCategories}
              managers={managers}
              setManagers={setManagers}
              store={store}
            />
          );
        })}
      <button className="table-more-button" type="button" onClick={addTableRow}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </article>
  );
}
