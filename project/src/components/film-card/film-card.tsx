import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLink, PLAYBACK_DELAY_MS } from '../../constants';
import FilmCardProps from '../../types/props/film-card-props';
import Videoplayer from '../videoplayer/videoplayer';


function FilmCard({film} : FilmCardProps) : JSX.Element{
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [playbackDelayTimer, setPlaybackDelayTimer] = useState<number | null>(null);


  const handleMouseOver = () => {
    setPlaybackDelayTimer(Number(setTimeout(() => setIsVideoPlaying(true), PLAYBACK_DELAY_MS)));
  };

  const handleMouseOut = () => {
    setIsVideoPlaying(false);

    clearTimeout(Number(playbackDelayTimer));
  };

  return (
    <div className="small-film-card catalog__films-card" data-id={film.id} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {<Videoplayer film={film} isPlaying={isVideoPlaying} isMuted/>}
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/${AppLink.Films}/${film.id.toString()}`} onMouseOver={(evt : React.MouseEvent<HTMLElement>) => evt.stopPropagation()}>{film.name}</Link>
      </h3>
    </div>
  );
}

export default FilmCard;

