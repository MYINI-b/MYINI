import { useCallback } from 'react';
import './style.scss';

interface Props {
  img: string;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
}

export default function LinkRow({ img, link, setLink }: Props) {
  const onLinkChange = useCallback((e: any) => {
    setLink(e.target.value);
  }, []);

  return (
    <a
      className="link-row-container"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className="image-icon" src={img} alt="git" />
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
    </a>
  );
}
