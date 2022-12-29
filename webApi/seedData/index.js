import userModel from '../api/users/userModel';
import movieGenreModel from '../api/genres/movieGenreModel';
import tvGenreModel from '../api/genres/tvGenreModel';
import movieModel from '../api/movies/movieModel';
import tvModel from '../api/tv/tvModel';
import peopleModel from '../api/people/peopleModel';

import users from './users';
import movieGenres from './movieGenres';
import tvGenres from './tvGenres';
import movies from './movies';
import tv from './tv';
import people from './people';

import dotenv from 'dotenv';

dotenv.config();

async function loadUsers () {
  console.log('loading user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

async function loadGenres () {
  console.log('loading genres Data');
  try {
    await movieGenreModel.deleteMany();
    await movieGenreModel.collection.insertMany(movieGenres);
    console.info(`${movieGenres.length} movie genres were successfully stored.`);
    await tvGenreModel.deleteMany();
    await tvGenreModel.collection.insertMany(tvGenres);
    console.info(`${tvGenres.length} tv genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load genres Data: ${err}`);
  }
}

export async function loadMovies () {
  console.log('loading movie data');
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

export async function loadTV () {
  console.log('loading tv data');
  try {
    await tvModel.deleteMany();
    await tvModel.collection.insertMany(tv);
    console.info(`${tv.length} movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

async function loadPeople () {
  console.log('loading people Data');
  try {
    await peopleModel.deleteMany();
    await peopleModel.collection.insertMany(people);
    console.info(`${people.length} people were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

if (process.env.SEED_DB) {
  loadUsers();
  loadGenres();
  loadMovies();
  loadTV();
  loadPeople();
}