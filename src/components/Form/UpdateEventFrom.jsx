// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { TbFidgetSpinner } from "react-icons/tb";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const UpdateEventForm = ({ eventId, handleSubmit }) => {
//   const axiosSecure = useAxiosSecure();
//   const [eventData, setEventData] = useState(null);
//   const [uploadImage, setUploadImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const { data } = await axiosSecure.get(`/events/${eventId}`);
//         setEventData(data);
//       } catch (err) {
//         console.error("Failed to fetch event data:", err);
//       }
//     };

//     if (eventId) fetchEventData();
//   }, [eventId, axiosSecure]);

//   if (!eventData) return <p>Loading event details...</p>;

//   return (
//     <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
//       <h2 className="text-4xl font-bold mb-10">Update Event</h2>
//       <form onSubmit={(e) => handleSubmit(e, uploadImage, eventData)}>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <div className="space-y-6">
//             {/* Event Name */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="title" className="block text-gray-600">
//                 Event Name
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
//                 name="title"
//                 id="title"
//                 type="text"
//                 defaultValue={eventData.title}
//                 required
//               />
//             </div>
//             {/* Category */}
// <div className="space-y-1 text-sm">
//   <label htmlFor="category" className="block text-gray-600">
//     Category
//   </label>
//   <select
//     className="w-full px-4 py-3 border-blue-300 focus:outline-blue-500 rounded-md bg-white"
//     name="category"
//     defaultValue={eventData.category}
//     required
//   >
//     <option value="Programming">Programming</option>
//     <option value="AI & Machine Learning">
//       AI & Machine Learning
//     </option>
//     <option value="VR Technology">VR Technology</option>
//     <option value="Health and Medical">Health and Medical</option>
//   </select>
// </div>
//             {/* Description */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="description" className="block text-gray-600">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 className="block w-full h-32 px-4 py-3 text-gray-800 border border-blue-300 bg-white rounded-md focus:outline-blue-500"
//                 name="description"
//                 defaultValue={eventData.description}
//               ></textarea>
//             </div>
//           </div>
//           <div className="space-y-6 flex flex-col">
// {/* Start & End Date */}
// <div className="flex justify-between gap-2">
//   <div className="space-y-1 text-sm">
//     <label htmlFor="startDate" className="block text-gray-600">
//       Event Start Date
//     </label>
//     <input
//       className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
//       name="startDate"
//       id="startDate"
//       type="date"
//       defaultValue={eventData.startDate}
//       required
//     />
//   </div>
//   <div className="space-y-1 text-sm">
//     <label htmlFor="endingDate" className="block text-gray-600">
//       Event Ending Date
//     </label>
//     <input
//       className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
//       name="endingDate"
//       id="endingDate"
//       type="date"
//       defaultValue={eventData.endingDate}
//       required
//     />
//   </div>
// </div>
//             {/* Image Upload */}
//             <div className="p-4 w-full m-auto rounded-lg flex-grow">
//               <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
//                 <label>
//                   <input
//                     onChange={(e) =>
//                       setUploadImage({
//                         image: e.target.files[0],
//                         url: URL.createObjectURL(e.target.files[0]),
//                       })
//                     }
//                     className="text-sm cursor-pointer w-36 hidden"
//                     type="file"
//                     name="image"
//                     id="image"
//                     accept="image/*"
//                   />
//                   <div className="bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-600">
//                     {uploadImage?.image?.name || "Upload New Image"}
//                   </div>
//                 </label>
//               </div>
//             </div>
//             {uploadImage ? (
//               <div className="flex gap-5 items-center">
//                 <img
//                   className="w-20"
//                   src={uploadImage?.url}
//                   alt="Uploaded preview"
//                 />
//                 <p>Image Size: {uploadImage?.image?.size} Bytes</p>
//               </div>
//             ) : (
//               <img
//                 className="w-20"
//                 src={eventData.image}
//                 alt="Existing Event"
//               />
//             )}
//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500"
//             >
//               {loading ? (
//                 <TbFidgetSpinner className="animate-spin m-auto" />
//               ) : (
//                 "Update Event"
//               )}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// UpdateEventForm.propTypes = {
//   eventId: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
// };

// export default UpdateEventForm;

import PropTypes from "prop-types";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { uploadToCloudinary } from "../../api/utlis";

const UpdateEventForm = ({ handleUpdate, eventData }) => {
  console.log(eventData);

  const [uploadImage, setUploadImage] = useState({
    image: null,
    url: eventData?.image || "",
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage({
        image: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let uploadedImage = null;

    if (uploadImage?.image) {
      try {
        uploadedImage = await uploadToCloudinary(uploadImage.image);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    await handleUpdate(e, uploadedImage);
    setLoading(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Event Title */}
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Event Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="title"
                id="title"
                type="text"
                defaultValue={eventData.title}
                placeholder="Event Title"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                className="w-full px-4 py-3 border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="category"
                defaultValue={eventData.category}
                required
              >
                <option value="Programming">Programming</option>
                <option value="AI & Machine Learning">
                  AI & Machine Learning
                </option>
                <option value="VR Technology">VR Technology</option>
                <option value="Health and Medical">Health and Medical</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Event Description
              </label>
              <textarea
                id="description"
                placeholder="Write event description here..."
                className="block rounded-md focus:blue-300 w-full h-32 px-4 py-3 text-gray-800 border border-blue-300 bg-white focus:outline-blue-500"
                name="description"
                defaultValue={eventData.description}
              ></textarea>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Start & End Date */}
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="startDate" className="block text-gray-600">
                  Event Start Date
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                  name="startDate"
                  id="startDate"
                  type="date"
                  defaultValue={eventData.startDate}
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="endingtDate" className="block text-gray-600">
                  Event Ending Date
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                  name="endingtDate"
                  id="endingtDate"
                  type="date"
                  defaultValue={eventData.endingtDate}
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="p-4 w-full m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={handleImageChange}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500">
                      {uploadImage?.image?.name || "Upload Image"}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {uploadImage?.url && (
              <div className="flex gap-5 items-center">
                <img className="w-20" src={uploadImage.url} alt="Uploaded" />
                <p>
                  {uploadImage.image
                    ? `Image Size: ${uploadImage.image.size} Bytes`
                    : "Current Image"}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Update Event"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

UpdateEventForm.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
};

export default UpdateEventForm;
