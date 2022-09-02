import React, { useEffect, useRef, useState } from 'react';
import VideoplayerProps from '../../types/props/videoplayer-props';

function Videoplayer({film, isPlaying, isMuted} : VideoplayerProps) : JSX.Element{
  const [isLoading, setIsLoading] = useState(true);

  const videoElement = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    if(videoElement.current === null){
      return;
    }

    if(isPlaying && !isLoading){
      videoElement.current.play();
    }

    if(!isPlaying){
      videoElement.current.pause();
    }

  }, [isPlaying, isLoading]);

  const handleLoad = () => setIsLoading(false);


  return (
    <div className="small-film-card__image" >
      { isPlaying ?
        <video ref={videoElement} muted={isMuted} loop src={film.previewVideoLink } poster={film.previewImage} height="100%" onLoadedData={handleLoad}></video> :
        <img src={film.previewImage} alt={film.name} /> }
    </div>
  );
}

export default Videoplayer;
