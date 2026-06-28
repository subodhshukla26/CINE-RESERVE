import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { normalizeMovie, slugifyMovie } from '../utils/movieNormalizer';
import toast from 'react-hot-toast';
import {
  createBookingJourney,
  recordBookingActivity,
} from '../services/bookingJourneyService';

import MovieHeader from '../components/movieDetails/MovieHeader';
import MoviePoster from '../components/movieDetails/MoviePoster';
import MovieInfo from '../components/movieDetails/MovieInfo';
import MovieDescription from '../components/movieDetails/MovieDescription';
import MovieFormats from '../components/movieDetails/MovieFormats';
import MovieReleaseDate from '../components/movieDetails/MovieReleaseDate';
import DirectorSection from '../components/movieDetails/DirectorSection';
import CastSection from '../components/movieDetails/CastSection';
import BookingCTA from '../components/movieDetails/BookingCTA';
import BottomNav from '../components/common/BottomNav';

const formatStatus = (status) => {
  if (!status) {
    return '';
  }

  return status
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const LoadingState = () => (
  <div className="space-y-3 px-5 py-4">
    <div className="h-[64px] rounded-[18px] bg-gray-200/80 animate-pulse" />
    <div className="h-[150px] rounded-[18px] bg-gray-200/80 animate-pulse" />
    <div className="mx-auto h-[260px] w-[200px] rounded-2xl bg-gray-200/80 animate-pulse" />
    <div className="h-[110px] rounded-[18px] bg-gray-200/80 animate-pulse" />
    <div className="h-[120px] rounded-[18px] bg-gray-200/80 animate-pulse" />
    <div className="h-[84px] rounded-[18px] bg-gray-200/80 animate-pulse" />
    <div className="h-[84px] rounded-[18px] bg-gray-200/80 animate-pulse" />
    <div className="h-[84px] rounded-[18px] bg-gray-200/80 animate-pulse" />
    <div className="h-[84px] rounded-[18px] bg-gray-200/80 animate-pulse" />
  </div>
);

const ErrorState = ({ message, onRetry, onBack }) => (
  <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
    <div className="w-full rounded-[24px] border border-red-100 bg-red-50 px-5 py-8 shadow-sm">
      <p className="text-[15px] font-extrabold text-red-700">Unable to load movie details</p>
      <p className="mt-2 text-[13px] font-medium leading-6 text-red-600/80">{message}</p>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="flex-1 rounded-xl bg-[#5D4CE8] px-4 py-3 text-[13px] font-extrabold text-white active:scale-[0.98] transition-all"
        >
          Retry
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-red-200 bg-white px-4 py-3 text-[13px] font-extrabold text-red-700 active:scale-[0.98] transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
);

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const hasTrackedMovieSelection = useRef(false);
  const isBookingJourneyStarting = useRef(false);
  const fallbackImage =
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80';

  const fetchMovie = useCallback(async () => {
    if (!id) {
      setError('Movie ID is missing from the URL.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.get(`/api/movies/${encodeURIComponent(id)}`);
      const fetchedMovie = response.data?.movie || null;

      if (!fetchedMovie) {
        throw new Error('Movie not found.');
      }

      setMovie(fetchedMovie);

      if (!hasTrackedMovieSelection.current && fetchedMovie._id) {
        hasTrackedMovieSelection.current = true;
        recordBookingActivity({
          selectedMovieId: fetchedMovie._id,
          eventName: 'Movie Selected',
        }).catch((trackError) => {
          console.error('Track movie selection error:', trackError);
        });
      }
    } catch (fetchError) {
      const message =
        fetchError?.response?.data?.message ||
        fetchError?.message ||
        'We could not load this movie right now. Please try again.';
      setError(message);
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const movieData = useMemo(() => normalizeMovie(movie, fallbackImage), [movie, fallbackImage]);
  const bannerImage = movieData?.bannerImage || fallbackImage;
  const posterImage = movieData?.posterImage || fallbackImage;

  const handleBack = () => {
    navigate(-1);
  };

  const handleBookNow = () => {
    const movieSlug = movieData?.slug || slugifyMovie(movieData?.title);
    const selectedMovieId = movieData?.id;
    const selectedMovieName = movieData?.title;

    const startBooking = async () => {
      if (!selectedMovieId) {
        toast.error('Movie details are not ready yet.');
        return;
      }

      if (isBookingJourneyStarting.current) {
        return;
      }

      isBookingJourneyStarting.current = true;

      try {
        await Promise.all([
          createBookingJourney({
            selectedMovieId,
            selectedMovieName,
            event: 'Movie Selected',
          }),
          recordBookingActivity({
            selectedMovieId,
            eventName: 'Get Tickets Clicked',
          }),
        ]);

        navigate(`/select-theatre/${movieSlug}`, {
          state: {
            movie: movieData,
          },
        });
      } catch (journeyError) {
        const message =
          journeyError?.response?.data?.message ||
          journeyError?.message ||
          'Unable to start booking journey.';
        toast.error(message);
      } finally {
        isBookingJourneyStarting.current = false;
      }
    };

    startBooking();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-4">
      <div className="relative w-[390px] h-[844px] bg-[#F7F8FD] rounded-[5px] shadow-2xl overflow-hidden flex flex-col border border-slate-200 select-none">
        <MovieHeader onBack={handleBack} />

        <div className="flex-grow overflow-y-auto no-scrollbar pb-[140px] bg-[#F7F8FD]">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchMovie} onBack={handleBack} />
          ) : (
            <>
              <div className="relative h-[150px] w-full overflow-hidden bg-gray-200">
                <img
                  src={bannerImage}
                  alt={movieData?.title || 'Movie banner'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F7F8FD] via-transparent to-transparent" />
              </div>

              <MoviePoster src={posterImage} alt={movieData?.title || 'Movie poster'} />

              <MovieInfo
                title={movieData?.title}
                rating={movieData?.rating}
                duration={movieData?.duration}
                languages={movieData?.languages}
                genres={movieData?.genres}
                status={formatStatus(movieData?.status)}
              />

              <MovieDescription description={movieData?.description} />

              <MovieFormats formats={movieData?.formats} />

              <MovieReleaseDate releaseDate={movieData?.releaseDate} />

              <DirectorSection director={movieData?.director} />

              <CastSection cast={movieData?.cast} />
            </>
          )}
        </div>

        {!loading && !error && (
          <div className="absolute bottom-[72px] left-0 right-0 z-40">
            <BookingCTA onBook={handleBookNow} />
          </div>
        )}

        <BottomNav />
      </div>
    </div>
  );
};

export default MovieDetails;
