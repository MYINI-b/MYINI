import { useCallback, useEffect, useState } from 'react';
import './style.scss';

interface Props {
  img: string;
  link: string;
  isEdit: boolean;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}

export default function LinkRow({ img, link, isEdit, setLink }: Props) {
  const onLinkChange = useCallback((e: any) => {
    setLink(e.target.value);
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
        <a className="link-row-a" href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      )}
    </div>
  );
}
