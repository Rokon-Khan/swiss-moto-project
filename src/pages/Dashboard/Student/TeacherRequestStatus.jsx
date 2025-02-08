import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TeacherRequestStatus = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  // Fetch teacher request
  const {
    data: request,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teacherRequest", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/teacher-requests/${email}`);
      return response.data;
    },
    enabled: !!email, // Run only if email exists
  });

  // Mutation to resend teacher request
  const resendRequest = useMutation({
    mutationFn: async (newData) => {
      return axiosSecure.patch("/send-teacher-request", newData);
    },
    onSuccess: () => {
      Swal.fire("Success", "Your request has been sent!", "success");
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong!",
        "error"
      );
    },
  });

  const handleResend = () => {
    if (!request?.email) {
      Swal.fire("Error", "Email is missing in the request!", "error");
      return;
    }
    resendRequest.mutate({
      email: request.email,
      title: request.title || "N/A",
      category: request.category || "N/A",
    });
  };

  // Handle loading state
  if (isLoading) return <LoadingSpinner />;

  // Handle error state
  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to fetch data: {error.message}
      </p>
    );
  }

  // Handle no request found
  if (!request) {
    return (
      <p className="text-red-500 text-center mt-10">
        No teaching request found for the given email.
      </p>
    );
  }

  // Render the table
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Your Teaching Request</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">{request.title || "N/A"}</td>
              <td className="p-3">{request.category || "N/A"}</td>
              <td
                className={`p-3 font-semibold ${
                  request.status === "pending"
                    ? "text-yellow-500"
                    : request.status === "approved"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {request.status || "N/A"}
              </td>
              <td className="p-3">
                <button
                  onClick={handleResend}
                  disabled={request.status !== "rejected"}
                  className={`px-4 py-2 text-white rounded-md ${
                    request.status === "rejected"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {request.status === "rejected"
                    ? "Resend Request"
                    : "Send Request Again"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequestStatus;
