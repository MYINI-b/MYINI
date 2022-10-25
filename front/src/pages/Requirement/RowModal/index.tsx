import { Dispatch, SetStateAction } from 'react';
import './style.scss';

interface Props {
  setIsRowModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function RowModal({ setIsRowModalOpen }: Props) {
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
