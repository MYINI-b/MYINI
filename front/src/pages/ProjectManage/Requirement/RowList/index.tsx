import { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ROW } from 'types/Requirement';
import TableRow from '../TableRow';

interface Props {
  store: any;
}

export default function RowList({ store }: Props) {
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
    if (store.pjt.rows === undefined) store.pjt.rows = [];
  }, []);

  return (
    <article className="table-content-article">
      {store.pjt.rows &&
        store.pjt.rows.map((e: ROW, i: number) => {
          return <TableRow row={e} key={i} idx={i} store={store} />;
        })}
      <button className="table-more-button" type="button" onClick={addTableRow}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </article>
  );
}
