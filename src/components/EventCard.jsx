import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "./Shared/LoadingSpinner";

const fetchEvents = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
  return data;
};

const EventCard = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error fetching events.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {events.map((event) => (
        <div key={event._id} className="bg-white shadow-lg rounded-lg p-5">
          <div className="card gap-4">
            <div>
              <img src={event.image} alt="" />
            </div>
            <img
              src={event.eventManager.image}
              alt={event.eventManager.name}
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div>
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="text-gray-500">{event.category}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <Link
              to={`/events/${event._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              View Details
            </Link>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
              Join Event
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
