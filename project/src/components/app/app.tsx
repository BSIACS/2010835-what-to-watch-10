import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorisationStatus } from '../../constants';
import { comments } from '../../mock/comments';
import { favoriteFilms } from '../../mock/films';
import AddReview from '../../pages/add-review/add-review';
import FilmPage from '../../pages/film/film-page';
import Main from '../../pages/main/main';
import MyList from '../../pages/my-list/my-list';
import NotFound from '../../pages/not-found/not-found';
import Player from '../../pages/player/player';
import SignIn from '../../pages/sign-in/sign-in';
import AppProps from '../../types/props/app-props';
import PrivateRoute from '../private-route/private-route';

function App({promoFilm, films, user} : AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main promoFilm={promoFilm} films={films} user={user} favoriteFilms={favoriteFilms}/>} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path={AppRoute.Film} element={<FilmPage films={films} user={user} favoriteFilms={favoriteFilms} comments={comments}/>}/>
        <Route path={AppRoute.AddReview} element={<PrivateRoute authorisationStatus={AuthorisationStatus.Auth}><AddReview films={films} user={user}/></PrivateRoute>}/>
        <Route path={AppRoute.Player} element={<Player films={films}/>} />
        <Route path={AppRoute.Mylist} element={<PrivateRoute authorisationStatus={AuthorisationStatus.Auth}><MyList films={films} user={user}/></PrivateRoute>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
