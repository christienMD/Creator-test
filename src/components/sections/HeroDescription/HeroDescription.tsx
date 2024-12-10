import InterestButton from '../InterestsButton/InterestsButton';

const HeroDescription = () => {
  const interests = ['videos', 'images', 'pdfs', 'audios', 'links'];

  return (
    <div>
      <h1 className="capitalize text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center sm:text-left">
        Buy and Sell Digital Products with Ease!
      </h1>
      <p className="text-base text-center md:text-left py-2 mt-2 w-full md:max-w-xl xl:max-w-2xl">
        At Nguava, we connect creators and consumers in a vibrant marketplace
        for digital goods. From PDFs, Images, links and videos to online courses
        and audios, discover a world of high-quality digital products tailored
        to your needs.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left">
        What will you like ?
      </h2>

      <div className="flex flex-wrap justify-center sm:justify-start max-w-xl mt-4">
        {interests.map((interest) => (
          <InterestButton key={interest} label={interest} />
        ))}
      </div>
    </div>
  );
};

export default HeroDescription;
