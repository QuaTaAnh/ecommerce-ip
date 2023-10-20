import { AiOutlineClose } from "react-icons/ai";
import { ModalProps } from "../type";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="modal-overlay absolute w-full h-full bg-gray-700 opacity-50 dark:bg-bgModalDark"
          onClick={onClose}
        />
        <div className="modal-container bg-white dark:bg-bgDark w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <button
            className="float-right p-3 bg-primary rounded-full mt-2 mr-3 cursor-pointer text-black"
            onClick={onClose}
          >
            <AiOutlineClose />
          </button>
          <div className="modal-content py-6 px-8 mt-6">{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
