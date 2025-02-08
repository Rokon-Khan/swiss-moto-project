import { useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUsers from "../../../hooks/userSearch";

const UsersTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: users = [], isLoading } = useUsers(searchQuery);
  const axiosSecure = useAxiosSecure();

  const handleMakeAdmin = async (userId) => {
    try {
      await axiosSecure.patch(`/users/admin/${userId}`);
      Swal.fire("Success", "User has been promoted to Admin!", "success");
    } catch (error) {
      console.error("Error making admin:", error);
      Swal.fire("Error", "Failed to make the user Admin.", "error");
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Users</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleMakeAdmin(user._id)}
                  disabled={user.role === "admin"}
                  className={`px-4 py-2 rounded ${
                    user.role === "admin"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {user.role === "admin" ? "Admin" : "Make Admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
