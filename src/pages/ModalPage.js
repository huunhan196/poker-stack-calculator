import Modal from "../components/Modal";
import InputForm from "../components/InputForm";

function ModalPage({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <Modal>
          <InputForm isOpen={isOpen} onClose={onClose} />
        </Modal>
      )}
    </>
  );
}
export default ModalPage;
