import express from 'express';
import User from './userModel';
import movieModel from '../movies/movieModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line
const validate = function (value) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(value);
};

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res, next) => {
  const validatePwd = validate(req.body.password);
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ success: false, msg: 'Please pass username and password.' });
    return next();
  }
  if (!validatePwd) {
    res.status(401).json({ success: false, msg: 'Password format is not valid.' });
    return next();
  }

  if (req.query.action === 'register') {
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'Successful created new user.' });
  } else {
    const user = await User.findByUserName(req.body.username);
    if (!user) return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        // if user is found and password matches, create a token
        const token = jwt.sign(user.username, process.env.SECRET);
        // return the information including token as JSON
        res.status(200).json({ success: true, token: 'BEARER ' + token, user: user });
      } else {
        res.status(401).json({ success: false, msg: 'Authentication failed. Wrong password.' });
      }
    });
  }
}));

// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
  if (req.body._id) delete req.body._id;
  const user = await User.findById(req.params.id);
  if (user) {
    if (!req.body.password) {
      user.username = req.body.username;
      user.email = req.body.email;
      user.address = req.body.address;
      user.phone = req.body.phone;
      user.pic = req.body.pic;
    } else {
      user.password = req.body.password;
    }
    await user.save();
    res.status(200).json({ success: true, msg: 'User Information Updated Sucessfully', user: user });
  } else {
    res.status(404).json({ success: false, msg: 'Unable to Update User' });
  }
}));

// Delete a user
router.delete('/:id', asyncHandler(async (req, res) => {
  const user = await User.findOne({
    id: req.params.id,
  });
  if (!user) {
    res.status(404).json({ success: false, msg: 'Unable to Find the User' });
  } else {
    await user.remove();
    res.status(200).json({ success: true, msg: 'User Deleted Sucessfully' });
  }
}));

// Find favourites
router.get('/:userName/favourites', asyncHandler(async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName).populate('favourites');
  res.status(200).json(user.favourites);
}));

//Add a favourite. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favourites', asyncHandler(async (req, res) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(newFavourite);
  const user = await User.findByUserName(userName);
  if (!user.favourites.includes(movie._id)) {
    await user.favourites.push(movie._id);
    await user.save();
    res.status(201).json(user);
  } else {
    res.status(401).json({ success: false, msg: 'Movie added is duplicated' });
  }
}));

// Remove a favourite.
router.delete('/:userName/favourites', asyncHandler(async (req, res) => {
  const removeFavourite = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(removeFavourite);
  const user = await User.findByUserName(userName);
  if (user.favourites.includes(movie._id)) {
    await user.favourites.filter(e => e._id.toString() !== movie._id.toString());
    await user.save();
    res.status(201).json({ success: true, msg: "Movie Deleted Success" });
  } else {
    res.status(401).json({ success: false, msg: "This movie is not in favourite list" });
  }
}));

export default router;