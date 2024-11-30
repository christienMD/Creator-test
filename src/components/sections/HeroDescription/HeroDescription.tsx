import InterestButton from "../InterestsButton/InterestsButton";

const HeroDescription = () => {
  const interests = ["videos", "images", "pdfs", "audios", "links"];

  return (
    <div>
      <h1 className="capitalize text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center sm:text-left">
        Your Hub for authentic creative works
      </h1>
      <p className="text-base text-center md:text-left py-2 mt-2 w-full md:max-w-xl xl:max-w-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
        voluptatum tenetur sunt esse impedit excepturi eum nobis totam repellat
        ducimus.
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
}

export default HeroDescription