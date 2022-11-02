import { useCallback, useEffect, useState } from 'react';
import './style.scss';

interface Props {
  img: string;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}

export default function LinkRow({ img, link, setLink }: Props) {
  const [isEdit, setIsEdit] = useState(true);
  const onLinkChange = useCallback((e: any) => {
    setLink(e.target.value);
  }, []);

  useEffect(() => {
    // if (link === '') setIsEdit(false);
    // else setIsEdit(true);
  }, []);

  return (
    <div className="link-row-container">
      <img className="image-icon" src={img} alt="git" />

      {isEdit ? (
        <input
          type="text"
          value={link}
          className="link-row-input"
          onChange={onLinkChange}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      ) : (
        <a
          className="link-row-input"
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {link}
        </a>
      )}
    </div>
  );
}
