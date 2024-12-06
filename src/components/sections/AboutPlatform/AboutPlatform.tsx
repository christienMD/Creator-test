import { Link } from 'react-router-dom';

const AboutPlatform = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-creator-bg-400 mb-6">
            Empowering Creators, Everywhere
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 mb-8">
            CREATORS is a revolutionary platform designed to support, inspire,
            and monetize the creative work of talented individuals across the
            globe. We believe in the power of creativity and providing tools
            that transform passion into sustainable careers.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-creator-bg-400 text-white px-8 py-3 rounded-lg hover:bg-creator-bg-300 transition-colors"
          >
            Join our community
          </Link>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-creator-bg-400">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-4">Create</h2>
              <p className="text-gray-700">
                Provide creators with tools, resources, and support to turn
                their creative passions into sustainable careers.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-4">Sell</h2>
              <p className="text-gray-700">
                Build a global community that fosters collaboration, learning,
                and mutual growth among creators.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-4">Earn</h2>
              <p className="text-gray-700">
                Continuously develop cutting-edge technologies that simplify
                content creation, distribution, and monetization.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPlatform;
