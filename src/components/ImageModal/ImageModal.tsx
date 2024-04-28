import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { useEffect } from "react";
import { Image } from "../App/App.types";

type Props = {
  isOpen: boolean;
  image: Image | null;
  onCloseModal: () => void;
};

const ImageModal = ({ isOpen, onCloseModal, image }: Props) => {
  return (
    <Modal
      overlayClassName={css.backdrop}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
    >
      {image && (
        <div className={css.modalContainer}>
          <div className={css.imageContainer}>
            <img
              className={css.image}
              src={image.urls.regular}
              alt={image.alt_description}
            />
          </div>
          <div className={css.infoContainer}>
            {image.description && <p>{image.description}</p>}
            <p>❤️ {image.likes}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
