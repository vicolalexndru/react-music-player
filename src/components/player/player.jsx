import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faPlay, 
       faAngleLeft, 
       faAngleRight,
       faPause} from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {

  //Ref
  const audioRef = useRef(null);

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

  //Time handler
  const timeUpdateHandler = (e) => {
       const current = e.target.currentTime;
       const duration = e.target.duration;
       setSongInfo({...songInfo, currentTime: current, duration})
  }
  
  //Time Formatting
  const getTime = ( time ) =>{
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  //State 
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  });

    return(
       <div className="player"> 

          <div className="time-control">
              <p>{getTime(songInfo.currentTime)}</p>
              <input min = {0} max = {songInfo.duration} value = {songInfo.currentTime} type = "range" />
              <p>{getTime(songInfo.duration)}</p>
          </div>
          
          <div className="play-control">
            
            <FontAwesomeIcon className = "skip-back" icon={faAngleLeft}  size="2x"/>
            <FontAwesomeIcon onClick = { playSongHandler } className = "play" icon={ isPlaying ? faPause : faPlay} size="2x" />
            <FontAwesomeIcon className = "skip-forward" icon={ faAngleRight} size="2x"/>

          </div>
         <audio onTimeUpdate = {timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

       </div>
    )
}

export default Player;