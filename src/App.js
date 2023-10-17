import { useState, useEffect } from 'react';
import './App.css';
import Header1 from './components/Header1';
import axios from 'axios';

function App() {
  const [imageURL, setImageURL] = useState('');
  const [imageHistory, setImageHistory] = useState([]);

  useEffect(() => {
    fetchImage();
  }, []);

  function fetchImage() {
    axios
      .get('https://api.thecatapi.com/v1/images/search')
      .then((response) => {
        const imgUrl = response.data[0].url;
        setImageURL(imgUrl);
        setImageHistory([...imageHistory, imageURL]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function goBack() {
    if(imageHistory.length > 0) {
      const prevImage = imageHistory.pop();
      setImageURL(prevImage);
      setImageHistory(imageHistory);
    }
  }

  return (
    <div className="App">
      <Header1 />
      <button className="previous" onClick={goBack}>
        Go back
      </button>
      <div className="actual-image">
        <img src={imageURL} alt="" />
      </div>
      <button className="go-forward" onClick={fetchImage}>
        Go Forward
      </button>
    </div>
  );
}

export default App;