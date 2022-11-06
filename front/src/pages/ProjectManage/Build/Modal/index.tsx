import React from 'react';
import './style.scss';

const Modal = ({modalClose}: {modalClose: any}) => {

  const onCloseModal = (e: any) => {
    console.log('e.target: ', e.target)
    console.log('e.tarcurrentTargetget: ', e.currentTarget)
    if(e.target === e.currentTarget){
        modalClose()
    }
  }
  return (
      <div className="modal__container" onClick={onCloseModal}>
        <div className="modal">
          <div>dd</div>
          <button className="modal__button" onClick={modalClose}> Modal Close</button>
        </div>
      </div>
  )
}

export default Modal