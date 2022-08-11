import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorisationStatus } from '../../constants';
import { useAppSelector } from '../../hooks';
import { comments } from '../../mock/comments';
import { favoriteFilms } from '../../mock/films';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import FilmPage from '../../pages/film-page/film-page';
import MainPage from '../../pages/main-page/main-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PlayerPage from '../../pages/player-page/player-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import AppProps from '../../types/props/app-props';
import PrivateRoute from '../private-route/private-route';

function App({promoFilm, user} : AppProps): JSX.Element {
  const {films} = useAppSelector((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage promoFilm={promoFilm} films={films} user={user} favoriteFilms={favoriteFilms}/>} />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.Film} element={<FilmPage films={films} user={user} favoriteFilms={favoriteFilms} comments={comments}/>}/>
        <Route path={AppRoute.AddReview} element={<PrivateRoute authorisationStatus={AuthorisationStatus.Auth}><AddReviewPage films={films} user={user}/></PrivateRoute>}/>
        <Route path={AppRoute.Player} element={<PlayerPage films={films}/>} />
        <Route path={AppRoute.Mylist} element={<PrivateRoute authorisationStatus={AuthorisationStatus.Auth}><MyListPage films={films} user={user}/></PrivateRoute>}/>
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
