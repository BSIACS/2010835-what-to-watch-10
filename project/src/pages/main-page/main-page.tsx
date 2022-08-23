import React, { useEffect } from 'react';
import MainPageProps from '../../types/props/main-props';
import Footer from '../../components/footer/footer';
import FilmList from '../../components/films-list/film-list';
import UserBlock from '../../components/user-block/user-block';
import Logo from '../../components/logo/logo';
import { resetFilmsToShowQuantity, resetFilterSelectedGenre } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import AddToMyListButton from '../../components/add-to-my-list-button.tsx/add-to-my-list-button';
import { AuthorizationStatus } from '../../constants';


function MainPage({promoFilm, isDataLoaded, films} : MainPageProps) : JSX.Element{
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFilmsToShowQuantity());
    dispatch(resetFilterSelectedGenre());
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
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
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
