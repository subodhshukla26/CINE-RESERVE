import React, { useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import MovieSection from '../components/home/MovieSection';
import TheatreSection from '../components/home/TheatreSection';
import BottomNav from '../components/common/BottomNav';
import { MOVIES } from '../utils/constants';

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(MOVIES[0]);

  return (
    <div className="min-h-screen bg-[#F7F8FD] w-full max-w-[390px] mx-auto relative shadow-2xl overflow-x-hidden flex flex-col">
      {/* Container for scrollable content */}
      <div className="flex-grow">
        <HeroBanner movie={selectedMovie} />
        <main className="pb-4">
          <MovieSection onMovieClick={setSelectedMovie} />
          <TheatreSection />
        </main>
      </div>
      
      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
