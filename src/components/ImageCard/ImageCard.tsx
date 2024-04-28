import { Image } from "../App/App.types";
import css from "./ImageCard.module.css";

type Props = {
  imageItem: Image;
};

const ImageCard = ({
  imageItem: {
    alt_description,
    likes,
    urls: { small },
  },
}: Props) => {
  return (
    <div>
      <img
        className={css.image}
        src={small}
        alt={alt_description}
        width="360"
      />
      <div className={css.infoContainer}>
        <p>❤️ {likes}</p>
      </div>
    </div>
  );
};

export default ImageCard;
