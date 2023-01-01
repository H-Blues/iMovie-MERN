import express from 'express';
import peopleModel from './peopleModel';
import asyncHandler from 'express-async-handler';
import { getPeopleCredits, getPopularPeople } from '../tmdb-api';
import responseHandler from '../responseHandler';

const router = express.Router();

// Get all people in database
router.get('/', asyncHandler(async (req, res) => {
  const people = await peopleModel.find();
  res.status(200).json(people);
}));

// Get people details
router.get('/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const people = await peopleModel.findByPeopleDBId(id);
  if (people) {
    responseHandler.success(res, 'Find people details successfully', { people: people });
  } else {
    responseHandler.notFound(res, 'The resource you requested could not be found.');
  }
}));

// Get a people combined credits
router.get('/:id/credits', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const movieCredits = await getPeopleCredits(id);
  if (movieCredits) responseHandler.success(res, 'Get movie credits successfully', movieCredits);
  else responseHandler.notFound(res, 'The resource you requested could not be found.');
}));


// Get popular people
router.get('/tmdb/popular', asyncHandler(async (req, res) => {
  const upcomingMovies = await getPopularPeople();
  if (upcomingMovies) responseHandler.success(res, 'Get upcoming movies successfully', upcomingMovies);
  else responseHandler.error(res, 'Opps, something wrong');
}));

export default router;