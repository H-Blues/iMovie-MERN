import express from 'express';
import MovieGenre from './movieGenreModel';
import TvGenre from './tvGenreModel';

const router = express.Router();

// Get all movie genres
router.get('/movie', async (req, res) => {
  const genres = await MovieGenre.find();
  res.status(200).json(genres);
});

// Get all tv genres
router.get('/tv', async (req, res) => {
  const genres = await TvGenre.find();
  res.status(200).json(genres);
});

export default router;