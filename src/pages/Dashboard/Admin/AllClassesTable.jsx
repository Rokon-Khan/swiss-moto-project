import { useState } from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useClasses, useUpdateClassStatus } from "../../../hooks/useClasses";
import { useClassProgress } from "../../../hooks/useClassProgress";

const AllClassesTable = () => {
  const { data: classes = [], isLoading } = useClasses();
  const updateClassStatus = useUpdateClassStatus();
  const [selectedClassId, setSelectedClassId] = useState(null);
  const { data: progressDetails } = useClassProgress(selectedClassId);

  const handleUpdateStatus = (id, status) => {
    updateClassStatus.mutate({ id, status });
  };

  const handleViewProgress = (id) => {
    setSelectedClassId(id);
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Classes</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Teacher Email</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem._id}>
              <td className="border border-gray-300 p-2">{classItem.name}</td>
              <td className="border border-gray-300 p-2">
                <img
                  src={classItem.image}
                  alt={classItem.name}
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                {classItem.teacher.email}
              </td>
              <td className="border border-gray-300 p-2">
                {classItem.description}
              </td>
              <td>
                <span
                  className={`border border-gray-300 p-2 rounded-lg ${
                    classItem.status === "pending"
                      ? "bg-red-300"
                      : classItem.status === "rejected"
                      ? "bg-red-800 text-white"
                      : "bg-green-400"
                  }`}
                >
                  {classItem.status}
                </span>
              </td>
              <td className="border border-gray-300 p-2 flex flex-col gap-4 justify-center  items-center">
                <button
                  onClick={() => handleUpdateStatus(classItem._id, "approved")}
                  className="px-4 py-2 mr-2 text-white bg-green-500 rounded disabled:opacity-50"
                  disabled={classItem.status === "approved"}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUpdateStatus(classItem._id, "rejected")}
                  className="px-4 py-2 text-white bg-red-500 rounded disabled:opacity-50"
                  disabled={classItem.status === "rejected"}
                >
                  Reject
                </button>
                <button
                  onClick={() => handleViewProgress(classItem._id)}
                  className="px-4 py-2 ml-2 text-white bg-blue-500 rounded disabled:opacity-50"
                  disabled={classItem.status !== "approved"}
                >
                  Progress
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {progressDetails && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold">Class Progress</h3>
          <p>
            Students Enrolled:{" "}
            {progressDetails.progressDetails.studentsEnrolled}
          </p>
          <p>
            Completed Modules:{" "}
            {progressDetails.progressDetails.completedModules}
          </p>
          <p>Total Modules: {progressDetails.progressDetails.totalModules}</p>
        </div>
      )}
    </div>
  );
};

export default AllClassesTable;
