import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import FilmPage from '../../pages/film-page/film-page';
import MainPage from '../../pages/main-page/main-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PlayerPage from '../../pages/player-page/player-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const {films, isDataLoaded, promo} = useAppSelector((state) => state);
  //const favoriteFilms = useAppSelector((state) => state.favoriteFilms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  },
  [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage promoFilm={promo} isDataLoaded={isDataLoaded} films={films}/>} />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.Film} element={<FilmPage/>}/>
        <Route path={AppRoute.AddReview} element={<PrivateRoute><AddReviewPage films={films}/></PrivateRoute>}/>
        <Route path={AppRoute.Player} element={<PlayerPage films={films}/>} />
        <Route path={AppRoute.Mylist} element={<PrivateRoute><MyListPage /></PrivateRoute>}/>
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
