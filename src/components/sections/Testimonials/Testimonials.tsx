import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { A11y, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  avatar: string;
}

interface TestimonialProps {
  testimonials: Testimonial[];
}

function Testimonials({ testimonials }: TestimonialProps) {
  return (
    <div className="section-container">
      <div className="px-4">
        <h2 className="heading">What Our Users Say</h2>
        <Swiper
          modules={[Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="pb-12">
              <div className="bg-gray-100 rounded-lg shadow-md p-6 h-full flex flex-col">
                <p className="text-gray-600 italic mb-6 flex-grow">
                  "{testimonial.message}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500">{testimonial.role}</p>
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

export default Testimonials;
