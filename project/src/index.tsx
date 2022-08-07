import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { promoFilm} from '../src/mock/films';
import { user } from './mock/user';
import { Provider } from 'react-redux';
import { store } from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App promoFilm={promoFilm} films={store.getState().films} user={user} />
    </Provider>
  </React.StrictMode>,
);
