import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { user } from './mock/user';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchFilmsAction, fetchPromoAction } from './store/api-actions';

store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App user={user} />
    </Provider>
  </React.StrictMode>,
);
