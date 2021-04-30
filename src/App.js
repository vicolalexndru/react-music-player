import {useState} from 'react';
//Import StyLes
import './styles/app.scss';
//Import Components
import Song from './components/song/song.jsx';
import Player from './components/player/player.jsx';
//Import State
import data from "./data";

function App() {
  const [songs, setSongs] =useState(data());
  const [ currentSong, setCurrentSong] =useState(songs[0])
  
  return (
    <div className="App">

        <Song currentSong = {currentSong} />

        <Player/>
    </div>
  );
}

export default App;
