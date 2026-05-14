import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {
  CareerView,
  CreditsView,
  EpisodeView,
  ErrorView,
  FavoritesView,
  GenreView,
  HomeView,
  ImagesView,
  MoviesView,
  MovieView,
  NowPlayingView,
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  SettingsView,
  TelevisionView,
  TrailersView,
  TrendingView,
} from "@/views";

export const App = () => {
  return (
    <Routes>
      <Route element={<HomeView />} path="/" />
      <Route element={<MainLayout />}>
        <Route element={<NowPlayingView />} path="now-playing" />
        <Route element={<TrendingView />} path="trending/:category" />
        <Route element={<SearchView />} path="search" />
        <Route element={<MoviesView />} path="movies/category/:category" />
        <Route element={<TelevisionView />} path="tv/category/:category" />
        <Route element={<MovieView />} path="movie/:id">
          <Route element={<CreditsView />} path="credits" />
          <Route element={<TrailersView />} path="trailers" />
          <Route element={<ReviewsView />} path="reviews" />
        </Route>
        <Route element={<MovieView />} path="/tv/:id">
          <Route element={<EpisodeView />} path="season/:season" />
          <Route element={<ReviewsView />} path="reviews" />
          <Route element={<CreditsView />} path="credits" />
          <Route element={<TrailersView />} path="trailers" />
          <Route element={<SeasonsView />} path="seasons" />
        </Route>
        <Route element={<PersonView />} path="/person/:id">
          <Route element={<CareerView />} path="career" />
          <Route element={<ImagesView />} path="images" />
        </Route>
        <Route element={<GenreView />} path="genre/:mediaType/:genre" />
        <Route element={<FavoritesView />} path="/favorites" />
        <Route element={<SettingsView />} path="/settings" />
      </Route>
      <Route element={<ErrorView />} path="*" />
    </Routes>
  );
};
