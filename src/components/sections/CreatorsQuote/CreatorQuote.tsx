import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface Quote {
  id: number;
  name: string;
  quote: string;
  avatar: string;
  profession: string;
  image: string;
}

interface QuotesProps {
  quotes: Quote[];
}

function CreatorQuote({ quotes }: QuotesProps) {
  return (
    <div className="section-container py-24">
      <h1 className="heading">Explore our Creators quotes</h1>
      <div className="max-w-3xl mx-auto px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {quotes.map((quote) => (
            <SwiperSlide key={quote.id}>
              <div className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col justify-between max-w-2xl mx-auto">
                <div>
                  <p className="text-lg italic text-gray-700 leading-relaxed mb-4">
                    "{quote.quote}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={quote.avatar}
                      alt={quote.name}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {quote.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {quote.profession}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CreatorQuote;
