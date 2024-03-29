import React, { useEffect } from 'react';
import MainPageProps from '../../types/props/main-props';
import Footer from '../../components/footer/footer';
import FilmList from '../../components/films-list/film-list';
import UserBlock from '../../components/user-block/user-block';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import AddToMyListButton from '../../components/add-to-my-list-button.tsx/add-to-my-list-button';
import { AuthorizationStatus } from '../../constants';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { resetFilmsToShowQuantity, resetSelectedGenre } from '../../store/app-process/app-process';
import PlayButton from '../../components/play-button/play-button';


function MainPage({promoFilm, isDataLoaded, films} : MainPageProps) : JSX.Element{
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFilmsToShowQuantity());
    dispatch(resetSelectedGenre());
  }, [dispatch]);

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton filmId={promoFilm.id}/>

                {authorizationStatus === AuthorizationStatus.Auth ? <AddToMyListButton filmId={promoFilm.id} isFavorite={promoFilm.isFavorite} /> : ''}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {!isDataLoaded ? <LoadingScreen/> : <FilmList films={films} isFavoriteFilmList={false} />}

        </section>

        <Footer/>

      </div>
    </React.Fragment>);
}

export default MainPage;
