import express from 'express';
import User from '../users/userModel';
import responseHandler from '../responseHandler';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Get favourite list
router.get('/:userName', asyncHandler(async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName).populate('favourites');
  responseHandler.success(res, 'Find favourite media successfully', { favourites: user.favourites });
}));

// Add a favourite
router.post('/:userName', asyncHandler(async (req, res) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  // const movie = await movieModel.findByMovieDBId(newFavourite);
  const user = await User.findByUserName(userName);
  if (!user.favourites.includes(newFavourite)) {
    try {
      await user.favourites.push(newFavourite);
      await user.save();
      console.info("1 favourite movie added successfully");
      responseHandler.created(res, 'Add favourite successfully');
    } catch (error) {
      responseHandler.error(res, 'Opps, something is wrong...');
    }
  } else {
    responseHandler.badRequest(res, 'Movie added is duplicated');
  }
}));

// Remove a favourite.
router.delete('/:userName', asyncHandler(async (req, res) => {
  const removeFavourite = req.body.id;
  const userName = req.params.userName;
  // const movie = await movieModel.findByMovieDBId(removeFavourite);
  const user = await User.findByUserName(userName);
  if (user.favourites.includes(removeFavourite)) {
    try {
      user.favourites = user.favourites.filter(e => e !== removeFavourite);
      await user.save();
      console.info("1 favourite movie deleted successfully");
      responseHandler.success(res, "Movie Deleted Success", { favourites: user.favourites });
    } catch (error) {
      responseHandler.error(res, 'Opps, something is wrong...');
    }
  } else {
    responseHandler.badRequest(res, 'This movie is not in your favourite list');
  }
}));

export default router;