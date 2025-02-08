import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../Shared/LoadingSpinner";

const MyEventCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch events
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["myEvents", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-events`,
        {
          params: { email: user?.email },
        }
      );
      return data;
    },
    enabled: !!user?.email,
  });

  // Mutation to delete an event
  const deleteEventMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`${import.meta.env.VITE_API_URL}/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myEvents"]);
    },
  });

  // Handle delete action with SweetAlert
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEventMutation.mutate(id, {
          onError: (error) => {
            Swal.fire("Error!", "Failed to delete the event.", "error");
            console.error(error);
          },
          onSuccess: () => {
            Swal.fire("Deleted!", "Your event has been deleted.", "success");
          },
        });
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!events.length) {
    return <p>No events found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event._id}
          className="card p-4 shadow-lg rounded-xl border border-gray-200"
        >
          <img
            src={event.image}
            alt={event.title}
            width={400}
            height={250}
            className="rounded-lg"
          />
          <div className=" card-body mt-4">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-sm text-gray-600">{event.category}</p>
            <p className="text-gray-700 mt-2">{event.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Start: {event.startDate} | End: {event.endingtDate}
            </p>
            <div className="flex items-center mt-4 gap-3">
              <img
                src={event.eventManager.image}
                alt={event.eventManager.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">
                  {event.eventManager.name}
                </p>
                <p className="text-xs text-gray-500">
                  {event.eventManager.email}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => navigate("/update-events")}
                className="btn bg-blue-500 hover:bg-blue-700 text-white"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="btn bg-red-500 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEventCard;
