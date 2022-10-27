import { Dispatch, useCallback } from 'react';

interface Props {
  setIsControllerAddModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function ControllerAddModal({
  setIsControllerAddModalOpen,
}: Props) {
  const closeModal = useCallback(() => {
    setIsControllerAddModalOpen(false);
  }, [setIsControllerAddModalOpen]);

  return (
    <section className="modal-empty" onClick={closeModal}>
      <div
        className="controller-add-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        d
      </div>
    </section>
  );
}
