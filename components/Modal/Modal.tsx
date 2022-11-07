import React, { Fragment } from "react";
import ReactDOM from "react-dom";

export interface Props {
  onClose: () => void;
  children: any;
}

const portalElement = document.getElementById("modal-root") as HTMLElement;

function Modal({ onClose, children }: Props) {
  return (
    <Fragment>
      {/* Backdrop */}
      {ReactDOM.createPortal(
        <div
          className="fixed m-0 p-0 top-0 left-0 w-screen h-[100vh] z-30 bg-black-rgba"
          onClick={onClose}
        />,
        portalElement
      )}
      {/* ModalOverlay */}
      {ReactDOM.createPortal(
        <div className="fixed w-[70%] h-[80%] top-[15%] left-[50%] translate-x-[-50%] bg-black drop-shadow-md z-40 overflow-x-hidden overflow-y-auto">
          <div className="p-0 max-h-[50rem]">{children}</div>
        </div>,
        portalElement
      )}
    </Fragment>
  );
}

export default Modal;
