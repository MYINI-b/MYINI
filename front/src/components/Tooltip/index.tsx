import { useState, useCallback } from 'react';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

interface Props {
  children: any;
  text: string;
}

export default function Tooltip({ children, text }: Props) {
  const [isTextOpen, setIsTextOpen] = useState(false);

  const onIconClick = useCallback((e: any) => {
    e.stopPropagation();
    setIsTextOpen(true);
  }, []);

  return (
    <div className="tooltip-div">
      {isTextOpen && (
        <div className="tooltip-empty" onClick={() => setIsTextOpen(false)} />
      )}
      {children}
      <div className="tooltip-icon-abs">
        <div className="tooltip-icon-rel">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className={`tooltip-icon ${isTextOpen && 'open'}`}
            onClick={onIconClick}
          />
          <div
            className={`tooltip-text ${isTextOpen && 'open'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tooltip-balloon">{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
