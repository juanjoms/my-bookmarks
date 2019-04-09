import React, { useEffect } from 'react';
import './Modal.scss';
type IPropsType = {
  onDismiss: any,
  children: any
};

export const Modal = ({onDismiss, children }: IPropsType ) => {
  // Give the focus to the first focusable element
  useEffect(() => {
    const firstFocusable = document.querySelector('input');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }, []);
  // Dismiss the modal when esc key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'Escape') {
        onDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <div className="Modal">
      <div className="modal-dialog zoomInUp">
        {children}
      </div>
      <div className="modal-backdrop" onClick={_ => onDismiss()}></div>
    </div>
  )
};