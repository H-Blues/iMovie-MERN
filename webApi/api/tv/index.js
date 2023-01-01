import express from 'express';
import uniqid from 'uniqid';
import tvModel from './tvModel';
import asyncHandler from 'express-async-handler';
import { tvReviewsDB } from './tvData';
import { getTvReviews, getTvCredits, getTopRatedTv } from '../tmdb-api';
import responseHandler from '../responseHandler';

const router = express.Router();

// Get all tvs in database
router.get('/', asyncHandler(async (req, res) => {
  const tv = await tvModel.find();
  res.status(200).json(tv);
}));

// Get tv details
router.get('/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const tv = await tvModel.findByTvDBId(id);
  if (tv) {
    responseHandler.success(res, 'Find tv details successfully', { tv: tv });
  } else {
    responseHandler.notFound(res, 'The resource you requested could not be found.');
  }
}));

// Get tv reviews
router.get('/:id/reviews', async (req, res) => {
  const id = parseInt(req.params.id);
  // Search reviews from local database firstly
  const searchedReviews = tvReviewsDB.filter((r) => r.id === id)[0];
  if (searchedReviews) {
    responseHandler.success(res, 'Find tv reviews successfully', searchedReviews);
  } else {
    // If no match locally, fetch data through tmdb-api
    console.info("GET api/tv/:id/reviews: fetching reviews from tmdb...");
    const tvReviews = await getTvReviews(id);
    if (tvReviews && tvReviews.id === id) {
      responseHandler.success(res, 'Find tv reviews successfully', tvReviews);
    } else responseHandler.notFound(res, 'The resource you requested could not be found.');
  }
});

// Post a tv review
router.post('/:id/reviews', async (req, res) => {
  req.body.created_at = new Date();
  req.body.updated_at = new Date();
  req.body.id = uniqid();
  const id = parseInt(req.params.id);
  // Search reviews from local database firstly
  const searchedReviews = tvReviewsDB.filter((r) => r.id === id)[0];
  let index = tvReviewsDB.indexOf(searchedReviews);
  if (index !== -1) {
    searchedReviews.results.push(req.body);
    tvReviewsDB.slice(0, index, searchedReviews);
    responseHandler.created(res, 'Create a review successfully');
  } else {
    // If no match locally, fetch data through tmdb-api and store result
    console.info("POST api/tvs/:id/reviews: fetching reviews from tmdb...");
    const thisMovieReviews = await getTvReviews(id);
    if (thisMovieReviews && thisMovieReviews.id === id) {
      thisMovieReviews.results.push(req.body);
      tvReviewsDB.push(thisMovieReviews);
      responseHandler.created(res, 'Create a review successfully');
    } else responseHandler.notFound(res, 'The resource you requested could not be found.');
  }
});

// Get a tv credit
router.get('/:id/credits', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const tvCredits = await getTvCredits(id);
  if (tvCredits) responseHandler.success(res, 'Get tv credits successfully', tvCredits);
  else responseHandler.notFound(res, 'The resource you requested could not be found.');
}));

// Get top rated tv
router.get('/tmdb/top-rated', asyncHandler(async (req, res) => {
  const topRatedMovies = await getTopRatedTv();
  if (topRatedMovies) responseHandler.success(res, 'Get upcoming tvs successfully', topRatedMovies);
  else responseHandler.error(res, 'Opps, something wrong');
}));

export default router;