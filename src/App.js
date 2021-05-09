import {useState, useRef} from 'react';

//Import StyLes
import './styles/app.scss';

//Import Components
import Song from './components/song/song.jsx';
import Player from './components/player/player.jsx';
import Library from './components/library/library.jsx';
import Nav from './components/nav/Nav.jsx'

//Import State
import data from "./data";



function App() {
  const [songs, setSongs] = useState(data());
  const [ currentSong, setCurrentSong] = useState(songs[1])
  const [ isPlaying, setIsPlaying] = useState(false)

//Time handler
  const timeUpdateHandler = (e) => {
       const current = e.target.currentTime;
       const duration = e.target.duration;
       setSongInfo({...songInfo, currentTime: current, duration})
  }

//Ref
const audioRef = useRef(null);

 //State Song Info
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className="App">
        <Nav libraryStatus = {libraryStatus} setLibraryStatus ={setLibraryStatus}/>
        <Library libraryStatus = {libraryStatus} setSongs ={setSongs} isPlaying = {isPlaying}  audioRef = {audioRef} songInfo = {songInfo} setSongInfo = {setSongInfo} songs = {songs} setCurrentSong = {setCurrentSong}/>
        <Song currentSong = {currentSong} />
        <Player audioRef = {audioRef} songInfo = {songInfo} setSongInfo = {setSongInfo} isPlaying = {isPlaying} setIsPlaying={setIsPlaying} currentSong = {currentSong}/>
        
        <audio onTimeUpdate = {timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
