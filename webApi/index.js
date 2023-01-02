import dotenv from 'dotenv';
import express from 'express';
import passport from './authenticate';

import moviesRouter from './api/movies';
import tvRouter from './api/tv';
import peopleRouter from './api/people';
import genresRouter from './api/genres';
import favouriteRouter from './api/favourites';
import usersRouter from './api/users';
import recommendRouter from './api/recommend';
import './db';
import './seedData';

const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

dotenv.config();

const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({ success: false, msg: err.stack });
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();
const port = process.env.PORT;

app.use(express.json());  // This line should be before useRoutes -- important
app.use(cors(corsOptions));
app.use(passport.initialize());

app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use('/api/movies', passport.authenticate('jwt', { session: false }), moviesRouter);
app.use('/api/tv', passport.authenticate('jwt', { session: false }), tvRouter);
app.use('/api/people', passport.authenticate('jwt', { session: false }), peopleRouter);
app.use('/api/favourites', passport.authenticate('jwt', { session: false }), favouriteRouter);
app.use('/api/recommend', passport.authenticate('jwt', { session: false }), recommendRouter);
app.use(errHandler);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});