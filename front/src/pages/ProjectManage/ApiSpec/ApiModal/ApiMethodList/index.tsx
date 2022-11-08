import { useCallback, Dispatch } from 'react';
import { API_METHOD } from 'constants/index';
import './style.scss';

interface Props {
  setIsApiMethodListOpen: Dispatch<React.SetStateAction<boolean>>;
  store: any;
}

export default function ApiMethodList({
  setIsApiMethodListOpen,
  store,
}: Props) {
  const closeModal = useCallback(() => {
    setIsApiMethodListOpen(false);
  }, []);

  const onSelectMethod = useCallback(
    (method: string) => {
      store.pjt.currentAPI.responses.method = method;
      setIsApiMethodListOpen(false);
    },
    [store],
  );

  return (
    <div className="api-method-list-container" onClick={closeModal}>
      <div
        className="api-method-list-content"
        onClick={(e) => e.stopPropagation()}
      >
        {API_METHOD.map((method: string, i: number) => (
          <li
            className={`api-method-li ${method.toLowerCase()} ${
              method === store.pjt.currentAPI.responses.method && 'select'
            }`}
            key={i}
            onClick={() => onSelectMethod(method)}
          >
            {method}
          </li>
        ))}
      </div>
    </div>
  );
}
