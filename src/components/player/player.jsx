import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faPlay, 
       faAngleLeft, 
       faAngleRight,
       faPause} from '@fortawesome/free-solid-svg-icons';


const Player = ({ 
  currentSong, 
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  audioRef,
  songs,
  setCurrentSong,
  setSongs,
}) => {

  //UseEffect
  useEffect(() => {
       const newSongs = songs.map((song) => {
            if(song.id === currentSong.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false
                };
            }
        });
        
        setSongs(newSongs)
        
  }, [currentSong]);

  //Event Handlers
  const playSongHandler = () => {
     
     if (isPlaying){
       audioRef.current.pause();
       setIsPlaying(!isPlaying)
     } else {
       audioRef.current.play();
       setIsPlaying(!isPlaying)
     }
  }

  //Time Formatting
  const getTime = ( time ) =>{
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

 //Input Drag Handler
const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: parseInt(e.target.value)})
}

const skipTrackHandler = async (direction) => {

      let currentIndex = songs.findIndex((song) => song.id === currentSong.id)

      if (direction === 'skip-forward') {
        await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      }
      
      if (direction === 'skip-back') {

        if ((currentIndex - 1) % songs.length === -1) {
         await setCurrentSong(songs[songs.length - 1]);
           if(isPlaying) audioRef.current.play();
          return
        }
       await setCurrentSong(songs[(currentIndex - 1) % songs.length])
      }
 
     if(isPlaying) audioRef.current.play();
}

    return(
       <div className="player"> 

          <div className="time-control">
              <p>{ songInfo.duration ? getTime(songInfo.currentTime) : '0:00'}</p>
              <input onChange = { dragHandler } min = {0} max = {songInfo.duration} value = {songInfo.currentTime} type = "range" />
              <p>{getTime(songInfo.duration || 0 )}</p>
          </div>
          
          <div className="play-control">
            
            <FontAwesomeIcon onClick = {() => skipTrackHandler('skip-back')} className = "skip-back" icon={faAngleLeft}  size="2x"/>
            <FontAwesomeIcon onClick = { playSongHandler } className = "play" icon={ isPlaying? faPause : faPlay} size="2x" />
            <FontAwesomeIcon onClick = {() => skipTrackHandler('skip-forward')} className = "skip-forward" icon={ faAngleRight} size="2x"/>

          </div>
         
       </div>
    )
}

export default Player;