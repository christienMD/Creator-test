import { Link } from 'react-router-dom';

function SellComponent() {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="w-full md:w-2/5 max-w-sm mx-auto">
          <div className="rounded-lg overflow-hidden shadow-xl aspect-w-4 aspect-h-3">
            <img
              src="https://images.unsplash.com/photo-1728750002011-e81fc6a631a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D"
              alt="Selling Content"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        <div className="w-full md:w-3/5 space-y-4 md:space-y-6 mt-6 md:mt-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            How to Sell your Product?
          </h1>
          <p className="text-base md:text-lg leading-relaxed">
            Create an account, list your product with clear details and visuals,
            and set a competitive price. Engage with buyers, provide great
            service, and manage your sales easily. Start earning and growing
            your business today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/creator/product/new">
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-300 hover:shadow-lg hover:bg-gray-100">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellComponent;
