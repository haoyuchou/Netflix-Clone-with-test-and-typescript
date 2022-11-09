import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export interface Props {
  onClose: () => void;
  children?: any;
}


function Modal({ onClose, children }: Props) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return (
      <Fragment>
        {/* Backdrop */}
        {ReactDOM.createPortal(
          <div
            className="fixed m-0 p-0 top-0 left-0 w-screen h-[100vh] z-30 bg-black-rgba"
            onClick={onClose}
          />,
          document.getElementById("modal-root") as HTMLElement
        )}
        {/* ModalOverlay */}
        {ReactDOM.createPortal(
          <div className="fixed w-[70%] h-[80%] top-[15%] left-[15%] bg-black drop-shadow-md z-40 overflow-x-hidden overflow-y-scroll">
            <div className="p-0 max-h-[50rem]">{children}</div>
          </div>,
          document.getElementById("modal-root") as HTMLElement
        )}
      </Fragment>
    );
  } else {
    return null;
  }
}

export default Modal;
