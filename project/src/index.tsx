import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {films, promoFilm} from '../src/mock/films';
import { user } from './mock/user';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App promoFilm={promoFilm} films={films} user={user} />
  </React.StrictMode>,
);
