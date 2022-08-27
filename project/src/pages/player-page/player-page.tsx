import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppLink } from '../../constants';
import { getFilms } from '../../store/app-data/selectors';
import PlayerProps from '../../types/props/player-props';

let intervalId : (NodeJS.Timeout | null) = null;

const tarsformTimeFormat = (value : number) : string => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let result = '';

  if(value > 3599){
    hours = Math.floor(value / 3600);
    minutes = Math.floor((value - hours * 3600) / 60);
    value = value - (60 * minutes) - (3600 * hours);
    seconds = value;

    result = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  else{
    minutes = Math.floor(value / 60);
    value = value - (60 * minutes);
    seconds = value;

    result = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return result;
};

function Player({isAutoplay} : PlayerProps) : JSX.Element{
  const videoElement = useRef<HTMLVideoElement>(null);

  const [isPlayed, setIsPlayed] = useState(isAutoplay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [duration, setDuration] = useState<number>(0);

  const [targetTimeValue, setTargetTimeValue] = useState<number>(0);
  const [timesLeft, setTimesLeft] = useState<string>('');

  const [timeProgress, setTimeProgress] = useState<number>(0);

  const params = useParams();
  const filmToPlay = useSelector(getFilms).find((film) => film.id === Number(params.id));

  const play = useCallback(() => {
    videoElement.current?.play();
    intervalId = setInterval(() => {
      if(videoElement.current?.currentTime){
        setTimeProgress(Math.round((videoElement.current?.currentTime / duration * 100)));

        setTimesLeft(tarsformTimeFormat(duration - Math.round(videoElement.current?.currentTime)));
      }
    }, 250);
  }, [duration]);

  const pause = useCallback(() => {
    if(intervalId){
      clearInterval(intervalId);
      videoElement.current?.pause();
    }
  }, []);

  useEffect(() => {
    if(isAutoplay){
      loadVideo();
    }

    return () => {
      if(intervalId){
        clearInterval(intervalId);
      }
    };
  }, [isAutoplay]);

  useEffect(() => {
    if(isPlayed && isLoaded){
      play();
    }
    else if(!isPlayed && isLoaded){
      pause();
    }
  }, [isPlayed, isLoaded, play, pause]);

  useEffect(() => {
    if(videoElement.current){
      videoElement.current.currentTime = targetTimeValue;
    }

  }, [targetTimeValue]);

  const loadVideo = () => {
    videoElement.current?.load();
  };

  const progressBarClickHandler = (evt : React.MouseEvent<HTMLProgressElement>) => {
    const targetValueInPercent = evt.nativeEvent.offsetX * (evt.target as HTMLProgressElement).max / (evt.target as HTMLProgressElement).offsetWidth;

    setTargetTimeValue(duration / 100 * targetValueInPercent);
    setTimeProgress(targetValueInPercent);
  };

  const playClickHandler = (evt : React.MouseEvent<HTMLButtonElement>) => {
    setIsPlayed(!isPlayed);
  };

  const fullScreenButtonClickHandler = (evt : React.MouseEvent<HTMLButtonElement>) => {
    setIsFull(!isFull);
  };

  const playerClickHandler = () => {
    if(isFull){
      setIsFull(false);
    }
  };

  const loadDataHandler = (evt : React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setIsLoaded(true);
    if(videoElement.current?.duration !== undefined){
      setDuration(Math.round(videoElement.current?.duration));
    }
  };

  const endedHandler = () => {
    setIsPlayed(false);
    if(filmToPlay && videoElement.current){
      videoElement.current.setAttribute('src', filmToPlay?.videoLink);
    }
    setTimeProgress(100);
  };

  return (
    <React.Fragment>
      <style>{`
        html body {padding: 0; margin 0:}

        .hidden{
          display: none;
        }

        .player__progress:hover{
          cursor: pointer;
        }

        .spinner__container{
          position: absolute;
          width: 100%;
          text-align: center;
        }

        .spinner{
          border-style: none;
          display: inline-block;
          position: relative;
          width: 40px;
          margin-top: 25%;
          z-index: 20;
        }

        .hidden{
          display: none;
        }
      `}
      </style>

      <div className="visually-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <symbol id="add" viewBox="0 0 19 20">
            <title>+</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"/>
            </g>
          </symbol>
          <symbol id="full-screen" viewBox="0 0 27 27">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7"/>
          </symbol>
          <symbol id="in-list" viewBox="0 0 18 14">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5"/>
          </symbol>
          <symbol id="pause" viewBox="0 0 14 21">
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"/>
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"/>
            </g>
          </symbol>
        </svg>
      </div>

      <div className={`spinner__container ${isLoaded ? 'hidden' : ''}`}>
        <img className='spinner' src="https://i.gifer.com/ZKZx.gif" alt="spinner" />
      </div>

      <div className="player" onClick={playerClickHandler}>

        <video src={filmToPlay?.videoLink} ref={videoElement} muted className="player__video" poster={filmToPlay?.previewImage} onLoadedData={loadDataHandler} onEnded={endedHandler}></video>

        <Link className={`player__exit ${isFull ? 'hidden' : ''}`} to={`/${AppLink.Films}/${filmToPlay?.id}`}>Exit</Link>

        <div className={`player__controls ${isFull ? 'hidden' : ''}`}>
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={timeProgress} max="100" onClick={progressBarClickHandler}></progress>
              <div className="player__toggler" style={{left: `${timeProgress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{timesLeft}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className={`player__play ${isFull ? 'hidden' : ''}`} onClick={playClickHandler}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={isPlayed ? '#pause' : '#play-s'}></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{filmToPlay?.name}</div>

            <button type="button" className="player__full-screen" onClick={fullScreenButtonClickHandler}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Player;
