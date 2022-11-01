import { useCallback, Dispatch } from 'react';
import { API_METHOD } from 'constants/index';
import './style.scss';

interface Props {
  setIsApiMethodListOpen: Dispatch<React.SetStateAction<boolean>>;
  apiMethod: string;
  setApiMethod: Dispatch<React.SetStateAction<string>>;
}

export default function ApiMethodList({
  setIsApiMethodListOpen,
  apiMethod,
  setApiMethod,
}: Props) {
  const closeModal = useCallback(() => {
    setIsApiMethodListOpen(false);
  }, []);

  const onSelectMethod = useCallback((method: string) => {
    setApiMethod(method);
    setIsApiMethodListOpen(false);
  }, []);

  return (
    <div className="api-method-list-container" onClick={closeModal}>
      <div
        className="api-method-list-content"
        onClick={(e) => e.stopPropagation()}
      >
        {API_METHOD.map((method: string, i: number) => (
          <li
            className={`api-method-li ${method.toLowerCase()} ${
              method === apiMethod && 'select'
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
