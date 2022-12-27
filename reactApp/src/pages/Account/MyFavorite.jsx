import React, { useContext, lazy, Suspense } from 'react';
import { useQueries } from 'react-query';
import { useSelector } from 'react-redux';
import { MoviesContext } from '../../contexts/moviesContext';
import { getMovie } from '../../api/tmdbApi';
import { Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';
const MovieCard = lazy(() => import('../../components/movieCard'));
const Spinner = lazy(() => import('../../components/spinner'));

const MyFavorite = () => {
  const { movieFavorites: movieIds } = useContext(MoviesContext);
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);

  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);
  if (isLoading) {
    return (
      <Suspense>
        <Spinner />
      </Suspense>
    );
  }
  const movies = favoriteMovieQueries.map((q) => {
    return q.data;
  });

  const styles = {
    sectionHeader: {
      marginLeft: '10%',
      width: '100%',
      height: '30vh',
      display: 'inline-block',
    },
    h2: {
      padding: '10px',
      float: 'left',
    },
  };

  return (
    <>
      <Typography gutterBottom variant="h2" component="p" sx={{ textAlign: 'center' }}>
        My Favorite
      </Typography>
      {isAuthenticated && (
        <div className="section" style={{ marginBottom: '20px' }}>
          <div className="sectionHeader" style={styles.sectionHeader}>
            {movieIds.length > 0 ? (
              <h2 style={styles.h2}>Favorite Movies</h2>
            ) : (
              <h2 style={styles.h2}>Waiting for Adding Favorite Movies</h2>
            )}
          </div>
          <Swiper
            style={{ width: '80%', marginTop: '-10%' }}
            slidesPerView={4}
            spaceBetween={2}
            scrollbar={{
              hide: true,
            }}
            loopFillGroupWithBlank={true}
            modules={[Scrollbar]}>
            {movies.map((m, i) => (
              <SwiperSlide key={i} style={{ width: '20%' }}>
                <Suspense>
                  <MovieCard key={m.id} movie={m} type="movie" />
                </Suspense>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default MyFavorite;
