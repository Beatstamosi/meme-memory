import "../styles/imageGrid.css";

export default function ImageGrid({
  images,
  increaseScore,
  updateBestScore,
  toggleImageClicked,
}) {
  const handleClick = (image) => {
    if (image.clicked === false) {
      toggleImageClicked(image);
      increaseScore();
    } else {
      updateBestScore();
    }
  };

  return (
    <div className="grid">
      {images.map((image, index) => {
        return (
          <div
            className="container-images"
            key={index}
            onClick={() => handleClick(image)}
          >
            <img src={image.url} alt="gif" />
          </div>
        );
      })}
    </div>
  );
}
