import React, { useEffect } from 'react';
import './Modal.scss';
type IPropsType = {
  onClose: any,
  children: any
};

export const Modal = ({onClose, children }: IPropsType ) => {
  const focusedElementBeforeModal = document.activeElement as HTMLElement;

  useEffect(() => {
    const focusableElementsString: string = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    const focusableElements: HTMLElement[] = Array.from((document.querySelector('.Modal') as HTMLElement).querySelectorAll(focusableElementsString));
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    firstFocusable && firstFocusable.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'Escape') {
        closeModal();
      }
      if (e.key === 'Tab') {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        } else if (document.activeElement === firstFocusable && e.shiftKey) {
          e.preventDefault();
          lastFocusable.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const closeModal = () => {
    focusedElementBeforeModal.focus();
    onClose();
  }

  return (
    <div className="Modal">
      <div className="modal-dialog zoomInUp">
        {children}
      </div>
      <div className="modal-backdrop" onClick={closeModal}></div>
    </div>
  )
};