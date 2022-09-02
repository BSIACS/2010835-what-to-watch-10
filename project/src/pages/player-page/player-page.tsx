import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AppLink, AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFilmAction } from '../../store/api-actions';
import { resetFilm, setIsDataNotFound } from '../../store/app-data/app-data';
import { getFilm, getIsDataNotFound } from '../../store/app-data/selectors';
import { tarsformTimeFormat } from '../../utils';

let intervalId : (NodeJS.Timeout | null) = null;

function Player() : JSX.Element{
  const params = useParams();
  const id = Number(params.id);

  const videoElement = useRef<HTMLVideoElement>(null);

  const [isPlayed, setIsPlayed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const film = useAppSelector(getFilm);
  const isDataNotFound = useAppSelector(getIsDataNotFound);

  const [targetTimeValue, setTargetTimeValue] = useState<number>(0);
  const [timesLeft, setTimesLeft] = useState<string>('');
  const [timeProgress, setTimeProgress] = useState<number>(0);


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
    store.dispatch(fetchFilmAction({id: id}));
    return () => {
      store.dispatch(resetFilm());
      store.dispatch(setIsDataNotFound(false));
    };
  }, [id]);

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

  if(isDataNotFound){
    return <Navigate to={AppRoute.NotFound} />;
  }

  const progressBarClickHandler = (evt : React.MouseEvent<HTMLProgressElement>) => {
    const targetValueInPercent = evt.nativeEvent.offsetX * (evt.target as HTMLProgressElement).max / (evt.target as HTMLProgressElement).offsetWidth;

    setTargetTimeValue(duration / 100 * targetValueInPercent);
    setTimeProgress(targetValueInPercent);
  };

  const playClickHandler = (evt : React.MouseEvent<HTMLButtonElement>) => {
    setIsPlayed(!isPlayed);
  };

  const fullScreenButtonClickHandler = (evt : React.MouseEvent<HTMLButtonElement>) => {
    if(videoElement.current){
      videoElement.current.requestFullscreen();
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
    if(film && videoElement.current){
      videoElement.current.setAttribute('src', film?.videoLink);
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

        .mytestblock{
          height: 40px,
        }
      `}
      </style>
      <div className='mytestblock'>{isPlayed ? 'true' : 'false'}</div>
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

      <div className="player">

        <video src={film?.videoLink} ref={videoElement} className="player__video" poster={film?.previewImage} onLoadedData={loadDataHandler} onEnded={endedHandler}></video>

        <Link className="player__exit" to={`/${AppLink.Films}/${film?.id}`}>Exit</Link>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={timeProgress} max="100" onClick={progressBarClickHandler}></progress>
              <div className="player__toggler" style={{left: `${timeProgress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{timesLeft}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={playClickHandler}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={isPlayed ? '#pause' : '#play-s'}></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{film?.name}</div>

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
