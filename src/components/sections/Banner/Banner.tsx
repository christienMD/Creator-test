import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  "https://images.unsplash.com/photo-1498092651296-641e88c3b057",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
];

const Banner = () => {
  return (
    <div className="relative rounded-md py-4">
      <div className="absolute w-full h-28 bottom-0 bg-gradient-to-t from-creator-bg-300 to-transparent z-20" />

      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {images.map((image) => (
          <div className="h-[300px] md:h-[400px]" key={image}>
            <img
              src={image}
              alt="Carousel Image 1"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
