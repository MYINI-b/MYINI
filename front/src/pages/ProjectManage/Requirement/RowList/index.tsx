import { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ROW } from 'types/Requirement';
import { postApi } from 'api';
import TableRow from '../TableRow';

interface Props {
  store: any;
  pid: string;
}

export default function RowList({ store, pid }: Props) {
  const addTableRow = useCallback(async () => {
    await postApi(`/requirementdocs/${pid}/requirements`);
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
          return <TableRow row={e} key={i} idx={i} store={store} pid={pid} />;
        })}
      <button className="table-more-button" type="button" onClick={addTableRow}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </article>
  );
}
