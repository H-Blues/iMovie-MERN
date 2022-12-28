import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from './authenticate';
import moviesRouter from './api/movies';
import genresRouter from './api/genres';
import favouriteRouter from './api/favourites';
import usersRouter from './api/users';
import './db';
import './seedData';

dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({ success: false, msg: err });
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();
const port = process.env.PORT;

app.use(express.json());  // This line should be before useRoutes -- important

app.use(passport.initialize());

app.use('/api/users', usersRouter);
app.use('/api/movies', passport.authenticate('jwt', { session: false }), moviesRouter);
app.use('/api/genres', passport.authenticate('jwt', { session: false }), genresRouter);
app.use('/api/favourites', passport.authenticate('jwt', { session: false }), favouriteRouter);
app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});