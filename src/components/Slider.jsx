import { GoArrowUpRight } from "react-icons/go";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import "swiper/css/navigation";

const Slider = () => {
  return (
    <div className="mb-10">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={500}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ autoplay: true }}
      >
        <SwiperSlide>
          <div className="hero min-h-[600px] bg-cover bg-no-repeat bg-banner">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-lg">
                <h1 className="mb-5 text-4xl font-bold">
                  The Ultimate Event Management System
                </h1>
                <p className="mb-5">
                  Effortlessly plan, organize, and manage events with our
                  intuitive Event Management System. From scheduling to
                  ticketing and real-time updates, this platform simplifies
                  event coordination, ensuring seamless experiences for
                  organizers and attendees.
                </p>
                <Link
                  to="/events"
                  className="btn bg-blue-500 text-xl font-bold text-white"
                >
                  Explore Events
                  <GoArrowUpRight className="text-3xl font-bold text-blue-500 rounded-full bg-white" />
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hero min-h-[600px] bg-banner_1 bg-cover bg-no-repeat">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-lg">
                <h1 className="mb-5 text-4xl font-bold">
                  Simplified Event Planning for Organizers
                </h1>
                <p className="mb-5">
                  Create and manage events effortlessly. From venue booking to
                  guest registrations, our platform provides a centralized hub
                  for all event management needs, helping organizers stay in
                  control at every step.
                </p>
                <Link
                  to="/events"
                  className="btn bg-blue-500 text-xl font-bold text-white"
                >
                  Explore Events
                  <GoArrowUpRight className="text-3xl font-bold text-blue-500 rounded-full bg-white" />
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hero min-h-[600px] bg-banner_2 bg-cover bg-no-repeat">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-lg">
                <h1 className="mb-5 text-4xl font-bold">
                  Secure and Scalable Platform
                </h1>
                <p className="mb-5">
                  Ensure secure access with advanced authentication and user
                  management. Built on a scalable architecture, our system
                  efficiently handles event registrations, ticketing, and
                  attendee interactions, making it ideal for events of any size.
                </p>
                <Link
                  to="/events"
                  className="btn bg-blue-500 text-xl font-bold text-white"
                >
                  Explore Events
                  <GoArrowUpRight className="text-3xl font-bold text-blue-500 rounded-full bg-white" />
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
