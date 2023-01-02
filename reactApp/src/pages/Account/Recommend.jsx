import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { getRecommendations } from '../../api/customApi';
import { Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from '../../components/spinner';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';
const MovieCard = lazy(() => import('../../components/movieCard'));

const Recommend = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { favouriteList } = useSelector((state) => state.favourites);

  const { data, error, isLoading, isError } = useQuery(
    [`recommends`, { list: favouriteList }],
    getRecommendations
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const recommendMovies = data;
  let movies = recommendMovies.map((rm) => rm.movie);

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
        Recommend Movies
      </Typography>
      {isAuthenticated && recommendMovies && (
        <div className="section" style={{ marginBottom: '20px' }}>
          <div className="sectionHeader" style={styles.sectionHeader}>
            {favouriteList.length > 0 ? (
              <h2 style={styles.h2}>From top to low</h2>
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
          <div>
            <table border="1" cellSpacing="0" style={{ marginLeft: '30%' }}>
              <tr>
                <th>Rate</th>
                <th>Movie</th>
                <th>Similarity</th>
              </tr>
              {recommendMovies.map((rm, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{rm.movie.title}</td>
                  <td>{rm.similarity.toFixed(4)}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Recommend;
