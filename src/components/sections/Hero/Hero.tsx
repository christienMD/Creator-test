import ReactPlayer from 'react-player/lazy';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Create, sell, and earn.
          </h1>
          <p className="text-lg">
            Create your vision, sell your products, and earn money—unlock
            endless possibilities with every idea you bring to life!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/catalog">
              <button className="px-6 py-3 rounded-xl border-2 bg-creator-bg-400 text-white font-semibold transition-all duration-300 hover:shadow-lg">
                Item Catalogue
              </button>
            </Link>
            <Link to="/creator/library">
              <button className="px-6 py-3 rounded-xl border-2 font-semibold bg-creator-btn-500 text-black transition-all duration-300 hover:shadow-lg">
                Start Selling
              </button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="aspect-w-20 aspect-h-10 rounded-lg overflow-hidden shadow-xl">
            <ReactPlayer
              url="https://videos.pexels.com/video-files/3255275/3255275-sd_640_360_25fps.mp4"
              width="100%"
              height="100%"
              playing={true}
              muted={true}
              loop={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
