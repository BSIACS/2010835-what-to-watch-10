import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks';
import { favoriteFilms } from '../../mock/films';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import FilmPage from '../../pages/film-page/film-page';
import MainPage from '../../pages/main-page/main-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PlayerPage from '../../pages/player-page/player-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const {films, isDataLoaded, promo} = useAppSelector((state) => state);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage promoFilm={promo} isDataLoaded={isDataLoaded} films={films} favoriteFilms={favoriteFilms}/>} />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.Film} element={<FilmPage/>}/>
        <Route path={AppRoute.AddReview} element={<PrivateRoute><AddReviewPage films={films}/></PrivateRoute>}/>
        <Route path={AppRoute.Player} element={<PlayerPage films={films}/>} />
        <Route path={AppRoute.Mylist} element={<PrivateRoute><MyListPage films={films}/></PrivateRoute>}/>
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
