const baseUrl = 'https://api.themoviedb.org/3/';

export const getMovie = async (args) => {
  const [, argsPart] = args.queryKey;
  const id = argsPart.id;
  const lang = argsPart.lang;
  return fetch(
    `${baseUrl}movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getPopularMovies = async (args) => {
  const [, argsPart] = args.queryKey;
  const page = argsPart.page;
  const lang = argsPart.lang;
  return fetch(
    `${baseUrl}movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getUpcoming = async (args) => {
  const [, argsPart] = args.queryKey;
  const page = argsPart.page;
  const lang = argsPart.lang;
  return fetch(
    `${baseUrl}movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getTopRatedMovies = async (args) => {
  const [, argsPart] = args.queryKey;
  const page = argsPart.page;
  const lang = argsPart.lang;
  return fetch(
    `${baseUrl}movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};


export const getTV = async (args) => {
  const [, argsPart] = args.queryKey;
  const id = argsPart.id;
  const lang = argsPart.lang;
  return fetch(
    `${baseUrl}tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getPopularTV = async (args) => {
  const [, argsPart] = args.queryKey;
  const page = argsPart.page;
  const lang = argsPart.lang;
  return fetch(
    `${baseUrl}tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getPerson = async (args) => {
  const [, argsPart] = args.queryKey;
  const id = argsPart.id;
  const lang = argsPart.lang;
  return fetch(
    `${baseUrl}person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getPeople = async (args) => {
  const [, argsPart] = args.queryKey;
  const page = argsPart.page;
  const lang = argsPart.lang;
  return fetch(
    `${baseUrl}person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getCredits = async (args) => {
  const [, typePart, idPart, langPart] = args.queryKey;
  const { type } = typePart;
  const { id } = idPart;
  const { lang } = langPart;
  return fetch(
    `${baseUrl}${type}/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getCombinedCredits = async (args) => {
  const [, argsPart] = args.queryKey;
  const id = argsPart.id;
  const lang = argsPart.lang;
  return fetch(
    `${baseUrl}person/${id}/combined_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};