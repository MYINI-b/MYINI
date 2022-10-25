import { Dispatch, SetStateAction, useRef, useEffect } from 'react';
import './style.scss';

interface MousePos {
  x: number;
  y: number;
}

interface Props {
  setIsRowModalOpen: Dispatch<SetStateAction<boolean>>;
  clickMousePos: MousePos;
}

export default function RowModal({ setIsRowModalOpen, clickMousePos }: Props) {
  const modalContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    modalContainer.current.style.left = `${clickMousePos.x}px`;
    modalContainer.current.style.top = `${clickMousePos.y}px`;
  }, [clickMousePos]);

  const closeModal = () => {
    setIsRowModalOpen(false);
  };

  return (
    <div
      className="rowmodal-container"
      onClick={closeModal}
      role="article"
      onKeyDown={() => {}}
    >
      <div
        className="rowmodal-content-container"
        ref={modalContainer}
        onClick={(e: any) => e.stopPropagation()}
        role="article"
        onKeyDown={() => {}}
      >
        <p className="rowmodal-menu">행 삭제</p>
        <p className="rowmodal-menu">되돌리기</p>
      </div>
    </div>
  );
}
