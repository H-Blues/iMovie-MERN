import express from 'express';
import asyncHandler from 'express-async-handler';
import movies from '../../seedData/movies';
import { getMovie } from '../tmdb-api';

const router = express.Router();
const getFavouriteFeatures = async (likedMovies) => {
  let favouriteGenres = [];
  let favouriteLanguages = [];
  let favouriteFeatures = [];
  for (let i = 0; i < likedMovies.length; i++) {
    var movie = await getMovie(likedMovies[i]);
    var oneFeature = { g: [], l: [] };
    movie.genres.map((g) => {
      favouriteGenres.push(g.id);
      oneFeature.g.push(g.id);
    });
    favouriteLanguages.push(movie.original_language);
    oneFeature.l.push(movie.original_language);
    favouriteFeatures.push(oneFeature);
  }
  favouriteGenres = Array.from(new Set(favouriteGenres));
  favouriteLanguages = Array.from(new Set(favouriteLanguages));
  return { genres: favouriteGenres, languages: favouriteLanguages, favouriteFeatures: favouriteFeatures };
};

function getCosineSimilarity (vec1, vec2) {
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    norm1 += vec1[i] ** 2;
    norm2 += vec2[i] ** 2;
  }
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

function getRecommendations (movies, favouriteGenres, favouriteLanguages, favouriteFeatures) {
  const movieFeatures = movies.map(movie => [
    favouriteGenres.map(gid => movie.genre_ids.includes(gid)),
    favouriteLanguages.map(lid => movie.original_language === lid)
  ].reduce((acc, item) => acc.concat(item), []));

  const likedMovieFeatures = favouriteFeatures.map(ff => [
    favouriteGenres.map(gid => ff.g.includes(gid)),
    favouriteLanguages.map(lid => ff.l[0] === lid)
  ].reduce((acc, item) => acc.concat(item), []));

  const recommendations = movies.map((movie, i) => {
    const similarity = likedMovieFeatures.reduce((similarity, features) => similarity + getCosineSimilarity(features, movieFeatures[i]), 0);
    return { movie: movie, similarity: similarity };
  });

  return recommendations.sort((a, b) => b.similarity - a.similarity);
}

router.post('/', asyncHandler(async (req, res) => {
  let likedMovies = req.body.favourites;
  if (!likedMovies) likedMovies = [101, 13, 157336, 680];
  const features = await getFavouriteFeatures(likedMovies);
  const recommendMovies = getRecommendations(movies, features.genres, features.languages, features.favouriteFeatures);
  res.status(200).json(recommendMovies);
}));


export default router;