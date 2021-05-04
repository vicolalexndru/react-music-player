import React from 'react';
import LibrarySong from '../librarySong/librarySong.jsx'


const Library = ({songs, setCurrentSong, songInfo, setSongInfo, audioRef, isPlaying}) => {
    return(
      <div className="library">
          <h2>Library</h2>
          <div className="library-songs">
               { songs.map((song) => 
                 <LibrarySong 
                  songs={songs} 
                  setCurrentSong={setCurrentSong} 
                  song ={song}
                  key = {song.id}
                  audioRef = {audioRef}
                  isPlaying ={isPlaying}
                  />
               )}
          </div>
      </div>
    )
}

export default Library;