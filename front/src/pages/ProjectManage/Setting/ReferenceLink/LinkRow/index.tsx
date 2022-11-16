import { useCallback, useEffect, useState } from 'react';
import { LINK_LIST } from 'constants/index';
import './style.scss';

interface Props {
  idx: number;
  link: string;
  isEdit: boolean;
  store: any;
}

export default function LinkRow({ idx, link, isEdit, store }: Props) {
  const onLinkChange = useCallback(
    (e: any) => {
      if (idx === 0) store.pjt.gitLink = e.target.value;
      else if (idx === 1) store.pjt.jiraLink = e.target.value;
      else if (idx === 2) store.pjt.notionLink = e.target.value;
      else if (idx === 3) store.pjt.figmaLink = e.target.value;
    },
    [store, idx],
  );

  return (
    <div className="link-row-container">
      <img className="image-icon" src={LINK_LIST[idx].img} alt="git" />

      {isEdit ? (
        <input
          type="text"
          value={link}
          className="link-row-input"
          onChange={onLinkChange}
          placeholder="협업 링크를 작성해주세요!"
        />
      ) : link === '' ? (
        <li className="link-row-a blank"> 협업 링크를 작성해주세요!</li>
      ) : (
        <a className="link-row-a" href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      )}
    </div>
  );
}
