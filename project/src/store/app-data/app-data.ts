import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import Film from '../../types/film';
import { AppData } from '../../types/state';
import { clearFavoriteFilms } from '../actions';
import { fetchCommentsAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmsAction, fetchPromoAction, fetchSimilarFilmsAction, setIsFavoriteAction } from '../api-actions';

const initialState : AppData = {
  films: [],
  favoriteFilms : [],
  similarFilms : [],
  film: null,
  comments: [],
  promo : ({} as Film),
  isDataLoaded: false,
  isDataNotFound: false,
};

export const appData = createSlice({
  name: NameSpace.AppData,
  initialState,
  reducers : {
    setIsDataNotFound: (state, action) => { state.isDataNotFound = action.payload; },
    clearSimilarFilms: (state) => { state.similarFilms = []; },
    resetFilm: (state) => {state.film = null;},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isDataNotFound = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(setIsFavoriteAction.fulfilled, (state, action) => {
        //Обновляем поле isFavorite выбранного фильма в состоянии список фильмов (films)
        let index = state.films.findIndex((film) => film.id === action.payload.id);
        state.films[index].isFavorite = action.payload.isFavorite;
        state.film = {...state.films[index], isFavorite: action.payload.isFavorite};

        //Обновляем массив избрвнных фильмов (favoriteFilms)
        if(action.payload.isFavorite){
          state.favoriteFilms.push({...state.films[index], isFavorite: action.payload.isFavorite});
        }
        else{
          index = state.favoriteFilms.findIndex((film) => film.id === action.payload.id);
          state.favoriteFilms.splice(index, 1);
        }

        //Если id фильма, переданного в качестве аргумента совпадает с id промо фильма, обновляем поле isFavorite в состоянии промо-филmм (promo)
        if(state.promo.id === action.payload.id){
          state.promo = {...action.payload};
        }

        state.favoriteFilms = [...state.favoriteFilms];
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.comments = [];
      })
      .addCase(clearFavoriteFilms, (state) => {
        state.favoriteFilms = [];
      });
  }
});

export const {setIsDataNotFound, clearSimilarFilms, resetFilm} = appData.actions;

