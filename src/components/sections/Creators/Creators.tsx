import { Link } from 'react-router-dom';

interface CreatorLink {
  name: string;
  imageSrc: string;
  href: string;
}

interface CreatorProps {
  creators: CreatorLink[];
}

function CreatorsComponent({ creators }: CreatorProps) {
  return (
    <div className="section-container">
      <div className="text-center mb-12">
        <h2 className="heading">
          Creators with products that have the highest ratings.
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Celebrated for their quality, innovation, and customer satisfaction!
          These standout creators consistently deliver exceptional value,
          earning glowing reviews and building lasting trust with their
          audience. Explore their best-rated offerings and experience the
          difference for yourself!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-flow-row lg:grid-cols-4 gap-6 ">
        {creators.map((creator, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={creator.imageSrc}
              alt={creator.name}
              className="w-full h-full mb-4 object-cover border rounded-xl"
            />
            <h3 className="text-xl font-semibold mb-2">{creator.name}</h3>
            <Link
              to="/catalog"
              className="text-gray-600  transition-colors duration-300"
            >
              See my products
            </Link>
          </div>
        ))}
      </div>
      {/* <div className="text-center mt-12">
        <button className="px-6 py-3 text-black  font-semibold w-full sm:w-auto  rounded-xl border-2  transition-all duration-300 hover:shadow-lg hover:bg-gray-100">
          See More
        </button>
      </div> */}
    </div>
  );
}

export default CreatorsComponent;
