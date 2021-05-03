import {useState} from 'react';

//Import StyLes
import './styles/app.scss';

//Import Components
import Song from './components/song/song.jsx';
import Player from './components/player/player.jsx';
import Library from './components/library/library.jsx';

//Import State
import data from "./data";

function App() {
  const [songs, setSongs] = useState(data());
  const [ currentSong, setCurrentSong] = useState(songs[0])
  const [ isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="App">
        <Song currentSong = {currentSong} />

        <Player isPlaying = {isPlaying} setIsPlaying={setIsPlaying} currentSong = {currentSong}/>

        <Library songs = {songs}/>
    </div>
  );
}

export default App;
