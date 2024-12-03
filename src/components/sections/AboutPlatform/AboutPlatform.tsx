import { Link } from "react-router-dom";

const AboutPlatform = () => {
  const teamMembers = [
    {
      name: "Fongoh Tayong",
      role: "Founder & CEO",
      bio: "Passionate about empowering creators and building innovative platforms.",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mdHdhcmVkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Fongoh Martin",
      role: "Chief Technology Officer",
      bio: "Tech visionary with a track record of developing cutting-edge creator tools.",
      image:
        "https://ca.slack-edge.com/T05R6LXN7J8-U07G1TX3865-0c7b6ca91dcf-512",
    },
    {
      name: "Kindness Cheche",
      role: "Head of Community",
      bio: "Dedicated to supporting and connecting creators worldwide.",
      image:
        "https://ca.slack-edge.com/T05R6LXN7J8-U07FRNSJ0PN-32469f3c0df8-512",
    },
  ];


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
            Join Our Community
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

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-creator-bg-400">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-creator-bg-400 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default AboutPlatform;
