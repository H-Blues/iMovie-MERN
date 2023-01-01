import express from 'express';
import uniqid from 'uniqid';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import { movieReviewsDB } from './moviesData';
import { getMovieReviews, getMovieCredits, getUpcomingMovies, getTopRatedMovies } from '../tmdb-api';
import responseHandler from '../responseHandler';

const router = express.Router();

// Get all movies in database
router.get('/', asyncHandler(async (req, res) => {
  const movies = await movieModel.find();
  res.status(200).json(movies);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(id);
  if (movie) {
    responseHandler.success(res, 'Find movie details successfully', { movie: movie });
  } else {
    responseHandler.notFound(res, 'The resource you requested could not be found.');
  }
}));

// Get movie reviews
router.get('/:id/reviews', async (req, res) => {
  const id = parseInt(req.params.id);
  // Search reviews from local database firstly
  const searchedReviews = movieReviewsDB.filter((r) => r.id === id)[0];
  if (searchedReviews) {
    responseHandler.success(res, 'Find movie reviews successfully', searchedReviews);
  } else {
    // If no match locally, fetch data through tmdb-api
    console.info("At GET api/movies/:id/reviews: fetching reviews from tmdb...");
    const movieReviews = await getMovieReviews(id);
    if (movieReviews && movieReviews.id === id) {
      responseHandler.success(res, 'Find movie reviews successfully', movieReviews);
    } else responseHandler.notFound(res, 'The resource you requested could not be found.');
  }
});

// Post a movie review
router.post('/:id/reviews', async (req, res) => {
  req.body.created_at = new Date();
  req.body.updated_at = new Date();
  req.body.id = uniqid();
  const id = parseInt(req.params.id);
  // Search reviews from local database firstly
  const searchedReviews = movieReviewsDB.filter((r) => r.id === id)[0];
  let index = movieReviewsDB.indexOf(searchedReviews);
  if (index !== -1) {
    searchedReviews.results.push(req.body);
    movieReviewsDB.slice(0, index, searchedReviews);
    responseHandler.created(res, 'Create a review successfully');
  } else {
    // If no match locally, fetch data through tmdb-api and store result
    console.info("At POST api/movies/:id/reviews: fetching reviews from tmdb...");
    const thisMovieReviews = await getMovieReviews(id);
    if (thisMovieReviews && thisMovieReviews.id === id) {
      thisMovieReviews.results.push(req.body);
      movieReviewsDB.push(thisMovieReviews);
      responseHandler.created(res, 'Create a review successfully');
    } else responseHandler.notFound(res, 'The resource you requested could not be found.');
  }
});

// Get a movie credit
router.get('/:id/credits', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const movieCredits = await getMovieCredits(id);
  if (movieCredits) responseHandler.success(res, 'Get movie credits successfully', movieCredits);
  else responseHandler.notFound(res, 'The resource you requested could not be found.');
}));


// Get upcoming movies
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
  const upcomingMovies = await getUpcomingMovies();
  res.status(200).json(upcomingMovies);
  if (upcomingMovies) responseHandler.success(res, 'Get upcoming movies successfully', upcomingMovies);
  else responseHandler.error(res, 'Opps, something wrong');
}));

// Get top rated movies
router.get('/tmdb/top-rated', asyncHandler(async (req, res) => {
  const topRatedMovies = await getTopRatedMovies();
  if (topRatedMovies) responseHandler.success(res, 'Get upcoming movies successfully', topRatedMovies);
  else responseHandler.error(res, 'Opps, something wrong');
}));

export default router;