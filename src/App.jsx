import { useEffect, useState } from "react";
import "./App.css";
import fetchData from "./components/fetchImg";
import ImageGrid from "./components/imageGrid";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  // Fetch Images once on page load
  useEffect(() => {
    async function loadData() {
      const result = await fetchData();
      setImages(result);
      setLoading(false);
    }

    loadData();
  }, []);

  // On Score Change shuffle images or end game
  useEffect(() => {
    if (score === 20) {
      alert("You won!");
    } else {
      shuffleImages();
    }
  }, [score]);

  const increaseScore = () => {
    setScore(score + 1);
  };

  const updateBestScore = () => {
    setBestScore(score);
    setScore(0);
    resetImages();
  };

  const resetImages = () => {
    let copy = [...images];
    let newImgs = copy.map((item) => ({ ...item, clicked: false }));
    setImages(newImgs);
  };

  const toggleImageClicked = (clickedImage) => {
    const updatedImages = images.map((image) => {
      if (clickedImage.url === image.url) {
        return { ...image, clicked: true };
      }
      return image;
    });
    setImages(updatedImages);
  };

  const shuffleImages = () => {
    let copy = [...images];
    let shuffled = copy
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setImages(shuffled);
  };

  return (
    <div className="app-layout">
      <header>
        <div className="intro">
          <h1>Welcome to Meme Memory!</h1>
          <p>
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>
        <div className="scoreboard">
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </header>
      <div className="main-content">
        {loading ? (
          <p>Loading Memes...</p>
        ) : (
          <ImageGrid
            images={images}
            increaseScore={increaseScore}
            updateBestScore={updateBestScore}
            toggleImageClicked={toggleImageClicked}
          />
        )}
      </div>
    </div>
  );
}

export default App;
