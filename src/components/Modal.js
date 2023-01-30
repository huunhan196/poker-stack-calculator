import ReactDOM from "react-dom";
import { useEffect } from "react";

function Modal({ onClose, children }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return ReactDOM.createPortal(
    <div className="relative">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-600 bg-no-repeat"
      ></div>
      <div className="fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 p-0 bg-slate-200 drop-shadow-2xl rounded-lg">
        <div className="flex flex-col items-center h-full">{children}</div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
