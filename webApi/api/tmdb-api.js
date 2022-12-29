import fetch from 'node-fetch';
const tmdbUrl = 'https://api.themoviedb.org/3';

export const getUpcomingMovies = () => {
  return fetch(
    `${tmdbUrl}/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getTopRatedMovies = () => {
  return fetch(
    `${tmdbUrl}/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getMovieReviews = (id) => {
  return fetch(
    `${tmdbUrl}/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getMovieCredits = (id) => {
  return fetch(
    `${tmdbUrl}/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getTopRatedTv = () => {
  return fetch(
    `${tmdbUrl}/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getTvReviews = (id) => {
  return fetch(
    `${tmdbUrl}/tv/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getTvCredits = (id) => {
  return fetch(
    `${tmdbUrl}/tv/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getPeopleCredits = (id) => {
  return fetch(
    `${tmdbUrl}/person/${id}/combined_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getPopularPeople = () => {
  return fetch(
    `${tmdbUrl}/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};