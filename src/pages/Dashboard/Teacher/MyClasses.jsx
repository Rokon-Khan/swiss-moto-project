// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import useAuth from "../../../hooks/useAuth";
// import ClassCard from "../../ClassCard";

// const MyClasses = () => {
//   const { user } = useAuth(); // Get the logged-in user's data

//   const { data: classes = [], isLoading } = useQuery({
//     queryKey: ["myClasses", user?.email], // Unique query key
//     queryFn: async () => {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/my-classes`,
//         {
//           params: { email: user?.email }, // Pass email as a query parameter
//         }
//       );
//       return data; // Return the data fetched
//     },
//     enabled: !!user?.email, // Only fetch if email is available
//   });

//   if (isLoading) {
//     return <LoadingSpinner></LoadingSpinner>;
//   }

//   if (!classes.length) {
//     return <p>No classes found.</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {classes.map((classData) => (
//         <ClassCard key={classData._id} classData={classData} />
//       ))}
//     </div>
//   );
// };

// export default MyClasses;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import ClassCard from "../../ClassCard";

const MyClasses = () => {
  const { user } = useAuth(); // Get the logged-in user's data
  const queryClient = useQueryClient(); // For refetching queries after mutation

  // Fetch classes
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["myClasses", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-classes`,
        { params: { email: user?.email } }
      );
      return data;
    },
    enabled: !!user?.email,
  });

  // Mutation to delete a class
  const deleteClassMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(
        `${import.meta.env.VITE_API_URL}/classes/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myClasses"]); // Refetch classes
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
        deleteClassMutation.mutate(id, {
          onError: (error) => {
            Swal.fire("Error!", "Failed to delete the class.", "error");
            console.error(error);
          },
          onSuccess: () => {
            Swal.fire("Deleted!", "Your class has been deleted.", "success");
          },
        });
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!classes.length) {
    return <p>No classes found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((classData) => (
        <ClassCard
          key={classData._id}
          classData={classData}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};
export default MyClasses;
