// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const AdminTeacherRequests = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // Fetch all teacher requests
//   const { data: teacherRequests = [], isLoading } = useQuery({
//     queryKey: ["teacherRequests"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/teacher-requests");
//       return data;
//     },
//   });

//   // Mutation to approve/reject teacher request
//   const updateRequest = useMutation({
//     mutationFn: async ({ id, status, email }) => {
//       return axiosSecure.patch(`/teacher-requests/${id}`, { status, email });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["teacherRequests"]);
//       Swal.fire("Success", "Status updated successfully!", "success");
//     },
//     onError: () => {
//       Swal.fire("Error", "Something went wrong!", "error");
//     },
//   });

//   const handleUpdate = (id, status, email) => {
//     updateRequest.mutate({ id, status, email });
//   };

//   if (isLoading) return <LoadingSpinner></LoadingSpinner>;

//   return (
//     <div className="max-w-6xl mx-auto mt-10">
//       <h1 className="text-2xl font-semibold mb-6">Teacher Requests</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3">Name</th>
//               <th className="p-3">Image</th>
//               <th className="p-3">Experience</th>
//               <th className="p-3">Title</th>
//               <th className="p-3">Category</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {teacherRequests.map((teacher) => (
//               <tr key={teacher._id} className="border-b">
//                 <td className="p-3">{teacher.name}</td>
//                 <td className="p-3">
//                   <img
//                     src={teacher.image}
//                     alt={teacher.name}
//                     className="w-12 h-12 rounded-full"
//                   />
//                 </td>
//                 <td className="p-3">{teacher.experience}</td>
//                 <td className="p-3">{teacher.title}</td>
//                 <td className="p-3">{teacher.category}</td>
//                 <td
//                   className={`p-3 font-semibold ${
//                     teacher.status === "pending"
//                       ? "text-yellow-500"
//                       : teacher.status === "approved"
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {teacher.status}
//                 </td>
//                 <td className="p-3">
//                   <button
//                     onClick={() =>
//                       handleUpdate(teacher._id, "approved", teacher.email)
//                     }
//                     disabled={teacher.status === "rejected"}
//                     className={`px-4 py-2 mr-2 text-white rounded-md ${
//                       teacher.status === "approved"
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-green-500 hover:bg-green-600"
//                     }`}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() =>
//                       handleUpdate(teacher._id, "rejected", teacher.email)
//                     }
//                     disabled={teacher.status === "rejected"}
//                     className={`px-4 py-2 text-white rounded-md ${
//                       teacher.status === "rejected"
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-red-500 hover:bg-red-600"
//                     }`}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminTeacherRequests;

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const AdminTeacherRequests = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // Fetch all teacher requests
//   const { data: teacherRequests = [], isLoading } = useQuery({
//     queryKey: ["teacherRequests"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/teacher-requests");
//       return data;
//     },
//   });

//   // Mutation to approve/reject teacher requests
//   const updateRequest = useMutation({
//     mutationFn: async ({ id, status, email }) => {
//       return axiosSecure.patch(`/teacher-requests/${id}`, { status, email });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["teacherRequests"]);
//       Swal.fire("Success", "Status updated successfully!", "success");
//     },
//     onError: (error) => {
//       Swal.fire(
//         "Error",
//         error.response?.data?.error || "Something went wrong!",
//         "error"
//       );
//     },
//   });

//   const handleUpdate = (id, status, email) => {
//     if (!email) {
//       Swal.fire("Error", "Email is missing for the teacher request!", "error");
//       return;
//     }
//     updateRequest.mutate({ id, status, email });
//   };

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <div className="max-w-6xl mx-auto mt-10">
//       <h1 className="text-2xl font-semibold mb-6">Teacher Requests</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3">Name</th>
//               <th className="p-3">Image</th>
//               <th className="p-3">Experience</th>
//               <th className="p-3">Title</th>
//               <th className="p-3">Category</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {teacherRequests.map((teacher) => (
//               <tr key={teacher._id} className="border-b">
//                 <td className="p-3">{teacher.name || "N/A"}</td>
//                 <td className="p-3">
//                   <img
//                     src={teacher.image}
//                     alt={teacher.name || "N/A"}
//                     className="w-12 h-12 rounded-full"
//                   />
//                 </td>
//                 <td className="p-3">{teacher.experience || "N/A"}</td>
//                 <td className="p-3">{teacher.title || "N/A"}</td>
//                 <td className="p-3">{teacher.category || "N/A"}</td>
//                 <td
//                   className={`p-3 font-semibold ${
//                     teacher.status === "pending"
//                       ? "text-yellow-500"
//                       : teacher.status === "approved"
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {teacher.status}
//                 </td>
//                 <td className="p-3">
//                   <button
//                     onClick={() =>
//                       handleUpdate(teacher._id, "approved", teacher.email)
//                     }
//                     disabled={teacher.status === "approved"}
//                     className={`px-4 py-2 mr-2 text-white rounded-md ${
//                       teacher.status === "approved"
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-green-500 hover:bg-green-600"
//                     }`}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() =>
//                       handleUpdate(teacher._id, "rejected", teacher.email)
//                     }
//                     disabled={teacher.status === "rejected"}
//                     className={`px-4 py-2 text-white rounded-md ${
//                       teacher.status === "rejected"
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-red-500 hover:bg-red-600"
//                     }`}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminTeacherRequests;

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const AdminTeacherRequests = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // Fetch all teacher requests
//   const { data: teacherRequests = [], isLoading } = useQuery({
//     queryKey: ["teacherRequests"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/teacher-requests");
//       return data;
//     },
//   });

//   // Mutation to approve/reject teacher requests
//   const updateRequest = useMutation({
//     mutationFn: async ({ email, status }) => {
//       return axiosSecure.patch(`/teacher-requests`, { email, status });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["teacherRequests"]);
//       Swal.fire("Success", "Status updated successfully!", "success");
//     },
//     onError: (error) => {
//       Swal.fire(
//         "Error",
//         error.response?.data?.error || "Something went wrong!",
//         "error"
//       );
//     },
//   });

//   const handleUpdate = (email, status) => {
//     if (!email) {
//       Swal.fire("Error", "Email is missing for the teacher request!", "error");
//       return;
//     }
//     updateRequest.mutate({ email, status });
//   };

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <div className="max-w-6xl mx-auto mt-10">
//       <h1 className="text-2xl font-semibold mb-6">Teacher Requests</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3">Name</th>
//               <th className="p-3">Image</th>
//               <th className="p-3">Experience</th>
//               <th className="p-3">Title</th>
//               <th className="p-3">Category</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {teacherRequests.map((teacher) => (
//               <tr key={teacher.email} className="border-b">
//                 <td className="p-3">{teacher.name || "N/A"}</td>
//                 <td className="p-3">
//                   <img
//                     src={teacher.image}
//                     alt={teacher.name || "N/A"}
//                     className="w-12 h-12 rounded-full"
//                   />
//                 </td>
//                 <td className="p-3">{teacher.experience || "N/A"}</td>
//                 <td className="p-3">{teacher.title || "N/A"}</td>
//                 <td className="p-3">{teacher.category || "N/A"}</td>
//                 <td
//                   className={`p-3 font-semibold ${
//                     teacher.status === "pending"
//                       ? "text-yellow-500"
//                       : teacher.status === "approved"
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {teacher.status}
//                 </td>
//                 <td className="p-3">
//                   <button
//                     onClick={() => handleUpdate(teacher.email, "approved")}
//                     disabled={teacher.status === "approved"}
//                     className={`px-4 py-2 mr-2 text-white rounded-md ${
//                       teacher.status === "approved"
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-green-500 hover:bg-green-600"
//                     }`}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleUpdate(teacher.email, "rejected")}
//                     disabled={teacher.status === "rejected"}
//                     className={`px-4 py-2 text-white rounded-md ${
//                       teacher.status === "rejected"
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-red-500 hover:bg-red-600"
//                     }`}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminTeacherRequests;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminTeacherRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all teacher requests
  const { data: teacherRequests = [], isLoading } = useQuery({
    queryKey: ["teacherRequests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/teacher-requests");
      return data;
    },
  });

  // Mutation to approve/reject teacher requests
  //   const updateRequest = useMutation({
  //     mutationFn: async ({ email, status }) => {
  //       // Update both TeacherCollection and UserCollection
  //       await axiosSecure.patch("/approve-teacher", { email, status }); // TeacherCollection update
  //       if (status === "approved") {
  //         await axiosSecure.patch("/approve-teacher", {
  //           email,
  //           newRole: "teacher",
  //         }); // UserCollection update
  //       }
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["teacherRequests"]);
  //       Swal.fire("Success", "Status updated successfully!", "success");
  //     },
  //     onError: (error) => {
  //       Swal.fire(
  //         "Error",
  //         error.response?.data?.error || "Something went wrong!",
  //         "error"
  //       );
  //     },
  //   });

  const updateRequest = useMutation({
    mutationFn: async ({ email, status }) => {
      if (status === "approved") {
        return axiosSecure.patch("/approve-teacher", { email });
      } else if (status === "rejected") {
        return axiosSecure.patch("/reject-teacher", { email });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teacherRequests"]);
      Swal.fire("Success", "Status updated successfully!", "success");
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong!",
        "error"
      );
    },
  });

  const handleUpdate = (email, status) => {
    if (!email) {
      Swal.fire("Error", "Email is missing for the teacher request!", "error");
      return;
    }

    // Confirm the action before making the update
    Swal.fire({
      title: `Are you sure you want to ${status} this request?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequest.mutate({ email, status });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Teacher Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Image</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teacherRequests.map((teacher) => (
              <tr key={teacher.email} className="border-b">
                <td className="p-3">{teacher.name || "N/A"}</td>
                <td className="p-3">
                  <img
                    src={teacher.image}
                    alt={teacher.name || "N/A"}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="p-3">{teacher.experience || "N/A"}</td>
                <td className="p-3">{teacher.title || "N/A"}</td>
                <td className="p-3">{teacher.category || "N/A"}</td>
                <td
                  className={`p-3 font-semibold ${
                    teacher.status === "pending"
                      ? "text-yellow-500"
                      : teacher.status === "approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {teacher.status}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleUpdate(teacher.email, "approved")}
                    disabled={teacher.status === "approved"}
                    className={`px-4 py-2 mr-2 text-white rounded-md ${
                      teacher.status === "approved"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdate(teacher.email, "rejected")}
                    disabled={teacher.status === "rejected"}
                    className={`px-4 py-2 text-white rounded-md ${
                      teacher.status === "rejected"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTeacherRequests;
