import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, removeFavourite } from '../../api/customApi';
import { getCredits } from '../../api/tmdbApi';
import defaultPerson from '../../assets/person-dummy.jpg';
import defaultFilm from '../../assets/film-poster-placeholder.png';
import Spinner from '../spinner';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Chip from '@mui/material/Chip';
import './index.css';
import { addToFavourite, removeFromFavourite } from '../../redux/features/favouriteSlice';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';

const DetailTemplate = ({ type, item, id }) => {
  const dispatch = useDispatch();

  const { userInfo, isAuthenticated, language } = useSelector((state) => state.user);
  const { favouriteList } = useSelector((state) => state.favourites);
  var initial;
  for (var i = 0; i < favouriteList.length; i++) {
    if (favouriteList[i] === Number(id)) {
      initial = true;
      break;
    } else {
      initial = false;
    }
  }
  const [isFavorite, setIsFavorite] = useState(initial);

  const { data, error, isLoading, isError } = useQuery(
    [`${type}${id}Credits`, { type: type }, { id: id }, { lang: language }],
    getCredits
  );

  const addToFavorite = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      dispatch(setAuthModalOpen(true));
    } else {
      setIsFavorite(true);
      if (type === 'movie') {
        const result = await addFavourite(userInfo.username, item.id);
        if (result.success) {
          dispatch(addToFavourite(item.id));
        }
      }
    }
  };

  const removeFromFavorite = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      dispatch(setAuthModalOpen(true));
    } else {
      setIsFavorite(false);
      if (type === 'movie') {
        const result = await removeFavourite(userInfo.username, item.id);
        if (result.success) {
          dispatch(removeFromFavourite(item.id));
        }
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast;
  const castToShow = cast.length > 5 ? cast.slice(0, 5) : cast;

  const posterUrl = 'https://image.tmdb.org/t/p/w500';
  const originUrl = 'https://image.tmdb.org/t/p/original';

  return (
    <>
      <div className="itemDetail">
        <div
          className="backdrop"
          style={{
            backgroundImage: `linear-gradient(grey, black),url(${originUrl}${item.backdrop_path})`,
          }}
        />
        <div className="container">
          {item.poster_path ? (
            <img className="avt" src={posterUrl + item.poster_path} alt="notFound" />
          ) : (
            <img className="avt" src={defaultFilm} alt="noImg" />
          )}
          <div className="contentDetail">
            <div className="content">
              <h1>{item.title || item.name}</h1>
              {isFavorite ? (
                <IconButton aria-label="remove from favorites" onClick={removeFromFavorite}>
                  <FavoriteIcon color="error" fontSize="large" />
                </IconButton>
              ) : (
                <IconButton aria-label="add to favorites" onClick={addToFavorite}>
                  <FavoriteBorderOutlinedIcon color="error" fontSize="large" />
                </IconButton>
              )}
              {item.genres.map((genre) => {
                return (
                  <Chip
                    variant="outlined"
                    key={genre.id}
                    label={genre.name}
                    sx={{ fontSize: '14px', color: 'white', margin: '3px', padding: '8px' }}
                  />
                );
              })}
              <p className="summary">{item.overview}</p>
              <p className="cast">Cast:</p>
              {castToShow.map((cast) => {
                return (
                  <div key={cast.id} className="castCard">
                    {cast.profile_path ? (
                      <img
                        src={originUrl + cast.profile_path}
                        width="100%"
                        style={{ borderRadius: '8px' }}
                        alt="noThisCast"
                      />
                    ) : (
                      <img
                        src={defaultPerson}
                        width="100%"
                        style={{ borderRadius: '8px' }}
                        alt="noImg"
                      />
                    )}
                    <Link
                      to={`/people/${cast.id}`}
                      style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                      {cast.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTemplate;
