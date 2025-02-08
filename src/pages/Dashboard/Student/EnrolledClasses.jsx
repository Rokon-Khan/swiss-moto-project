// import LoadingSpinner from "../components/Shared/LoadingSpinner";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import useEnrolledClasses from "../../../hooks/useEnrolledClasses";

// const EnrolledClasses = () => {
//   const { data: enrolledClasses, isLoading, error } = useEnrolledClasses();

//   if (isLoading) return <LoadingSpinner></LoadingSpinner>;
//   if (error) return <div>Error fetching enrolled classes.</div>;

//   return (
//     <div className="max-w-6xl mx-auto mt-10">
//       <h1 className="text-2xl font-semibold mb-6">My Enrolled Classes</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {enrolledClasses.map((cls) => (
//           <div key={cls._id} className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">{cls.name}</h3>
//             {/* <p className="text-sm text-gray-600">
//               {cls.description.slice(0, 80)}...
//             </p> */}
//             <p className="text-sm text-gray-800 mt-2">
//               Enrolled At: {new Date(cls.enrolledAt).toLocaleDateString()}
//             </p>
//             <p className="text-sm text-gray-800">
//               Transaction ID: {cls.transactionId}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EnrolledClasses;

import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useEnrolledClasses from "../../../hooks/useEnrolledClasses";

const EnrolledClasses = () => {
  const { data: enrolledClasses, isLoading, error } = useEnrolledClasses();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error fetching enrolled classes.</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">My Enrolled Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map(({ classDetails, transactionId, enrolledAt }) => (
          <div
            key={transactionId}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={classDetails.image}
              alt={classDetails.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{classDetails.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {classDetails.description.slice(0, 80)}...
            </p>
            <p className="text-sm text-gray-700">
              <strong>Teacher:</strong> {classDetails.teacher.name}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Price:</strong> ${classDetails.price}
            </p>
            <p className="text-sm text-gray-800">
              Transaction ID: {transactionId}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Enrolled At:</strong>{" "}
              {new Date(enrolledAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;
