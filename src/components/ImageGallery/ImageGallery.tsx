import { MouseEvent } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../App/App.types";

type Props = {
  imageList: Image[];
  openModal: (image: Image) => void;
};

const ImageGallery = ({ imageList, openModal }: Props) => {
  const onImageClick = (event: MouseEvent<HTMLUListElement>): void => {
    const imageTarget = (event.target as Element).closest("li");
    if (imageTarget) {
      const imgID = imageTarget.dataset.id;
      const clickedImage = imageList.find((image) => image.id === imgID);
      if (clickedImage) {
        openModal(clickedImage);
      }
    }
  };

  return (
    <section>
      {imageList.length > 0 && (
        <ul className={css.gallery} onClick={onImageClick}>
          {imageList.map((img) => (
            <li className={css.galleryItem} key={img.id} data-id={img.id}>
              <ImageCard imageItem={img} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ImageGallery;
