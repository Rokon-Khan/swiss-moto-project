// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";

// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import LoadingSpinner from "../Shared/LoadingSpinner";
// import UpdateEventFrom from "./UpdateEventFrom";

// const UpdateEvent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   const [uploadImage, setUploadImage] = useState(null);

//   // Fetch event data using TanStack Query
//   const {
//     data: eventData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["event", id],
//     queryFn: async () => {
//       if (!id) throw new Error("Event ID is missing.");
//       const { data } = await axiosSecure.get(`/events/${id}`);
//       return data;
//     },
//     retry: false,
//   });

//   // Handle update submission
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const title = form.title.value;
//     const category = form.category.value;
//     const description = form.description.value;
//     const startDate = form.startDate.value;
//     const endingDate = form.endingDate.value;
//     const image = uploadImage?.url || eventData?.image;

//     const updatedData = {
//       title,
//       category,
//       description,
//       startDate,
//       endingDate,
//       image,
//     };

//     try {
//       await axiosSecure.put(`/events/${id}`, updatedData);
//       Swal.fire("Success!", "Event updated successfully!", "success");
//       navigate("/dashboard/my-events");
//     } catch (error) {
//       console.error("Error updating event:", error);
//       toast.error("Failed to update event!");
//     }
//   };

//   if (isLoading) return <LoadingSpinner />;
//   if (error) {
//     console.error("Error fetching event data:", error);
//     return (
//       <p className="text-red-500">
//         Error loading event data: {error.message || "Unknown error occurred."}
//       </p>
//     );
//   }

//   return (
//     <div>
//       <Helmet>
//         <title>Update Event | Dashboard</title>
//       </Helmet>
//       <UpdateEventFrom
//         handleSubmit={handleUpdate}
//         uploadImage={uploadImage}
//         setUploadImage={setUploadImage}
//         loading={isLoading}
//         defaultValues={eventData}
//       />
//     </div>
//   );
// };

// export default UpdateEvent;

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import UpdateEventFrom from "./UpdateEventFrom";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState(null);

  // Fetch event data using TanStack Query
  const {
    data: eventData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      if (!id) throw new Error("Event ID is missing.");
      const { data } = await axiosSecure.get(`/events/${id}`);
      console.log(data);

      return data;
    },
    retry: false,
  });

  // Prevent rendering if data is undefined
  if (isLoading) return <LoadingSpinner />;
  if (error || !eventData) {
    console.error("Error fetching event data:", error);
    return (
      <p className="text-red-500">
        Error loading event data: {error?.message || "Event not found"}
      </p>
    );
  }

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;
    const startDate = form.startDate.value;
    const endingtDate = form.endingtDate.value;
    const image = uploadImage?.url || eventData?.image;

    const updatedData = {
      title,
      category,
      description,
      startDate,
      endingtDate,
      image,
    };

    try {
      await axiosSecure.put(`/events/${id}`, updatedData);
      Swal.fire("Success!", "Event updated successfully!", "success");
      navigate("/dashboard/my-events");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event!");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Update Event | Dashboard</title>
      </Helmet>
      <UpdateEventFrom
        handleUpdate={handleUpdate}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        eventData={eventData} // Pass eventData correctly
      />
    </div>
  );
};

export default UpdateEvent;
