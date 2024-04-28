import css from "./LoadMoreBtn.module.css";

type Props = {
  onClick: () => void;
  isVisible: () => boolean;
};

const LoadMoreBtn = ({ onClick, isVisible }: Props) => {
  return (
    <div className={css.buttonContainer}>
      {isVisible() && <button onClick={onClick}>Load More</button>}
    </div>
  );
};

export default LoadMoreBtn;
