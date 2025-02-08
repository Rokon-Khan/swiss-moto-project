// import { useQuery } from "@tanstack/react-query";
// import { Helmet } from "react-helmet-async";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import UpdateClassForm from "../../../components/Form/UpdateClassForm";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const UpdateClass = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   // Fetch class data using TanStack Query
//   const {
//     data: classData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["class", id],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/classes/${id}`);
//       return data;
//     },
//   });

//   // Handle update submission
//   const handleUpdate = async (e, uploadedImage) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.name.value;
//     const description = form.description.value;
//     const price = parseFloat(form.price.value);
//     const image = uploadedImage || classData?.image;

//     const updatedData = { name, description, price, image };

//     try {
//       await axiosSecure.put(`/classes/${id}`, updatedData);
//       Swal.fire("Success!", "Class updated successfully!", "success");
//       navigate("/dashboard/my-classes");
//     } catch (error) {
//       console.error("Error updating class:", error);
//       toast.error("Failed to update class!");
//     }
//   };

//   if (isLoading) return <LoadingSpinner></LoadingSpinner>;
//   if (error) return <p>Error loading class data.</p>;

//   return (
//     <div>
//       <Helmet>
//         <title>Update Class | Dashboard</title>
//       </Helmet>
//       <UpdateClassForm handleUpdate={handleUpdate} classData={classData} />
//     </div>
//   );
// };

// export default UpdateClass;

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UpdateClassForm from "../../../components/Form/UpdateClassForm";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch class data using TanStack Query
  const {
    data: classData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      if (!id) throw new Error("Class ID is missing.");
      const { data } = await axiosSecure.get(`/classes/${id}`);
      return data;
    },
    retry: false, // Prevent infinite retry loops
  });

  // Handle update submission
  const handleUpdate = async (e, uploadedImage) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const image = uploadedImage || classData?.image;

    const updatedData = { name, description, price, image };

    try {
      await axiosSecure.put(`/classes/${id}`, updatedData);
      Swal.fire("Success!", "Class updated successfully!", "success");
      navigate("/dashboard/my-classes");
    } catch (error) {
      console.error("Error updating class:", error);
      toast.error("Failed to update class!");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    console.error("Error fetching class data:", error);
    return (
      <p className="text-red-500">
        Error loading class data: {error.message || "Unknown error occurred."}
      </p>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Update Class | Dashboard</title>
      </Helmet>
      <UpdateClassForm handleUpdate={handleUpdate} classData={classData} />
    </div>
  );
};

export default UpdateClass;
